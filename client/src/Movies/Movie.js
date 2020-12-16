import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, history }) {

  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((response) => setMovie(response.data))
      .catch((error) => console.log(error.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const updateHandler = (e) => {
    e.preventDefault();
    history.push(`/update-movie/${params.id}`)
  }

  const deleteHandler = (e) => {
    e.preventDefault()
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(response => {
        console.log(response)
        window.location = '/'
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="save-button" onClick={updateHandler}>
        Update
      </div>
      <div className="save-button" onClick={deleteHandler}>
        Delete
      </div>
    </div>
  );
}

export default Movie;