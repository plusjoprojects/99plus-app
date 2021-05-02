import UserType from "./UserType";

const intintalState = {
  user: {},
  auth: false,
  addresses:[],
  orders:[],
  notificationToken:{}
};

const reducer = (state = intintalState, action) => {
  switch (action.type) {
    case UserType.SET_USER:
      return { ...state, user: action.payload, auth: true };
      case UserType.SET_ADDRESSES:
      return { ...state, addresses: action.payload };
      case UserType.SET_ORDERS:
      return { ...state, orders: action.payload };
      case UserType.SET_NOTIFICATION_TOKEN:
      return { ...state, notificationToken:action.payload};
    default:
      return state;
  }
};

export default reducer;
