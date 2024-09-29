class FileService{

    // Get file path
  getFileInfo = async (fileName) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filepath = path.join(__dirname, '../../../public', fileName);

    const stat = await fs.stat(filepath);
    const fileSize = stat.size;
    const mimeType = this.getMimeType(filepath); // Get MIME type

    return { filepath, fileSize, mimeType };
  }

  // Get file data
  getFileData = async (fileName) => {
    const { filepath, mimeType } = await this.getFileInfo(fileName);
    const fileData = await fs.readFile(filepath);
    return { data: `data:${mimeType};base64,${fileData.toString('base64')}`, mimeType };
  }

  // Stream the file
  streamFile = (req, res, fileName, { filepath, fileSize }) => {
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
        const chunksize = (end-start)+1;
        const file = fsSync.createReadStream(filepath, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': this.getMimeType(fileName),
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': this.getMimeType(fileName),
        };
        res.writeHead(200, head);
        fsSync.createReadStream(filepath).pipe(res);
    }
  }

  // Get MIME type
  getMimeType = (filepath) => {
    const ext = path.extname(filepath).toLowerCase();
    const mimeTypes = {
      '.jpeg': 'image/jpeg',
      '.jpg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif'
      // Add more types if needed
    };
    return mimeTypes[ext] || 'application/octet-stream';
  }

  // Newly created, awaiting testing
  uploadFile = (req, res, file) => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'public');
        console.log('file uploaded');
      },
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueSurfix = Date.now() + '-' + Math.round(Math.random() * 1E9);    
        cb(null, file.fieldname + '-' + uniqueSurfix + ext);
      }
    });

    multer({storage}).single(file.name);
  }
}

export default new FileService