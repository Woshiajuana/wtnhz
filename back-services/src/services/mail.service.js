
import nodeMailer           from 'nodemailer'
import smtpTransport        from 'nodemailer-smtp-transport'
import Config               from '../config/env.config'

const {
    MAIL
}  = Config;

let mailClient = null;

export default {
    connect: () => new Promise((resolve, reject) => {
        try {
            if (!mailClient)
                mailClient = nodeMailer.createTransport(smtpTransport(MAIL));
            resolve(mailClient);
        } catch (err) {
            mailClient = null;
            reject(err);
        }
    }),
    send (to, subject, html) {
        let that = this;
        return new Promise(async (resolve, reject) => {
            try {
                const client = await that.connect();
                client.sendMail({
                    from: MAIL.auth.user,
                    to,
                    subject,
                    html,
                }, (err, res) => {
                    err ? reject(err) : resolve();
                })
            } catch (err) {
                reject(err);
            }
        })
    },
}
