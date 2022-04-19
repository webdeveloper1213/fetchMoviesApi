import Card from "./UI/Card";
import MovieItem from "./MovieItem";
const MovieList = (props) => {
  return (
    <>
      <p>MovieList</p>
      <Card>
        <ul>
          {props.movies.map((movie) => (
            <MovieItem
              key={movie.id}
              title={movie.title}
              openingText={movie.openingText}
              releaseDate={movie.releaseDate}
              onDelete={props.onDelete.bind(null, movie.id)}
              onEdit={() => props.onEditMovie(movie)}
            />
          ))}
        </ul>
      </Card>
    </>
  );
};
export default MovieList;
