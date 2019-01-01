

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
            // /user
            {
                path: '/user',
                children: [
                    {
                        path: '/login',
                        request: {
                            post: [
                                {
                                    controller: 'user.app',
                                    method: 'login',
                                },
                            ],
                        },
                    },
                    {
                        path: '/send',
                        request: {
                            post: [
                                {
                                    controller: 'user.app',
                                    method: 'send',
                                },
                            ]
                        }
                    },
                    {
                        path: '/register',
                        request: {
                            post: [
                                {
                                    controller: 'user.app',
                                    method: 'register',
                                },
                            ],
                        },
                    },
                    {
                        path: '/info',
                        request: {
                            post: [
                                {
                                    controller: 'auth',
                                    method: 'check',
                                },
                                {
                                    controller: 'user.app',
                                    method: 'info',
                                }
                            ]
                        }
                    },
                    {
                        path: '/update',
                        request: {
                            post: [
                                {
                                    controller: 'auth',
                                    method: 'check',
                                },
                                {
                                    controller: 'user.app',
                                    method: 'update',
                                }
                            ]
                        }
                    },
                ]
            }
        ]
    }
]
