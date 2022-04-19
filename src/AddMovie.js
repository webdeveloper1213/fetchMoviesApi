import { useEffect, useRef } from "react";
import Button from "./UI/Button";
import Card from "./UI/Card";

const AddMovie = (props) => {
  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const releaseDateRef = useRef("");

  useEffect(() => {
    if (props.movie) {
      titleRef.current.value = props.movie.title;
      openingTextRef.current.value = props.movie.openingText;
      releaseDateRef.current.value = props.movie.releaseDate;
    }
  }, [props.movie]);

  const submitHandler = (e) => {
    e.preventDefault();

    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value
    };
    if (props.movie && props.movie.id) {
      props.onEdit({
        ...movie,
        id: props.movie.id
      });
    } else {
      props.onAdd(movie);
    }
    titleRef.current.value = "";
    openingTextRef.current.value = "";
    releaseDateRef.current.value = "";
  };
  return (
    <Card>
      <form className="movieForm">
        <div className="form-control">
          <label className="">Title</label>
          <input type="text" id="title" ref={titleRef} />
        </div>
        <div className="form-control">
          <label className="">Release Date</label>
          <input type="date" id="releaseDate" ref={releaseDateRef} />
        </div>
        <div className="form-control">
          <label className="">Opening Text</label>
          <textarea rows="5" id="openingText" ref={openingTextRef} />
        </div>
        <Button className="btn-add" onClick={submitHandler}>
          {props.movie !== "" ? " Edit Movie" : "Add Movie "}
        </Button>
      </form>
    </Card>
  );
};
export default AddMovie;
