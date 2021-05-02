import React from 'react'
import store from '../stores/store'
import { OrdersActions } from '../stores'
let setOrderItems = item => store.dispatch(OrdersActions.setOrderItems(item))

function Basket() {
    async function addQty(itemID, itemsList, qty) {
        let _itemsList = itemsList
        _itemsList.forEach((trg, index) => {
            if (trg.item.ID == itemID) {
                let oldQty = trg.qty
                let newQty = oldQty + qty
                _itemsList[index].qty = newQty;
            }
        })

        setOrderItems(_itemsList)
    }


    async function AddToBasket(_item, qty) {
        let state = store.getState()
        let orderItems = state.orders.orderItems

        let hasCategory = false
        orderItems.forEach((trg, index) => {
            if (trg.category == _item.categories.title) {
                hasCategory = true;
                let items = trg.items
                let hasItem = false;
                items.forEach((item, index) => {
                    if (item.item.ID == _item.ID) {
                        hasItem = true;
                        ChangeQty(_item.ID, "+")
                    }
                })
                if (!hasItem) {
                    orderItems[index].items.push({ item: _item, qty: qty })
                }
            }
        })

        if (!hasCategory) {
            let items = []
            items.push({ item: _item, qty: qty })
            orderItems.push({ category: _item.categories.title, items: items })
        }

        setOrderItems(orderItems)
        return
    }

    async function ChangeQty(itemID, type) {
        let state = store.getState()
        let orderItems = state.orders.orderItems

        orderItems.forEach((trg) => {
            trg.items.forEach((item, index) => {
                if (item.item.ID == itemID) {
                    if (type == "+") {
                        if (item.qty < item.item.storagesItems.qty) {
                            trg.items[index].qty = item.qty + 1
                        }
                    } else {
                        if (item.qty !== 1) {
                            trg.items[index].qty = item.qty - 1
                        }
                    }
                }
            })
        })
        setOrderItems(orderItems)
        return
    }


    async function CheckItemInBasket(itemID) {
        let states = store.getState()
        let orderItems = states.orders.orderItems
        let has = false
        let _item = {}
        orderItems.forEach((trg, index) => {
            let items = trg.items
            items.forEach((item, index) => {
                if (item.item.ID == itemID) {
                    has = true
                    _item = item;
                }
            })
        })
        if (has) {
            return _item
        } else {
            return false
        }
    }

    async function RemoveItemFromBasket(itemID) {
        let states = store.getState()
        let orderItems = states.orders.orderItems

        orderItems.forEach((trg,inx) => {
            trg.items.forEach((item,index) => {
                if(item.item.ID == itemID) {
                    trg.items.splice(index,1)
                }
                if(trg.items.length == 0) {
                    orderItems.splice(inx,1)
                }
            })
        })

        setOrderItems(orderItems)
        return "done"
    }

    // async function RemoveItemFromBasket(itemID) {
    //     let states = store.getState()
    //     let orderItems = states.orders.orderItems
    //     orderItems.forEach((item, index) => {
    //         if (itemID == item.item.ID) {
    //             orderItems.splice(index, 1)
    //         }
    //     })

    //     setOrderItems(orderItems)

    //     return "Removed"
    // }

    return {
        AddToBasket,
        ChangeQty,
        RemoveItemFromBasket,
        CheckItemInBasket
    }
}

export default Basket()