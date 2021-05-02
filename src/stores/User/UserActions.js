import UserType from './UserType'

export const setUser = (item) => {
  return {
    type:UserType.SET_USER,
    payload:item
  }
}

export const setAddresses = (item) => {
  return {
    type:UserType.SET_ADDRESSES,
    payload:item
  }
}

export const setOrders = (item) => {
  return {
    type:UserType.SET_ORDERS,
    payload:item
  }
}

export const setLogout = () => {
  return {
    type:UserType.SET_LOGOUT,
  }
}

export const setNotificationToken = (item) => {
  return {
    type:UserType.SET_NOTIFICATION_TOKEN,
    payload:item
  }
}