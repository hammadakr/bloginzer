const { validateToken } = require("../services/authentication");
function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        
        // If no cookie is found, continue without attaching a user.
        if (!tokenCookieValue) {
            return next();
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload; // Attach the validated user payload to the request.
        } catch (error) {
            console.error("Invalid token:", error.message);
            // Optionally, clear the invalid cookie
            res.clearCookie(cookieName);
        }
        
        return next(); // Always call next(), even after clearing the cookie or failing validation.
    };
}

module.exports = {
    checkForAuthenticationCookie
};
