const res = require("express/lib/response");

const sendToken = (client, statusCode, res) => {
    const token = client.getJWTToken();
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true

    };
    // console.log(Date.now())
    res.status(statusCode).cookie("token", token, options).json({
        client,
    });
};
module.exports = sendToken;