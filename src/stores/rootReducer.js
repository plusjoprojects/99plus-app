import UserReducers from './User/UserReducers'
import SettingsReducers from './Settings/SettingsReducers'
import ItemsReducers from './Items/ItemsReducers'
import CategoriesReducers from './Categories/CategoriesReducers'
import OrdersReducers from './Orders/OrdersReducers'

import {combineReducers} from 'redux'

const rootReducer = combineReducers({
  user: UserReducers,
  settings:SettingsReducers,
  items:ItemsReducers,
  categories:CategoriesReducers,
  orders:OrdersReducers
});

export default rootReducer;