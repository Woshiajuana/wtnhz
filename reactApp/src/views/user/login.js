

import React, { Component }     from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Alert,
} from 'react-native'
import request from '../../common/request'
import config from '../../common/config'
import Head                     from '../../components/head'
import Button                   from '../../components/button'
import InputBox                 from '../../components/input-box'


type Props = {};

export default class Login extends Component<Props> {
    constructor (props) {
        super(props);
        this.state = {
            codeSent: false,
            countingDone: false,
            phoneNumber: '',
            verifyCode: '',
            number: 10,
        }
    }

    render () {
        return (
            <View style={ styles.container }>
                <Head
                    leftTxt="返回"
                    centerTxt="哈哈"
                    rightTxt="右边"
                />
                <InputBox
                    labelTxt="邮箱"
                />
                <InputBox
                    labelTxt="邮箱"
                />
                <Button
                    buttonTxt="登录"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
});
