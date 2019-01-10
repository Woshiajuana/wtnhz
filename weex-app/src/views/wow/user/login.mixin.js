import RegularUtil              from 'utils/regular.util'

const data = () => {
    return {
        srcMask: 'data:image/png;base64,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',
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
            // 图形验证码
            captcha: {
                value: '111111',
                label: '图形验证码',
                type: 'tel',
                placeholder: '请输入图形验证码',
                display: false,
                use: [
                    {
                        nonempty: true,
                        prompt: '请输入图形验证码',
                    },
                ],
            },
        },
    }
};

export default {
    data,
}
