import React from 'react';
import { View, Dimensions,StyleSheet,TouchableOpacity } from 'react-native';
import { Icon,Layout, Text, Button, Toggle,CheckBox } from '@ui-kitten/components';
import { connect } from 'react-redux';
import {changeLanguage, translate} from '../../../translations'
import {TranslationsMethods} from '../../../services'
let EditUser = (props) => {
    let {height } = Dimensions.get("screen")
    let {lang} = props.settings.locale


    React.useEffect(() => {

        console.log(lang)
    },[])

    let ToggleView = () => {
        let styles = StyleSheet.create({
            box:{
                
                borderColor:'#f7f7f7',
                borderWidth:1,
                paddingVertical:2,
                paddingHorizontal:10,
                height:'100%'
            }
        })

        return (
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity onPress={() => {
                    if(lang !== "en") {
                        changeLanguage("en",false)
                    }
                }} style={{...styles.box,borderTopLeftRadius:5,borderBottomLeftRadius:5,backgroundColor:lang == "en"?"black":"white"}}>
                    <Text style={{fontSize:12,fontFamily:'CairoBold',color:lang == "en"?"white":"black"}}>EN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    if(lang !== "ar") {
                        changeLanguage("ar",true)
                    }
                }}  style={{...styles.box,borderTopRightRadius:5,borderBottomRightRadius:5,backgroundColor:lang == "ar"?"black":"white"}}>
                    <Text style={{fontSize:12,fontFamily:'CairoBold',color:lang == "ar"?"white":"black"}}>AR</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={{paddingHorizontal:10,borderRadius:5,paddingVertical:15,flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'white',marginTop:2}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Icon name={'globe-outline'} style={{width:20,height:20}} fill="black" />
                <View style={{width:5}}></View>
                <Text style={{fontSize:12}}>اللغة</Text>
            </View>
            <View>
            <ToggleView ></ToggleView>
            </View>
        </View>
    )

    return (
        <View style={{ height: height / 1.25, width: '100%', backgroundColor: 'white' }}>
            <View style={{ padding: 15 }}>
                <Text style={{ textAlign: 'left', fontSize: 18, fontFamily: TranslationsMethods.ReturnFont("Bold") }}>{translate("language")}</Text>
                <View style={{ marginTop: 30, width: '100%' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <CheckBox checked={lang == "ar" ?true:false} onChange={() => {
                            if(lang !== "ar") {
                                changeLanguage("ar",true)
                            }
                        }}>
                            العربية
                        </CheckBox>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <CheckBox checked={lang == "en" ?true:false} onChange={() => {
                            if(lang !== "en") {
                                changeLanguage("en",false)
                            }
                        }}>
                            English
                        </CheckBox>
                    </View>
                </View>
            </View>
        </View>
    )
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
        settings:state.settings
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);