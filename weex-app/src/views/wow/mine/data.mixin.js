
const data = () => {
    return {
        objInput$: {
            // 头像
            avatar: {
                value: '',
                label: '头像',
                type: 'text',
                arrow: true,
                use: [
                    {
                        nonempty: true,
                        prompt: '请选择头像',
                    },
                ],
            },
            // 昵称
            nickname: {
                value: '',
                label: '昵称',
                type: 'text',
                placeholder: '暂无昵称',
                use: [
                    {
                        nonempty: true,
                        prompt: '请输入昵称',
                    },
                ],
            },
            // 性别
            sex: {
                value: '1',
                label: '性别',
                type: 'text',
                placeholder: '请选择性别',
                use: [
                    {
                        nonempty: true,
                        prompt: '请选择性别',
                    },
                ],
                radio: [
                    { text: '男', value: '1' },
                    { text: '女', value: '0' },
                ]
            },
            // 个性签名
            autograph: {
                value: '',
                label: '个性签名',
                type: 'text',
                placeholder: '一句话简介自己~~~',
                use: [
                    {
                        nonempty: true,
                        prompt: '请输入个性签名',
                    },
                ],
            },
        },
    }
};

export default {
    data,
}
