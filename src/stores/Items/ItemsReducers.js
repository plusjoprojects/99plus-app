import ItemsType from "./ItemsType";

const intintalState = {
  selectForYouItemsFirst: [],
  selectForYouItemsSecond: [],
  newItems: [],
  categoriesWithItems: [],
  wishListItems: [],
  ads:[]
};

const reducer = (state = intintalState, action) => {
  switch (action.type) {
    case ItemsType.SET_SELECT_FOR_YOU_ITEMS_FIRST:
      return { ...state, selectForYouItemsFirst: action.payload };

    case ItemsType.SET_SELECT_FOR_YOU_ITEMS_SECOND:
      return { ...state, selectForYouItemsSecond: action.payload };

    case ItemsType.SET_NEW_ITEMS:
      return { ...state, newItems: action.payload };

    case ItemsType.SET_CATEGORIES_WITH_ITEMS:
      return { ...state, categoriesWithItems: action.payload };
    case ItemsType.SET_WISHLIST_ITEMS:
      return { ...state, wishListItems: action.payload };
      case ItemsType.SET_ADS:
      return { ...state, ads: action.payload };
    default:
      return state;
  }
};

export default reducer;
