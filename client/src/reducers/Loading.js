const SET_LOADING = "SET_LOADING";

export default function isLoading(state = [], action = {}) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    default:
      return state;
  }
}
