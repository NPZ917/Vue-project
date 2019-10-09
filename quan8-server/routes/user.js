var express = require('express');
var query = require('../utils/dbHelper.js');
var httpResult = require('../config');
var Token = require('../utils/token.js');

var router = express.Router();


// 密码登录
router.post('/login/pwd', function (req, res, next) {
    //从请求中解析出用户名和密码
    var {
        account,
        pwd
    } = req.body;
    var sql = 'SELECT `phone` FROM `dt_user` WHERE `name` = ? AND `pwd` = ?;';
    var params = [account, pwd]
    res.myPromise = query(sql, params)
        .then(results => {
            if (results[0]) {
                // 算出token并返回
                return httpResult.success(Token.generate({
                    account: account
                }));
            } else {
                return httpResult.failure(null, '用户名或密码错误');
            }
        });
    next();
});

//手机登录
router.post("/login/phone", function (req, res, next) {
    var {
        phone,
        code
    } = req.body;
    if (req.session.code !== code) {
        res.myPromise = promise.resolve(httpResult.failure(null, '验证码错误'));
        return;
    }
    res.myPromise = query('SELECT count( * ) AS count FROM `dt_user` WHERE `phone` = ?;', [phone])
        .then(results => {
            if (results[0].count === 1) {
                return httpResult.success(Token.generate({
                    phone: phone,
                }));
            } else {
                return httpResult.failure(null, '手机号未注册');
            }
        })
    next();
});

//获取验证码
router.get("/login/getcode", function (req, res, next) {
    code = "000000" + Math.ceil(Math.random() * 1000000).toString();
    code = code.substr(-6);
    req.token.code = code;
    res.myPromise = Promise.resolve(httpResult.success(code));
    next();
});

router.post('/login/admin',function(req, res,next) {
    var { name, pwd } = req.body;
    res.myPromise = query('SELECT count(*) AS count FROM `dt_admin` WHERE `name` = ? AND `pwd` = ?;', [ name, pwd ])
        .then(results => {
            if(results[0].count > 0) {
                // 算出token并返回
                return httpResult.success(Token.generate({name: name}));
            }else {
                return httpResult.failure(null, '用户名或密码错误');
            }
        });
    next();
});

router.post('/changepwd', Token.check, function(req, res, next) {
	var name = req.token.name;
	var { oldPwd, newPwd } = req.body;
	res.myPromise = query('CALL p_password(?,?,?);', [ name, oldPwd, newPwd ])
	    .then(results => {
	        if(results[0][0].result === '') return httpResult.success(null, '新密码修改成功');
	        else return httpResult.failure(null, '原始密码错误');
	    });
	next();
})


module.exports = router;