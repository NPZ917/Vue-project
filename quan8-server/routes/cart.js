'use strict';
var express = require('express');
var httpResult = require('../config');
var query = require('../utils/dbHelper.js');
var router = express.Router();


router.post('/addProduct', function(req,res,next) {
    var pid = parseInt(req.body.pid);
    var count = parseInt(req.body.count);
    var name = req.token.account;
    res.myPromise = query('CALL p_addProductToCart(?,?,?,?);',[name, pid, count, new Date()])
        .then(results => {
			if(results[0][0].result === '')
				return httpResult.success(results[0][0].result);
			else
				return httpResult.failure(null, results[0][0].result);
		});
        next();
});

router.get('/getcount',  function(req,res,next) {
    var name = req.token.account;
    res.myPromise = query('SELECT sum(`count`) as count FROM `dt_cart` WHERE `name` = ?;',[name])
        .then(results => httpResult.success(results[0].count || 0));
        next();
});

router.post('/list', function(req, res,next) {
    var name = req.token.account;
    res.myPromise = query('CALL p_getCartInfo(?);', [ name ])
        .then(results => httpResult.success(results[0]));
    next();
});

// 数量加减的
router.get('/increase/:id',  function(req,res,next) {
    var id = parseInt(req.params.id);
    res.myPromise = query('UPDATE `dt_cart` SET `count` = `count` + 1 WHERE `id` = ?;', [ id ])
        .then(results => {
            if(results.affectedRows === 1 ) return httpResult.success();
            else return httpResult.faliure(null, '失败..');
            });
    next();
});

router.get('/decrease/:id', function(req,res,next) {
    var id = parseInt(req.params.id);
    res.myPromise = query('UPDATE `dt_cart` SET `count` = `count` - 1 WHERE `id` = ?;', [ id ])
        .then(results => {
            if(results.affectedRows === 1 ) return httpResult.success();
            else return httpResult.faliure(null, '失败..');
            });
    next();
});

router.post('/delete', function(req, res, next) {
    var ids = JSON.parse(req.body.ids);
    res.myPromise = query('DELETE FROM `dt_cart` WHERE `id` IN (?);', [ids])
        .then(result =>{
            if(result.affectedRows === ids.length) return httpResult.success();
            else return httpResult.faliure(null, '删除失败...'); 
        });
     next();
});

router.post('/settlement', function(req,res,next) {
    var ids = JSON.parse(req.body.ids).join(',');
    var account = parseInt(req.body.account);
	var addressId = parseInt(req.body.addressId);
    var name = req.token.account;
    res.myPromise = query('CALL p_settlement(?,?,?,?,?);', [ids, account, new Date(), name, addressId])
        .then(() => httpResult.success());
    next()
});

router.post('/getlist', function(req,res,next) {
	var name = req.token.account;
	res.myPromise = query('SELECT * FROM `v_pay1` WHERE `customerName` = ?;',[name])
		.then(results => httpResult.success(results));
	next();
});

module.exports = router;