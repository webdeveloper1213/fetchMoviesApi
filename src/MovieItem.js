import Button from "./UI/Button";
const MovieItem = (props) => {
  const handleDelete = () => {
    props.onDelete(props.id);
  };

  //edit
  const handleEdit = () => {
    props.onEdit(props);
  };
  return (
    <>
      <li className="movie-item">
        <h2 className="">{props.title}</h2>
        <h3>{props.releaseDate}</h3>
        <p>{props.openingText}</p>
        {/* <Button onClick={props.onDelete}>Delete</Button> */}
        <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={handleEdit}>Edit</Button>
      </li>
    </>
  );
};
export default MovieItem;
