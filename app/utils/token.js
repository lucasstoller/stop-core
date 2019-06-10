
const jwt = require('jsonwebtoken');

class Token {
    static generateToken(data) {
        return new Promise((resolve, reject) => {
            jwt.sign(data, process.env.JWT_SECRET_USER, (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            });
        });
    }

    static validToken(token) {
        return new Promise((resolve, reject) => {
            if (token) {
                jwt.verify(token, process.env.JWT_SECRET_USER, (err, decoded) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(decoded);
                    }
                });
            }
            const error = {
                message: 'invalid token',
            };
            return reject(error);
        });
    }
}

module.exports = Token;
