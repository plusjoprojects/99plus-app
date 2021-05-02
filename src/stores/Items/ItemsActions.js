import ItemsType from "./ItemsType";

export const setSelectForYouItemsFirst = (item) => {
  return {
    type: ItemsType.SET_SELECT_FOR_YOU_ITEMS_FIRST,
    payload: item,
  };
};

export const setSelectForYouItemsSecond = (item) => {
  return {
    type: ItemsType.SET_SELECT_FOR_YOU_ITEMS_SECOND,
    payload: item,
  };
};

export const setNewItems = (item) => {
  return {
    type: ItemsType.SET_NEW_ITEMS,
    payload: item,
  };
};

export const setCategoriesWithItems = (item) => {
  return {
    type: ItemsType.SET_CATEGORIES_WITH_ITEMS,
    payload: item,
  };
};


export const setWishListItems = (item) => {
  return {
    type: ItemsType.SET_WISHLIST_ITEMS,
    payload: item,
  };
};

export const setAds = (item) => {
  return {
    type: ItemsType.SET_ADS,
    payload: item,
  };
};
