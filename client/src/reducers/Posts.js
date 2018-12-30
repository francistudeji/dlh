const SET_POSTS = "SET_POSTS";
const GET_POSTS = "GET_POSTS";

export default function posts(state = [], action = {}) {
  switch (action.type) {
    case GET_POSTS:
      let cp = state.posts.map(p => p._id === action.payload)
      return {
        ...state,
        currentPost: cp
      };
    case SET_POSTS:
      let i = state.findIndex(el => el._id === action.payload.posts._id);
      if (i === -1) {
        return [...state, ...action.payload];
      }
      return state;
      // const posts = action.payload
      // return [
      //   ...state,
      //   ...posts
      // ]
    default:
      return state;
  }
}
