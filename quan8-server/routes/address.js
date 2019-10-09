var express = require('express');
var query = require('../utils/dbHelper.js');
var httpResult = require('../config');
var router = express.Router();
var Token = require('../utils/token.js');

router.post('/add', function(req,res,next) {
	var name = req.token.account;
	var { receiveName, receiveTel, receiveAddress, receiveAddressDetail } = req.body;
	var sql = 'INSERT `dt_address`(`name`,`receiveName`, `receiveTel`, `receiveAddress`, `receiveAddressDetail`, `isDefault`) VALUES(?,?,?,?,?,0);';
	res.myPromise = query(sql, [ name, receiveName, receiveTel, receiveAddress, receiveAddressDetail])
		.then(results =>{
			return httpResult.success(results.insertId)
		});
	next();
})
// 获取列表
router.post('/list',function(req,res,next) {
	var name = req.token.account;
	res.myPromise = query('SELECT * FROM `dt_address` WHERE `name` = ?;',[name])
		.then(results => httpResult.success(results));
	next();
});


// 删除
router.post('/delete/:id', function(req,res,next) {
	var id = parseInt(req.params.id);
	res.myPromise = query('DELETE FROM `dt_address` WHERE `id` = ?;', [id])
		.then(results => {
			if(results.affectedRows === 1) return httpResult.success();
			else return httpResult.failure(null,'删除失败');
		});
	next();
});

// 默认地址
router.post('/default/:id', function(req,res,next) {
	var id = parseInt(req.params.id);
	var name = req.token.account;
	var sql = 'CALL p_setDefaultAddress(?,?);';
	res.myPromise = query(sql, [id,name])
		.then(results => httpResult.success());
	next();
});


router.post('/update/:id',function(req,res,next) {
	var {receiveName, receiveTel, receiveAddress, receiveAddressDetail} = req.body;
	var id = parseInt(req.params.id);
	var sql = 'UPDATE `dt_address` SET `receiveName` = ?, `receiveTel` = ?, `receiveAddress` = ?, `receiveAddressDetail` = ? WHERE `id` = ?;';
	res.myPromise = query(sql, [receiveName, receiveTel, receiveAddress, receiveAddressDetail, id])
		.then(results => {
			if(results.affectedRows === 1) return httpResult.success();
			else return httpResult.failure(null,'地址修改失败');
		});
	next();
});
module.exports = router;