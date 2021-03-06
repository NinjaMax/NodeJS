const keys = require('../keys');

module.exports = function (email, token) {
    return {
        email: email,
        sender_name:  'Test',     
        sender_email: keys.EMAIL_FROM,
        subject: 'Восстановление доступа',
        body: `
        <h1>Вы забыли свой пароль?</h1>
        <p>Если нет, то проигнорируйте данное письмо</p>
        <p>Иначе нажмите на ссылку ниже: </p>
        <p><a href="${keys.BASE_URL}/auth/password/${token}">Восстановить пароль</a></p>
        <hr />
        <a href="${keys.BASE_URL}">Магазин курсов</a>
        `,
        list_id: 1

    };
};