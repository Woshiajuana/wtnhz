

import React, { Component }             from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native'
import request from '../../common/request'
import config from '../../common/config'
import Head                             from '../../components/head'
import Button                           from '../../components/button'
import InputBox                         from '../../components/input-box'
import Code                             from '../../components/code'
import Switch                           from '../../components/switch'
import {
    width,
    height,
    j,
}                                       from '../../utils/dimensions.util'
import RegularUtil                      from '../../utils/regular.util'


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
                // 验证码
                {
                    code: 'email',
                    value: '123',
                    label: '验证码',
                    type: 'tel',
                    placeholder: '请输入验证码',
                    use: [
                        {
                            nonempty: true,
                            prompt: '请输入验证码',
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
                // 确认密码
                {
                    value: '111111',
                    label: '确认密码',
                    type: 'password',
                    placeholder: '请确认密码',
                    use: [
                        {
                            nonempty: true,
                            prompt: '请确认密码',
                        },
                        {
                            rule: (value, data) => {
                                return value === data.password.value;
                            },
                            prompt: '两次密码不一致',
                        }
                    ],
                },
            ],
            objAgree$: {
                value: true,
                use: [
                    {
                        rule: (value) => {
                            return value === true;
                        },
                        prompt: '请阅读并同意服务协议',
                    },
                ],
            },
        }
    }

    render () {
        let {
            arrInput$,
            objAgree$,
        } = this.state;
        return (
            <View style={styles.wrapSty}>
                <Head
                    leftIconSty={styles.leftIconSty}
                />
                <Image style={styles.logoSty}
                       source={{uri: 'http://20.0.18.93:32580/static/images/logo-icon-fc5366.png'}}/>

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
                                labelTxt={item.label}>

                                {
                                    item.label === '验证码'
                                        ?
                                        <Code onCode={(callback) => {
                                            callback();
                                        }}/>
                                        :
                                        null
                                }
                            </InputBox>
                        )
                    })
                }
                <View style={styles.promptSty}>
                    <Switch
                        value={objAgree$.value}
                        onChangeText={() => {
                            objAgree$.value = !objAgree$.value;
                            this.setState({
                                objAgree$,
                            })
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            objAgree$.value = !objAgree$.value;
                            this.setState({
                                objAgree$,
                            })
                        }}>
                        <Text style={styles.promptTextSty}>你已阅读并同意</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.promptLinkTextSty}>《服务协议》</Text>
                    </TouchableOpacity>
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
        marginLeft: j(10),
        color: '#999',
        fontSize: j(26),
    },
    promptLinkTextSty: {
        color: '#333',
        fontSize: j(26),
        marginLeft: j(10),
    },
});
