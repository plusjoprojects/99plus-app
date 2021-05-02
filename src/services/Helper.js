let Helper = {
  langChecker(lang, item, column) {
    switch (lang) {
      case "en":
        if (column == "title") {
          return item.title;
        } else if (column == "description") {
          return item.description;
        }
      case "ar":
        // Arabic Check:
        if (column == "title") {
          if (item.translations.length == 0) {
            return item.title;
          }
          // if have translation
          let _haveTrans = false;
          let _value = "";
          item.translations.forEach((trg, index) => {
            if (trg.column_name == "title") {
              _haveTrans = true;
              _value = trg.value;
            }
          });
          if (_haveTrans) {
            return _value;
          } else {
            return item.title;
          }
        } else if (column == "description") {
          if (item.translations.length == 0) {
            return item.description;
          }
          // if have translation
          let _haveTrans = false;
          let _value = "";
          item.translations.forEach((trg, index) => {
            if (trg.column_name == "description") {
              _haveTrans = true;
              _value = trg.value;
            }
          });
          if (_haveTrans) {
            return _value;
          } else {
            return item.description;
          }
        }

      default:
        if (column == "title") {
          return item.title;
        } else if (column == "description") {
          return item.description;
        }
    }
  },
  coinsLogsChecker(title, coinsLogs) {
    let has = false;
    coinsLogs.forEach((trg, index) => {
      if (trg.way == title) {
        has = true;
      }
    });

    return has;
  },
  check_values: function (values) {
    let error = 0;
    values.forEach((trg) => {
      if (trg == "") {
        error = error + 1;
      }
    });
    return error == 0 ? true : false;
  },
  getTotalPrice: function(orderItems) {
    // Be Carful orderItems is object have item and qty
    let total = 0;
    orderItems.forEach((trg,index) => {
      let item = trg.item;
      let itemTotal = item.discount == 0? item.price * trg.qty:item.discount * trg.qty
      total = total + itemTotal
    })
    return total.toFixed(2);
  },
  getTotalPriceWithDiscount:function(total,discountValue) {
    let discountFixed = discountValue * 0.01
    let fullDiscount = total * discountFixed
    let f = total - fullDiscount
    return f.toFixed(2);
  }
};

export default Helper;
