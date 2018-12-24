

import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Alert,
} from 'react-native'
import Button from "react-native-button"
import request from '../../common/request'
import config from '../../common/config'
import Head from '../../components/head'


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

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    signUpBoxStyle: {
        marginTop: 30,
    },
    titleStyle: {
        marginBottom: 20,
        color: '#333',
        fontSize: 20,
        textAlign: 'center',
    },
    inputStyle: {
        height: 50,
        padding: 5,
        color: '#999',
        fontSize: 16,
        backgroundColor: '#fff',
        borderRadius: 4,
    },
    btnStyle: {
        padding: 10,
        marginTop: 10,
        backgroundColor: 'transparent',
        borderColor: '#ee735c',
        borderWidth: 1,
        borderRadius: 4,
        color: '#ee735c',
    },
    verifyCodeBoxStyle: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    countBtnStyle: {
        width: 110,
        height: 40,
        padding: 10,
        backgroundColor: 'transparent',
        borderColor: '#ee735c',
        borderWidth: 1,
        textAlign: 'left',
        fontWeight: '600',
        fontSize: 15,
        borderRadius: 2,
    },
    inputCodeStyle: {
        flex: 1,
    }
});
