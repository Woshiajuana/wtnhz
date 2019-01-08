
import RoleConfig                   from 'config/role.config'
import Store                        from 'plugins/store.plugin'
import AuthService                  from 'services/auth.service'

const KEY_ROLE = 'KEY_ROLE';
const { OBJ_ROLE } = RoleConfig;

export default {

    // set
    update: (role) => new Promise((resolve, reject) => {
        let obj_role = role;
        if (typeof role === 'string') obj_role = OBJ_ROLE[role];
        if (!obj_role) throw 'must be set role';
        AuthService.getToken().then((info) => {
            Store.set(`${info.mobileNo}_${KEY_ROLE}`, obj_role).then(() => {
                resolve(obj_role)
            }).catch((err) => {
                reject(err);
            });
        }).catch((err) => {
            reject(err);
        })
    }),

    // get
    get () {
        // let _that = this;
        return new Promise((resolve, reject) => {
            AuthService.getToken().then((info) => {
                Store.get(`${info.mobileNo}_${KEY_ROLE}`).then((obj_role) => {
                    resolve(obj_role)
                }).catch((err) => {
                //     return _that.update(OBJ_ROLE['ordinary_user']);
                // }).then((obj_role) => {
                //     resolve(obj_role)
                // }).catch((err) => {
                    reject({code: '1001', msg: err});
                });
            }).catch((err) => {
                reject(err);
            })
        })
    },
}


