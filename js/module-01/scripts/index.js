'use strict';

const adminLogin = 'admin';

let loginInput = prompt ('Введите логин');

if (!loginInput) {
    alert ('Отменено пользователем!');
} else if (loginInput === adminLogin) {
    const adminPassword = 'm4ng0h4ckz';

    let passInput = prompt ('Введите пароль');

    if (!passInput) {
        alert ('Отменено пользователем!');
    } else if (passInput === adminPassword) {
        alert ('Добро пожаловать!');
    } else {
        alert ('Доступ запрещен, неверный пароль!');
    }
} else {
    alert ('Доступ запрещен, неверный логин!');
}
