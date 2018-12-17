

export default [
    // app
    {
        path: '/app',
        requests: {
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
