const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        
        //check header or null parameters or post parameters for token
        let token = req.headers['x-access-token'] || req.headers['authorization']; 
        
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        //decode token
        if(token){
            // verifies secret and check exp
            jwt.verify(token, process.env.JWT_KEY, function(err, decoded){
                if(err){
                    return res.status(401).json({
                        success : false,
                        message : "Failed to authenticate token."
                    });
                } else {
                    // if everything is good, save to request
                    req.decoded = decoded;
                    next();// go to the next routes and dont shtop here
                }
            });
        } else {
            // there is nos token
            // return an HTTP response of 403 (access forbiden) and an err message
            return res.status(403).json({
                success : false,
                message : "No token provied."
            });
        }
        
        
    } catch (error) {
        return res.status(401).json({
            message : "Auth failed"
        });
    }
     
};