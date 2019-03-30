
const data = () => {
    return {
        objInput$: {
            // 标题
            title: {
                value: '',
                label: '标题',
                type: 'text',
                placeholder: '加个标题呦...',
                use: [
                    {
                        nonempty: true,
                        prompt: '请输入标题',
                    },
                ],
            },
            // 验证码
            content: {
                value: '',
                label: '内容',
                type: 'text',
                placeholder: '来吧，尽情的发挥吧...',
                use: [
                    {
                        nonempty: true,
                        prompt: '请输入内容',
                    },
                ],
            },
        },
    }
};

export default {
    data,
}
