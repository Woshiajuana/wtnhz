
const data = () => {
    return {
        objHidden$: {
            theme: {
                value: '',
            }
        },
        objInput$: {
            // 标题
            title: {
                value: '',
                label: '标题',
                type: 'text',
                mold: 'input',
                placeholder: '加个标题呦...',
                use: [
                    {
                        nonempty: true,
                        prompt: '请输入标题',
                    },
                ],
            },
            // 主题
            themeName: {
                value: '',
                label: '主题',
                type: 'text',
                mold: 'select',
                placeholder: '别忘了选择主题...',
                use: [
                    {
                        nonempty: true,
                        prompt: '请选择主题',
                    },
                ],
            },
            // 内容
            content: {
                value: '',
                label: '内容',
                type: 'text',
                mold: 'textarea',
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
