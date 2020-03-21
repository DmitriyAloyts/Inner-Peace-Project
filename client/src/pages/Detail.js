import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { useStoreContext } from "../utils/GlobalState";
import { SET_CURRENT_POST, ADD_FAVORITE, REMOVE_FAVORITE, ADD_COMMENT, LOADING } from "../utils/actions";

const Detail = props => {
  const [state, dispatch] = useStoreContext();
  useEffect(()=>{
    console.log(state)
  }, [state])
  useEffect(() => {
    console.log(commentRef.current.value);
    console.log(props.match.params);
    API.getPost(props.match.params.id)
      .then(res => dispatch({ type: SET_CURRENT_POST, post: res.data }))
      .catch(err => console.log(err));
  }, []);

  const addFavorite = () => {
    dispatch({
      type: ADD_FAVORITE,
      post: state.currentPost
    });
  };

  const removeFavorite = () => {
    dispatch({
      type: REMOVE_FAVORITE,
      _id: state.currentPost._id
    });
  };
  const favouriteIds = state.favorites.map(favourite => favourite._id)

  console.log(state.currentPost);

  const commentRef = useRef();
  const [commentstate, commentdispatch] = useStoreContext();

  const handleSubmit = e => {
    e.preventDefault();
    console.log(commentRef.current.value);

    dispatch({ type: LOADING });
    API.saveComment({
      comment: commentRef.current.value,
      post_id: state.currentPost._id
    })
      .then(result => {
        console.log(result)
        dispatch({
          type: ADD_COMMENT,
          comment: {_id: result.data.comments[result.data.comments.length-1], comment:commentRef.current.value},
          post_id: state.currentPost._id
        });
        commentRef.current.value = "";
      })
      .catch(err => console.log(err));

    
  };

  return (
    <>{state.currentPost ? (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h3>
                {state.currentPost.title} by {state.currentPost.author}
              </h3>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h3>Content:</h3>
              <p>{state.currentPost.body}</p>
            </article>
          </Col>
          {/* {state.favorites.indexOf(state.currentPost) !== -1 ? ( */}
          {favouriteIds.indexOf(state.currentPost._id) !== -1 ? (

            <button className="btn btn-danger" onClick={removeFavorite}>
              Remove from Favorites!
            </button>
          ) : (
              <button className="btn" onClick={addFavorite}>
                ❤️ Add to Favorites
            </button>
            )}
        </Row>
        <Row>
          <input className="form-control mb-5" ref={commentRef} placeholder="comments" />
          <button className="btn btn-success mt-3 mb-5" disabled={state.loading} type="submit"  onClick={handleSubmit} >
            Submit
          </button>
          <Col size="md-2">
            <ul>
              {
                // state.currentPost.comments &&
                state.currentPost.comments.map((comment) => <li>{comment.comment}</li>)
              }
            </ul>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Posts</Link>
          </Col>
        </Row>
      </Container>
    ) : (
        <div>loading...</div>
      )
    }</>
  );
};

export default Detail;
