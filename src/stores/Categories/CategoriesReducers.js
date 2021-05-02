import CategoriesType from "./CategoriesType";

const intintalState = {
  categories: [],
};

const reducer = (state = intintalState, action) => {
  switch (action.type) {
    case CategoriesType.SET_CATEGORIES:
      return { ...state, categories: action.payload };

    default:
      return state;
  }
};

export default reducer;
