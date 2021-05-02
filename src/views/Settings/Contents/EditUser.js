import React from 'react';
import { View, Dimensions } from 'react-native';
import { Layout, Text, Input,Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { useForm, Controller } from "react-hook-form";
import Toast from 'react-native-toast-message'
import {UserActions} from '../../../stores'
import {apis,TranslationsMethods} from '../../../services'
import {translate} from '../../../translations'
let EditUser = (props) => {
    let { width, height } = Dimensions.get("screen")
    let { control, handleSubmit, errors } = useForm();
    let {user} = props.user;
    let _Store = (data) => {
        let _data = {...data,ID:user.ID}

        let success = (res) => {
            Toast.show({
                text1:translate("success"),
                text2:translate("auth.edit_success"),
                visibilityTime:2000
            })
            props.closeBottomSheet()
            props.setUser(res.user)
        }

        let error = err => {
            console.log("Error Update User:",err,"\n",err.response.data)
            Toast.show({
                text1:translate("error"),
                text2:translate("network_error"),
                type:'error'
            })
        }

        apis.auth.update(_data,success,error)

    }
    return (
        <View style={{ height: height / 1.25, width: '100%', backgroundColor: 'white' }}>
            <View style={{ padding: 15 }}>
                <Text style={{ textAlign: 'left', fontSize: 18, fontFamily: TranslationsMethods.ReturnFont("Bold")}}>{translate("auth.edit_user")}</Text>
                <View style={{ marginTop: 30 }}>
                    <Controller
                        control={control}
                        name="name"
                        render={({ onChange, onBlur, value }) => (
                            <Input
                                onBlur={onBlur}
                                value={value}
                                onChangeText={(value) => onChange(value)}
                                placeholder={translate("auth.name")}
                                textStyle={{ textAlign: "right" }}
                                placeholderTextColor="black"
                                style={{ width: "100%", borderRadius: 50,marginBottom:5 }}
                                status={errors.name ? "danger" : "default"}
                                caption={errors.name ? translate("field_required") : ""}
                            />
                        )}
                        defaultValue={user.name}
                        rules={{ required: true }}
                    />
                    <Controller
                        control={control}
                        name="phone"
                        render={({ onChange, onBlur, value }) => (
                            <Input
                                onBlur={onBlur}
                                value={value}
                                keyboardType="phone-pad"
                                onChangeText={(value) => onChange(value)}
                                placeholder={translate("auth.phone")}
                                textStyle={{ textAlign: "right" }}
                                placeholderTextColor="black"
                                style={{ width: "100%", borderRadius: 50,marginBottom:5 }}
                                status={errors.phone ? "danger" : "default"}
                                caption={errors.phone ? translate("field_required") : ""}
                            />
                        )}
                        defaultValue={user.phone}
                        rules={{ required: true }}
                    />
                    <Controller
                        control={control}
                        name="password"
                        render={({ onChange, onBlur, value }) => (
                            <Input
                                onBlur={onBlur}
                                value={value}
                                secureTextEntry={true}
                                onChangeText={(value) => onChange(value)}
                                placeholder={translate("auth.password")}
                                textStyle={{ textAlign: "right" }}
                                placeholderTextColor="black"
                                style={{ width: "100%", borderRadius: 50,marginBottom:10 }}
                                caption={translate("auth.keep_empty")}
                            />
                        )}
                        defaultValue=""
                    />
                    <View style={{marginTop:20,paddingHorizontal:43}}>
                        <Button status="info" size="small" onPress={handleSubmit(_Store)}>{translate("auth.save")}</Button>
                    </View>
                </View>
            </View>
        </View>
    )
}


const mapStateToProps = (state) => {
    return {
        user:state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUser:item => dispatch(UserActions.setUser(item))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);