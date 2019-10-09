'use strict';
var express = require('express');
var query = require('../utils/dbHelper.js');
var httpResult = require('../config');

var router = express.Router();


router.post('/list', function (req, res, next) {
    var {
        cid,
        start,
        count,
        orderCol,
        orderDir
    } = req.body;
    var sql =
        'SELECT * FROM `dt_product` WHERE `cid` = ? ORDER BY ' +
        `${ orderCol } ${ orderDir }` +
        ' LIMIT ?,?;';
    var params = [parseInt(cid), parseInt(start), parseInt(count)];
    res.myPromise = query(sql, params).then(httpResult.success);
    next();
});

router.get('/model/:id', function (req, res, next) {
    var id = parseInt(req.params.id);
    var sql = 'SELECT * FROM `dt_product` WHERE `id` = ?;';
    res.myPromise = query(sql, [id]).then(results => httpResult.success(results[0]));
    next();
});

module.exports = router;