import axios from "axios";

const SET_POSTS = "SET_POSTS";
const GET_POSTS = "GET_POSTS";
const SET_LOADING = "SET_LOADING";

export function setPosts() {
  return dispatch => {
    setTimeout(async () => {
      axios({
        url: "/api/posts",
        method: "get"
      })
        .then(res => {
          dispatch({ type: SET_LOADING, payload: false });
          dispatch({ type: SET_POSTS, payload: res.data });
        })
        .catch(err => {
          if(err) console.log({err})
        });
    }, 3000)
  };
}

//
export function getPosts() {
  return dispatch => {
    dispatch({ type: GET_POSTS });
  };
}
