const SET_POSTS = "SET_POSTS";
const GET_POSTS = "GET_POSTS";

export default function posts(state = [], action = {}) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state
      };
    case SET_POSTS:
      // let i = state.findIndex(el => el._id === action.payload._id);
      // if (i === -1) {
      //   return [...state, ...action.payload];
      // }
      // return state;
      return [
        ...state,
        action.payload
      ]
    default:
      return state;
  }
}
