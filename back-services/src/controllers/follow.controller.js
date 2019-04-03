

import userService          from '../services/user.service'
import followerService      from '../services/follower.service'
import followingService     from '../services/following.service'

class Controller {

    // 关系
    async relation (ctx, next) {
        try {
            let {
                _id,
                id,
            } = await ctx.check$.testBody((regular) => {
                return {
                    _id: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ],
                    id: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ],
                }
            });
            let follower = await followerService.info({ following: id, follower: _id});
            let following = await followingService.info({ following: _id, follower: id});
            ctx.handle$.success({ follower, following, });
        } catch (err) {
            ctx.handle$.error(err);
        }
    }


    // 关注
    async create (ctx, next) {
        try {
            let {
                _id,
                id,
            } = await ctx.check$.testBody((regular) => {
                return {
                    _id: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ],
                    id: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                        {
                            rule: (value, data) => {
                                return value !== data._id;
                            },
                            prompt: '不能关注自己',
                        },
                    ],
                }
            });
            let filterParams = {
                following: id,
                follower: _id,
            };
            await followerService.create(filterParams);
            await followingService.create(filterParams);
            await userService.follow(_id, id);
            ctx.handle$.success();
        } catch (err) {
            ctx.handle$.error(err);
        }
    }

    // 粉丝列表
    async followers (ctx, next) {
        try {
            let filterParams = await ctx.check$.testBody((regular) => {
                return {
                    id:  [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ],
                    pageIndex: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                        {
                            rule: (value) => {
                                return regular.isNumber(+value) && !isNaN(+value);
                            },
                            prompt: '参数格式错误',
                        },
                    ],
                    pageSize: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                        {
                            rule: (value) => {
                                return regular.isNumber(+value) && !isNaN(+value);
                            },
                            prompt: '参数格式错误',
                        },
                    ],
                }
            });
            let data = await followingService.list(filterParams);
            ctx.handle$.success(data);
        } catch (err) {
            ctx.handle$.error(err);
        }
    }

    // 关注列表
    async following (ctx, next) {
        try {
            let filterParams = await ctx.check$.testBody((regular) => {
                return {
                    id:  [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ],
                    pageIndex: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                        {
                            rule: (value) => {
                                return regular.isNumber(+value) && !isNaN(+value);
                            },
                            prompt: '参数格式错误',
                        },
                    ],
                    pageSize: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                        {
                            rule: (value) => {
                                return regular.isNumber(+value) && !isNaN(+value);
                            },
                            prompt: '参数格式错误',
                        },
                    ],
                }
            });
            let data = await followingService.list(filterParams);
            ctx.handle$.success(data);
        } catch (err) {
            ctx.handle$.error(err);
        }
    }

    // 取消关注
    async remove (ctx, next) {
        try {
            let {
                _id,
                id,
            } = await ctx.check$.testBody((regular) => {
                return {
                    _id: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ],
                    id: [
                        {
                            nonempty: true,
                            prompt: '缺少必要参数',
                        },
                    ],
                }
            });
            let filterParams = {
                following: id,
                follower: _id,
            };
            await followerService.remove(filterParams);
            await followingService.remove(filterParams);
            await userService.cancelFollow(_id, id);
            ctx.handle$.success();
        } catch (err) {
            ctx.handle$.error(err);
        }
    }

}

export default new Controller();
