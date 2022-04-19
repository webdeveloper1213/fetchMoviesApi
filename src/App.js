import "./styles.css";
import { useEffect, useState } from "react";
import MovieList from "./MovieList";
import AddMovie from "./AddMovie";
export default function App() {
  const [movies, setMovies] = useState([]);
  const [movie, setEditMovie] = useState(""); // for edit
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setIsLoading(true);
    setError(false);

    try {
      const response = await fetch(
        "https://react-http-37deb-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      console.log(data);

      const transformedData = Object.entries(data).map(([key, value]) => {
        return {
          id: key,
          ...value
        };
      });
      console.log(transformedData);
      setMovies(transformedData);
    } catch (error) {
      setError(error.message);
    }
  };

  //Add a movie
  const addMovieHandler = async (movie) => {
    try {
      const response = await fetch(
        "https://react-http-37deb-default-rtdb.firebaseio.com/movies.json",
        {
          method: "POST",
          body: JSON.stringify(movie),
          headers: {
            ContentType: "application/json"
          }
        }
      );
      if (!response) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      console.log(data);
      setMovies((prevMovies) => [...prevMovies], data); // code works without this line too
    } catch (error) {
      setError(error.message);
    }
  };
  //delete a movie

  const deleteMovieHandler = async (id) => {
    try {
      const response = await fetch(
        `https://react-http-37deb-default-rtdb.firebaseio.com/movies/${id}.json`,
        {
          method: "DELETE"
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      setMovies(movies.filter((movie) => movie.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  // edit
  const editMovieHandler = async (editMovie) => {
    console.log("DLAE");
    try {
      const response = await fetch(
        `https://react-http-37deb-default-rtdb.firebaseio.com/movies/${editMovie.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify(editMovie),
          headers: {
            ContentType: "application/json"
          }
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      setEditMovie("");
      fetchMovies();
    } catch (error) {
      setError(error.message);
    }
  };
  let content = <p>No Movies to Load</p>;
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (movies.length > 0) {
    content = (
      <MovieList
        movies={movies}
        onDelete={deleteMovieHandler}
        onEditMovie={(editMovie) => setEditMovie(editMovie)}
      />
    );
  }

  if (error) {
    content = <p className="fetch-error">Error : {error}</p>;
  }
  return (
    <div className="App">
      <AddMovie
        onAdd={addMovieHandler}
        onEdit={editMovieHandler}
        movie={movie}
      />
      {content}
      {/* <MovieList movies={movies} /> */}
    </div>
  );
}
