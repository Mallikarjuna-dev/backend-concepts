
const fs = require('fs');

const loggerMiddleware = (req, res, next) => {
    const reqData = `Method: ${req.method} | EndPoint: ${req.url}\n`;
    fs.appendFileSync('./logs.txt', reqData);
    next()
};

module.exports = loggerMiddleware;