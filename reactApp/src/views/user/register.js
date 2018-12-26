

import React, { Component }             from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native'
import request from '../../common/request'
import config from '../../common/config'
import Head                             from '../../components/head'
import Button                           from '../../components/button'
import InputBox                         from '../../components/input-box'
import Code                             from '../../components/code'
import {
    width,
    height,
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
            <View style={styles.wrapSty}>
                <Head
                    leftIconSty={styles.leftIconSty}
                />
                <Image style={styles.logoSty}
                       source={{uri: 'http://20.0.18.93:32580/static/images/logo-icon-fc5366.png'}}/>
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
                    placeholder="请输入验证码"
                    placeholderTextColor="#dedede"
                    value={this.state.password}
                    onChangeText={(password) => {
                        this.setState({password});
                    }}
                    labelTxt="验证码">
                    <Code onCode={(callback) => {
                        callback();
                    }}/>
                </InputBox>
                <InputBox
                    placeholder="请输入密码"
                    placeholderTextColor="#dedede"
                    value={this.state.password}
                    onChangeText={(password) => {
                        this.setState({password});
                    }}
                    labelTxt="密码"
                />
                <InputBox
                    placeholder="请确认密码"
                    placeholderTextColor="#dedede"
                    value={this.state.password}
                    onChangeText={(password) => {
                        this.setState({password});
                    }}
                    labelTxt="确认密码"
                />
                <View style={[styles.promptSty, styles.promptLeftSty]}>
                    <Text style={styles.promptTextSty}>忘记密码?</Text>
                </View>
                <Button
                    buttonTxt="注册"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapSty: {
        width,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    leftIconSty: {
        color: '#fc5366',
    },
    logoSty: {
        width: j(150),
        height: j(150),
        marginTop: j(20),
        marginBottom: j(50),
    },
    promptSty: {
        width,
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
