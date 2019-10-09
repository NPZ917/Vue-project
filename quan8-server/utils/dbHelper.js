//连接数据库，执行指定的sql语句，并得到结果，得到结果调用指定的回调函数
var mysql = require('mysql');

//query返回一个promise对象
var query = (sql, params) => {
    var connection = mysql.createConnection({
        host: 'localhost',
        database: 'quan8',
        user: 'root',
        password: '123'
    });
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, results, fields) => {
            connection.end();
            if (err) {
                console.log(err.message);
                reject(err);
            } else resolve(results);
        });
    });
}

module.exports = query;