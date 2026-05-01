
// short hand reusable method
const sendToken = (user, statusCode, res) => {

    // creating JWT Token
    const token = user.getJwtToken();

    // passsing the JWT token through cookies
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000 // caluclating to 7 days 
        ),
        httpOnly: true, // we can use only in http request
    }

    res.status(statusCode)
    .cookie('token', token, options)  // sharing cookie method 'token' key, token, value, 3rd argument options when it expires
    .json({   // chain method . method
        success: true,
        token,
        user
    })
}

module.exports = sendToken