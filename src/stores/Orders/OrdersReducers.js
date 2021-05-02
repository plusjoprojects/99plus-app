import OrdersType from './OrdersType'

const intintalState = {
  orderItems: [],
  address: {
    city: '',
    area: '',
    address: '',
    lat: 0,
    long: 0,
    ID: 0
  },
  orderDiscountCode: null
};


const reducer = (state = intintalState, action) => {
  switch (action.type) {
    case OrdersType.SET_ORDERS_ITEMS:
      return { ...state, orderItems: action.payload }
    case OrdersType.SET_SELECTED_ADDRESS:
      return { ...state, address: action.payload }
    case OrdersType.SET_ORDER_DISCOUNT_CODE:
      return { ...state, orderDiscountCode: action.payload }
    case OrdersType.RESET_ORDERS:
      return { ...state, orderItems: [], address: {}, orderDiscountCode: null }
    default:
      return state;
  }
};

export default reducer;