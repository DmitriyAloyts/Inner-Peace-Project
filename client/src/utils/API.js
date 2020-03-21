import axios from "axios";

export default {
  // Gets all posts
  getPosts: function() {
    return axios.get("api/posts");
  },
  // Gets the post with the given id
  getPost: function(id) {
    // return axios.get("http://localhost:3001/api/posts/" + id);
    return axios.get("/api/posts/" + id);
  },
  // Deletes the post with the given id
  deletePost: function(id) {
    return axios.delete("/api/posts/" + id);
  },
  // Saves a post to the database
  savePost: function(postData) {
    return axios.post("/api/posts", postData);
  },
  
  saveComment: function(commentData) {
    return axios.post("/api/comments", commentData);
  }
};
