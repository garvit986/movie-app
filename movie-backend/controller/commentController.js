const Comments = require('../models/commentSchema');
const messages = require('../validations/messageDefault');
const statusCodes = require('../validations/statusCodes');

const addComment = async (req, res) => {
  try {
    const { imdbID, username, comment, rating } = req.body;

    await Comments.create({ imdbID, username, comment, rating });

    res.status(statusCodes.OK).json({ message: messages.COMMENT_ADDED });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: messages.INTERNAL_SERVER_ERROR });
  }
};

const getComment = async (req, res) => {
  try {
    const { imdbID } = req.params;

    const movieComments = await Comments.find({ imdbID }).select('comment username createdAt rating');

    if (movieComments.length === 0) {
      return res.status(statusCodes.NOT_FOUND).json({ message: messages.NO_COMMENTS_FOUND });
    }

    const fetchComments = movieComments.map(comment => ({
      comment: comment.comment,
      username: comment.username,
      createdAt: comment.createdAt,
      rating: comment.rating,
    }));

    res.status(statusCodes.OK).json({ comments: fetchComments });
  } catch (error) {
    console.error("Error retrieving comments:", error);
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: messages.INTERNAL_SERVER_ERROR });
  }
};

module.exports = { addComment, getComment };
