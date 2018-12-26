

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
                <View style={styles.innerSty}>
                    <View style={styles.maskSty}></View>
                    <View style={styles.formSty}>
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
                    <View style={styles.portraitSty}>
                        <Image
                            style={styles.portraitImageSty}
                            source={{uri: 'http://20.0.18.93:32580/static/images/login-banner-2.png'}}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapSty: {
        width,
        flex: 1,
        backgroundColor: '#fc5366',
    },
    portraitSty: {
        position: 'absolute',
        top: 0,
        left: width / 2,
        marginLeft: j(-110),
        width: j(220),
        height: j(220),
        borderRadius: j(220),
        borderWidth: j(10),
        borderColor: '#fff',
        backgroundColor: '#dedede',
    },
    portraitImageSty: {
        width: j(200),
        height: j(200),
        borderRadius: j(200),
    },
    maskSty: {
        width: 0,
        height: 0,
        borderBottomWidth: j(200),
        borderBottomColor: '#fff',
        borderLeftWidth: width,
        borderLeftColor: 'transparent',
    },
    innerSty: {
        width,
        height: height * 0.8,
        position: 'absolute',
        bottom: 0,
        left: 0,
        justifyContent: 'flex-end',
    },
    formSty: {
        width,
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
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
