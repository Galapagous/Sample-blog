import mongoose from "mongoose";

const connect = (connectionString)=>{
    try {
        mongoose.connect(connectionString)
        .then(()=>{console.log('connected to database')})   
    } catch (error) {
        console.log(`error connecting to database ${error}`)
    }
}

export default connect