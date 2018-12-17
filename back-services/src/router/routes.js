

export default [
    // /app
    {
        path: '/app',
        request: {
            get: [
                {
                    controller: 'question.app',
                    method: 'hello',
                },
                {
                    controller: 'question.app',
                    method: 'test'
                }
            ],
        },
        children: [

        ]
    }
]
