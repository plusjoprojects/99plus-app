import React from "react";

// Views
import { TouchableOpacity } from 'react-native'
import { Icon, TopNavigation, TopNavigationAction, } from "@ui-kitten/components";
import Badge from '../Badge'
import { Ionicons } from '@expo/vector-icons'

// Services
import { useNavigation } from '@react-navigation/native'
import { TranslationsMethods,BasketClass } from '../../services'

// Stores
import { connect } from 'react-redux'

let HeaderNav = ({ text = "", hasCart = true, orders }) => {
  let navigation = useNavigation()
  let { orderItems } = orders
  const BackIcon = (props) => <Icon {...props} name={TranslationsMethods.ReturnIconArrowNav()} />;

  const BackAction = () => <TopNavigationAction onPress={() => { navigation.goBack() }} icon={BackIcon} />;


  // Badge View For Checkout
  let BadgeView = () => {
    // Create Zero Number
    let number = 0;
    if (orderItems.length > 0) {
      orderItems.forEach((trg) => {
        number = number + trg.items.length
      })
      return (
        <Badge count={number} />
      )
    } else {
      return null
    }
  }

  const CheckoutMenu = () => {

    if (hasCart) {

      return (
        <TouchableOpacity onPress={() => { BasketClass.openBottom() }}>
          <Ionicons name="ios-cart-outline" style={{ fontSize: 30, color: 'black' }} />
          {BadgeView()}
        </TouchableOpacity>
      )
    } else {
      return null
    }

  }

  return (
    <TopNavigation accessoryRight={CheckoutMenu} accessoryLeft={BackAction} title={text} />
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.orders
  }
};

const mapDispatchToProps = (dispatch) => {
  return {

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNav);