
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
                        prompt: '请输入昵称',
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
                placeholder: '请输入性别',
                use: [
                    {
                        nonempty: true,
                        prompt: '请输入性别',
                    },
                ],
                radio: [
                    { text: '男', value: '1' },
                    { text: '女', value: '0' },
                ]
            },
            // 职业
            job: {
                value: '9@qq.com',
                label: '职业',
                type: 'text',
                placeholder: '请输入职业',
                use: [
                    {
                        nonempty: true,
                        prompt: '请输入职业',
                    },
                ],
                arrow: true,
            },
            // 个性签名
            autograph: {
                value: '',
                label: '简介',
                type: 'text',
                placeholder: '一句话简介自己~~~',
                use: [
                    {
                        nonempty: true,
                        prompt: '请输入简介',
                    },
                ],
            }

        },
    }
};

export default {
    data,
}
