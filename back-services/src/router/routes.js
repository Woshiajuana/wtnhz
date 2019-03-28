

export default [
    // /app
    {
        path: '/app',
        children: [
            // 用户
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
                    {
                        path: '/revise',
                        request: {
                            post: [
                                {
                                    controller: 'auth',
                                    method: 'check',
                                },
                                {
                                    controller: 'user.app',
                                    method: 'revise',
                                }
                            ]
                        }
                    },
                    {
                        path: '/forgot',
                        request: {
                            post: [
                                {
                                    controller: 'user.app',
                                    method: 'forgot',
                                }
                            ]
                        }
                    },
                    {
                        path: '/captcha',
                        request: {
                            post: [
                                {
                                    controller: 'user.app',
                                    method: 'captcha',
                                }
                            ]
                        }
                    },
                ],
            },
            // 上传
            {
                path: '/upload',
                children: [
                    {
                        path: '/image',
                        request: {
                            post: [
                                {
                                    controller: 'auth',
                                    method: 'check',
                                },
                                {
                                    controller: 'upload',
                                    method: 'image',
                                },
                            ]
                        }
                    },
                    {
                        path: '/base64',
                        request: {
                            post: [
                                {
                                    controller: 'auth',
                                    method: 'check',
                                },
                                {
                                    controller: 'upload',
                                    method: 'base64',
                                },
                            ]
                        }
                    },
                    {
                        path: '/file',
                        request: {
                            post: [
                                {
                                    controller: 'auth',
                                    method: 'check',
                                },
                                {
                                    controller: 'upload',
                                    method: 'file',
                                },
                            ]
                        }
                    },
                ],
            },
            // 帖子 post
            {
                path: '/post',
                children: [
                    {
                        path: '/publish',
                        request: {
                            post: [
                                {
                                    controller: 'auth',
                                    method: 'check',
                                },
                                {
                                    controller: 'post',
                                    method: 'publish',
                                },
                            ]
                        },
                    },
                    {
                        path: '/list',
                        request: {
                            post: [
                                {
                                    controller: 'post',
                                    method: 'list',
                                },
                            ]
                        }
                    },
                    {
                        path: '/info',
                        request: {
                            post: [
                                {
                                    controller: 'post',
                                    method: 'info',
                                },
                            ]
                        }
                    },
                    {
                        path: '/remove',
                        request: {
                            post: [
                                {
                                    controller: 'auth',
                                    method: 'check',
                                },
                                {
                                    controller: 'post',
                                    method: 'remove',
                                },
                            ]
                        }
                    },

                    {
                        path: '/theme',
                        children: [
                            {
                                path: '/create',
                                request: {
                                    post: [
                                        {
                                            controller: 'auth',
                                            method: 'check',
                                        },
                                        {
                                            controller: 'post.theme',
                                            method: 'create',
                                        },
                                    ]
                                },
                            }
                        ]
                    }
                ],
            },
        ]
    }
]
