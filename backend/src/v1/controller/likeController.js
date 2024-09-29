export const addLike = (req, res) => {
 res.json({ message: "Like added successfully", comment: req.body })
}

export const removeLike = (req, res) => {
 res.json({ message: "Like removed successfully", comment: req.body })
}

