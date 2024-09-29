export const createComment = async (req, res) => {
 res.json({ message: "Comment created successfully" })
}

export const getAllComments = async (req, res) => {
 res.json({ message: "All comments retrieved successfully" })
}

export const getCommentById = async (req, res) => {
 res.json({ message: "Comment retrieved successfully" })
}

export const updateComment = async (req, res) => {
 res.json({ message: "Comment updated successfully" })
}

export const deleteComment = async (req, res) => {
 res.json({ message: "Comment deleted successfully" })
}

// For testing purposes, we are returning the request body in each function
