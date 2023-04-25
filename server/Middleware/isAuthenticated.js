//This code below accesses a file in the project. (the dot env file).
//Upon accessing it makes sure we use a jwt file and uses webtoken.
//It then encodes the secret of the user

require('dotenv').config()
const jwt = require('jsonwebtoken')
const {SECRET} = process.env

// here the code is exporting code functions that can be applied the app or 'exporting'
module.exports = {
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization')
        //above we created a variable where we took a request and attached a get to it.
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }
        //here were are creating a way to make sure we know if its working correctly

        let token

        try {
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500
            throw err
        }
        //above we set the token to null so we could use jwt and run verify authorization and secret
        if (!token) {
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }
        //Here we show our console that we are not authenticated if it's working improperly.
        next()
    }
}