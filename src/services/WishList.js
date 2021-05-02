import store from '../stores/store'
import {ItemsActions,OrdersActions} from '../stores'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StorageToken} from '../constants'


let setOrderItems = item => store.dispatch(OrdersActions.setOrderItems(item))

let setWishListItem = item => store.dispatch(ItemsActions.setWishListItems(item))

function WishList() {

    async function StoreInStorage(wishListItems) {
        let _wishListItems = JSON.stringify(wishListItems)
        await AsyncStorage.setItem(StorageToken.wishList,_wishListItems)
        return "resolved"
    }

    async function StoreWishListItem(ItemID) {
        let states = store.getState()
        let wishListItems = states.items.wishListItems
        if(!wishListItems.includes(ItemID)) {
            wishListItems.push(ItemID)
        }
        setWishListItem(wishListItems)
        await StoreInStorage(wishListItems)
        return "Stored"
    }

    async function IndexWishListItems() {
        let wishListItems = await AsyncStorage.getItem(StorageToken.wishList)
        let _wishListItems = []
        if(wishListItems) {
            _wishListItems = JSON.parse(wishListItems)
        }
        return _wishListItems
    }

    function CheckIsInWishList(ItemID) {

        let states = store.getState()
        let wishListItems = states.items.wishListItems
        if(wishListItems.includes(ItemID))
        {
           return true
        }
        return false;
    }


    async function RemoveItemFromWishList(ItemID) {
        let states = store.getState()
        let wishListItems = states.items.wishListItems
        wishListItems.forEach((trg,index) => {
            if(ItemID == trg) {
                wishListItems.splice(index,1)
            }
        })

        setWishListItem(wishListItems)

        await StoreInStorage(wishListItems)

        return "Removed"
    }
    async function RemoveAllItems() {
        setWishListItem([])
        await StoreInStorage([])

        return "remove All"
    }


     return {
        StoreWishListItem,
        IndexWishListItems,
        CheckIsInWishList,
        RemoveItemFromWishList,
        RemoveAllItems
     }
}


export default WishList();