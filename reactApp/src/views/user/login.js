

import React, { Component }             from 'react'
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
import Head                             from '../../components/head'
import Button                           from '../../components/button'
import InputBox                         from '../../components/input-box'
import {
    width,
    j,
}                                       from '../../utils/dimensions.util'


type Props = {};

export default class Login extends Component<Props> {
    constructor (props) {
        super(props);
        this.state = {

            email: '',

            password: '',


        }
    }

    render () {
        return (
            <View style={styles.container}>

                <View style={styles.innerSty}>
                    <InputBox
                        placeholder="请输入邮箱"
                        placeholderTextColor="#dedede"
                        value={this.state.email}
                        onChangeText={(email) => {
                            this.setState({email});
                        }}
                        labelTxt="邮箱"
                    />
                    <InputBox
                        placeholder="请输入密码"
                        placeholderTextColor="#dedede"
                        value={this.state.password}
                        onChangeText={(password) => {
                            this.setState({password});
                        }}
                        labelTxt="密码"
                    />
                    <View style={[styles.promptSty, styles.promptLeftSty]}>
                        <Text style={styles.promptTextSty}>忘记密码?</Text>
                    </View>
                    <Button
                        buttonTxt="登录"
                    />
                    <View style={styles.promptSty}>
                        <Text style={styles.promptTextSty}>还没有帐号?</Text>
                        <Text style={styles.promptLinkTextSty}>去注册</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    innerSty: {

    },
    promptSty: {
        height: j(120),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: j(55),
        paddingRight: j(55),
    },
    promptLeftSty: {
        height: j(60),
        lineHeight: j(60),
        justifyContent: 'flex-end',
    },
    promptTextSty: {
        color: '#999',
        fontSize: j(26),
    },
    promptLinkTextSty: {
        color: '#333',
        fontSize: j(26),
        marginLeft: j(10),
    },
});
