'use strict';
var jwt = require('jsonwebtoken');
var httpResult = require('../config');


var secret = 'abc';      //token密钥（非常重要）
var Token = {
    // 生成token
    generate: payload => jwt.sign(payload, secret, { expiresIn: 5 * 60 * 60 }),
    // 验证token
    check: (req, res, next) => {
        jwt.verify(req.get('Authorization'), 'abc', function(err, decoded) {
            if(err) {res.send(httpResult.untoken()); return;}
            req.token = decoded;
            next();
        });
    }
};

module.exports = Token;