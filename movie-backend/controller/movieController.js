const Favmovies = require('../models/favmoviesSchema'); // Import Mongoose model
const User = require('../models/userSchema'); // Import Mongoose model for user checks if needed
const messages = require('../validations/messageDefault');
const statusCodes = require('../validations/statusCodes');

const addFavorite = async (req, res) => {
  const { username, imdbID } = req.body;
  
  try {
    const exists = await Favmovies.findOne({ username, imdbID });

    if (exists) {
      return res.status(statusCodes.BAD_REQUEST).json({ message: messages.MOVIE_EXISTS });
    }

    await Favmovies.create({ username, imdbID });
    return res.status(statusCodes.OK).json({ message: messages.MOVIE_ADDED });
    
  } catch (error) {
    console.error("Error adding favorite movie:", error);
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: messages.INTERNAL_SERVER_ERROR });
  }
};

const removeFavorite = async (req, res) => {
  const { username, imdbID } = req.body;

  try {
    const user = await Favmovies.findOne({ username, imdbID });

    if (!user) {
      return res.status(statusCodes.NOT_FOUND).json({ message: messages.MOVIE_NOT_FOUND });
    }

    await Favmovies.deleteOne({ username, imdbID });
    return res.status(statusCodes.OK).json({ message: messages.MOVIE_REMOVED });

  } catch (error) {
    console.error("Error removing favorite movie:", error);
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: messages.INTERNAL_SERVER_ERROR });
  }
};

const getFavorite = async (req, res) => {
  const { username } = req.params;

  try {
    const favorites = await Favmovies.find({ username });

    if (!favorites || favorites.length === 0) {
      return res.status(statusCodes.NOT_FOUND).json({ message: messages.NO_FAVORITES_FOUND });
    }

    const imdbIDs = favorites.map(fav => fav.imdbID);
    return res.status(statusCodes.OK).json({ favmovies: imdbIDs });

  } catch (error) {
    console.error("Error retrieving favorite movies:", error);
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: messages.INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  addFavorite,
  removeFavorite,
  getFavorite
};
