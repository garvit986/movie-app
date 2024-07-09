import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import MoviesList from "../pages/MoviesList";
import Navbar from "../components/Navbar";
import MovieDetails from "../pages/MovieDetails";
import DisplayFavorites from "../pages/DisplayFavourite";

const GlobalRoutes: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies" element={<MoviesList />} />
        <Route path="/" element={<MoviesList />} />
        <Route path="/favorites" element={<DisplayFavorites />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
};

export default GlobalRoutes;
