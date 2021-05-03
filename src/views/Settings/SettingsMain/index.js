import React from 'react';
import { View,ScrollView,TouchableOpacity,Dimensions } from 'react-native';
import { Layout,Text,TopNavigation,Icon,Divider } from '@ui-kitten/components';
import { connect } from 'react-redux';
import BottomSheet from "reanimated-bottom-sheet";

// Settings Content
import {EditUser,Notification,Language} from '../Contents'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageToken } from '../../../constants';
import {UserActions} from '../../../stores'
import {translate} from '../../../translations'
import {TranslationsMethods} from '../../../services'
import HeaderNav from './components/HeaderNav'
let SettingsMain = (props) => {
    let {user,auth} = props.user;
    let {navigation} = props;

    let [type,setType] = React.useState("")

    let {width,height} = Dimensions.get("screen")


    let ListItem = ({icon,title,onPress}) => (
        <TouchableOpacity onPress={onPress} style={{paddingHorizontal:10,borderRadius:5,paddingVertical:15,flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'white',marginTop:2}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Icon name={icon} style={{width:20,height:20}} fill="black" />
                <View style={{width:5}}></View>
                <Text style={{fontSize:12}}>{title}</Text>
            </View>
            <View>
                <Icon name={TranslationsMethods.ReturnIconArrowSettings()} style={{width:20,height:20}} fill="black" />
            </View>
        </TouchableOpacity>
    )

    let bottomSheetRef = React.useRef(null)
    let openBottomSheet = () => {
        bottomSheetRef.current.snapTo(0)
    }
    let closeBottomSheet = () => {
        bottomSheetRef.current.snapTo(2)
    }

    let ShowBottomContent = () => {
        if(type == "EditUser") {
            return (
                <EditUser closeBottomSheet={closeBottomSheet} />
            )
        }

        if(type == "Notification") {
            return (
                <Notification closeBottomSheet={closeBottomSheet} />
            )
        }

        if(type == "Language") {
            return (
                <Language closeBottomSheet={closeBottomSheet} />
            )
        }

        return null;
    }

    let Logout = async() => {
        await AsyncStorage.removeItem(StorageToken.userToken)
        await AsyncStorage.removeItem(StorageToken.wishList)
        await AsyncStorage.removeItem(StorageToken.firstTime)

        navigation.navigate("Loading")
    }
     return(
         <Layout style={{flex:1}} level="1">
            <HeaderNav />
            <ScrollView contentContainerStyle={{padding:5,marginTop:5}}>
                <Text style={{fontFamily:TranslationsMethods.ReturnFont("Bold"),textAlign:'left',marginHorizontal:5,fontSize:14}}>{translate("settings.account_edit")}</Text>
                <View style={{marginTop:10}}></View>
                {auth &&
                <>
                <ListItem icon="person-outline" title={translate("settings.account_edit_user")} onPress={() => {setType("EditUser");openBottomSheet()}} />
                <ListItem onPress={() => {navigation.navigate("Addresses")}} icon="map-outline" title={translate("settings.addresses")}  />
                <ListItem icon="bell-outline" title={translate("settings.notification")} onPress={() => {setType("Notification");openBottomSheet()}} />
                </>
                }
                {!auth &&
                    <ListItem onPress={() => {navigation.navigate("IntroNavigation")}} icon="log-in-outline" title={translate("settings.login")} />
                }
                <View style={{marginTop:30}}></View>
                <Text style={{fontFamily:TranslationsMethods.ReturnFont("Bold"),textAlign:'left',marginHorizontal:5,fontSize:14}}>{translate("settings.general_settings")}</Text>
                <View style={{marginTop:10}}></View>
                <Language />
                {/* <ListItem icon="share-outline" title={"مشاركة"} onPress={() => {setType("Language");openBottomSheet()}} /> */}
                {/* <ListItem icon="inbox-outline" title={"اتصل بنا"} onPress={() => {}} /> */}
                {auth && 
                    <ListItem icon="log-out-outline" title={translate("settings.logout")} onPress={Logout} />
                }
            </ScrollView>

            <BottomSheet
                ref={bottomSheetRef}
                initialSnap={2}
                snapPoints={[height / 1.25, height / 1.25, 0]}
                borderRadius={15}
                renderContent={ShowBottomContent}
                enabledInnerScrolling={true}
            />
         </Layout>
     )
}


const mapStateToProps = (state) => {
     return {
         user:state.user
     }
};

const mapDispatchToProps = (dispatch) => {
     return {
         setLogout:item => dispatch(UserActions.setLogout(item))
     }
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsMain);