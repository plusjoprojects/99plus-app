import axios from "axios";
import { env } from "../constants";

let apis = {
  auth:{
      login(data,onSuccess,onError){
          axios.post(env.server + 'app/user/auth/login',data).then((res) => {
            onSuccess(res.data)
          }).catch(err => {
              onError(err)
          })
      },
      register(data,onSuccess,onError){
        axios.post(env.server + 'auth/register',data).then((res) => {
            onSuccess(res.data)
          }).catch(err => {
              onError(err)
          })
      },
      auth(token,onSuccess,onError) {
        axios
        .get(env.server + "app/user/auth/auth", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => onSuccess(res.data))
        .catch((err) => onError(err));
      },
      update(data,onSuccess,onError){
        axios.post(env.server + 'app/user/auth/update',data).then((res) => {
            onSuccess(res.data)
          }).catch(err => {
              onError(err)
          })
      },
  },
  main:{
    index(onSuccess,onError) {
      axios.get(env.server + 'app/index').then((res) => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      })
    },
    showItem(id,onSuccess,onError) {
      axios.get(env.server + 'app/item/' + id).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      });
    },
    indexCategory(id,page,onSuccess,onError) {
      axios.get(env.server + 'app/category/index/' + id + '/' + page).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      });
    },
    loadMoreCategory(id,page,onSuccess,onError) {
      axios.get(env.server + 'app/category/loadMore/' + id + '/' + page).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      });
    },
    indexSubCategoriesItems(id,page,onSuccess,onError) {
      axios.get(env.server + 'app/subCategory/index/' + id + '/' + page).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      });
    },
    search(text,onSuccess,onError) {
      axios.get(env.server + 'app/search/' + text).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      });
    },
    adIndexItems(id,onSuccess,onError) {
      axios.get(env.server + 'advance/ad_items/index/' + id).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      });
    },
    indexItemsWithIDS(data,onSuccess,onError) {
      axios.post(env.server + 'app/items/indexWithIDS',data).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      });
    },
    indexAllItems(data,onSuccess,onError) {
      axios.get(env.server + 'app/items/indexAllItems/' + data.type + "/" + data.page).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      });
    },
    StoreNotificationToken(data,onSuccess,onError) {
      axios.post(env.server + 'app/user/notification/store',data).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      });
    },
    UpdateNotificationToken(data,onSuccess,onError) {
      axios.post(env.server + 'app/user/notification/update',data).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      });
    }
  },
  address:{
    storeAddress(data,onSuccess,onError) {
      axios.post(env.server + 'app/user/address/store',data).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      });
    },
    indexAddress(id,onSuccess,onError) {
      axios.get(env.server + 'app/user/address/index/' + id).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      });
    },
    removeAddress(id,onSuccess,onError) {
      axios.get(env.server + 'app/user/address/destroy/' + id).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      });
    }
  },
  orders:{
    storeOrder(data,onSuccess,onError) {
      axios.post(env.server + 'app/user/orders/store',data).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      });
    },
    showOrder(id,onSuccess,onError) {
      axios.get(env.server + 'app/user/order/show/' + id).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      });
    },
    checkDiscountCode(data,onSuccess,onError) {
      axios.get(env.server + 'app/discountCode/check/' + data.code + '/' + data.user_id).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      });
    }
  },
  wishList:{
    storeWishList(data,onSuccess,onError) {
      axios.post(env.server + 'app/user/wishlist/store',data).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      });
    },
    destroyWishList(id,onSuccess,onError) {
      axios.get(env.server + 'app/user/wishlist/store/' + id).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      });
    }
  }
};

export default apis;
