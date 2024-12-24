const JWT = require('jsonwebtoken');

const secret = '$uperman@123#';

function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role
    };

    // Add token expiration time
    const token = JWT.sign(payload, secret, { expiresIn: '1h' }); // 1-hour expiration
    return token;
}

function validateToken(token) {
    try {
        const payload = JWT.verify(token, secret);
        return payload;
    } catch (error) {
        console.error('Token expired:', error.message);
        throw error; // Rethrow error to handle in the middleware
    }
}

module.exports = {
    createTokenForUser,
    validateToken
};
