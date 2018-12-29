

import React, { Component }             from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native'
import request from '../../common/request'
import config from '../../common/config'
import Button                           from '../../components/button'
import InputBox                         from '../../components/input-box'
import {
    width,
    height,
    j,
}                                       from '../../utils/dimensions.util'
import RegularUtil                      from '../../utils/regular.util'
import VerifyUtil                       from '../../utils/verify.util'
import ExtractUtil                      from '../../utils/extract.util'


type Props = {};

export default class Login extends Component<Props> {
    constructor (props) {
        super(props);
        this.state = {
            arrInput$: [
                // 邮箱
                {
                    key: 'email',
                    value: '9@qq.com',
                    label: '邮箱',
                    type: 'text',
                    placeholder: '请输入邮箱',
                    use: [
                        {
                            nonempty: true,
                            prompt: '请输入邮箱',
                        },
                        {
                            rule: RegularUtil.isEmail,
                            prompt: '邮箱输入错误',
                        },
                    ],
                },
                // 密码
                {
                    key: 'password',
                    value: '111111',
                    label: '密码',
                    type: 'password',
                    placeholder: '请输入密码',
                    use: [
                        {
                            nonempty: true,
                            prompt: '请输入密码',
                        },
                    ],
                },
            ],
        }
    }

    render () {
        let {
            arrInput$,
        } = this.state;
        return (
            <View style={styles.wrapSty}>
                <View style={styles.innerSty}>
                    <View style={styles.maskSty}/>
                    <View style={styles.formSty}>
                        {
                            arrInput$.map((item, index) => {
                                return (
                                    <InputBox
                                        key={item.label}
                                        placeholder={item.placeholder}
                                        placeholderTextColor="#dedede"
                                        value={item.value}
                                        onChangeText={(text) => {
                                            item.value = text;
                                            this.setState({arrInput$})
                                        }}
                                        labelTxt={item.label}
                                    />
                                )
                            })
                        }
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
        alignItems: 'center',
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
        alignItems: 'center',
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
