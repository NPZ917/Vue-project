var httpResult = {
    // 成功
    success: (data = null, message = '') => ({
        status: 200,
        data,
        message
    }),
    // 物理错误
    error: message => ({
        status: 500,
        data: null,
        message
    }),
    // 逻辑错误
    failure: (data = null, message = '') => ({
        status: 199,
        data,
        message
    }),
	// token验证失败
	untoken:() => ({ status: 401, data: null, message: '' })
};

module.exports = httpResult;