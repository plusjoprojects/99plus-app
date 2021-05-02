import OrdersType from './OrdersType'

export const setOrderItems = (item) => {
    return {
      type:OrdersType.SET_ORDERS_ITEMS,
      payload:item
    }
  }

  export const setSelectedAddress = (item) => {
    return {
      type:OrdersType.SET_SELECTED_ADDRESS,
      payload:item
    }
  }

  export const setOrderDiscountCode = (item) => {
    return {
      type:OrdersType.SET_ORDER_DISCOUNT_CODE,
      payload:item
    }
  }

  
  export const resetOrders = () => {
    return {
      type:OrdersType.RESET_ORDERS,
    }
  }