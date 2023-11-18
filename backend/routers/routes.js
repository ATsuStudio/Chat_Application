const express = require("express");
const route = new express();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const chatController = require("../controllers/chatController");
const {check} = require('express-validator') ;
const accountCheck = require('../middle_ware/accountCheck_mw');
const roleAccess_mw = require("../middle_ware/roleAccess_mw");

// ---------- Authotoriozation routes ----------

route.post('/auth/singin',[
    check('login', 'Логин не должен быть пустым').notEmpty(),
    check('password', 'Длинна пароля должна быть не менее 8 не более 56 символов').isLength({min: 8, max: 56})
], authController.singin);

route.post('/auth/login',[
    check('login', 'Логин не должен быть пустым').notEmpty(),
    check('password', 'Длинна пароля должна быть не менее 8 не более 56 символов').isLength({min: 8, max: 56})
], authController.login);


// ---------- Users routes ----------

route.put('/user/account',[
    check('login', 'Логин не должен быть пустым').notEmpty(),
    check('password', 'Длинна пароля должна быть не менее 8 не более 56 символов').isLength({min: 8, max: 56}),
    roleAccess_mw(["admin"])
], userController.userUpdate);

// route.delete('/user/account',[
//     check('login', 'Логин не должен быть пустым').notEmpty(),
//     check('password', 'Длинна пароля должна быть не менее 8 не более 56 символов').isLength({min: 8, max: 56}),
//     jwtmiddleware(["admin"])
// ], userController.userUpdate);


route.get('/user/info/:ulogin',roleAccess_mw(['admin','moderator','user']), userController.getUserInfo);

route.post('/user/info',[accountCheck(),roleAccess_mw(['admin','moderator','user'])], userController.postUserInfo);

route.put('/user/info',[accountCheck(),roleAccess_mw(['admin','moderator','user'])], userController.putUserInfo);


route.get('/user/exist/:ulogin', roleAccess_mw(["admin", "user", "moderator"]),userController.getUserExist);

route.get('/user/userCheck', accountCheck(), userController.userCheck);

route.get('/user/users',roleAccess_mw(["admin","moderator"]), userController.getUsers);


// ---------- Chat routes ----------

route.get('/chat/',  accountCheck() ,chatController.getChat);

module.exports = route;  