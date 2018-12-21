import RegularUtil              from 'utils/regular.util'

const data = () => {
    return {
        objInput$: {
            // 邮箱
            email: {
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
            code: {
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
            password: {
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
            rePassword: {
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
        },
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
        }
    }
};

export default {
    data,
}
