import CategoriesType from './CategoriesType'

export const setCategories = (item) => {
    return {
      type: CategoriesType.SET_CATEGORIES,
      payload: item,
    };
  };