const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const authenticateUser = async (userAccount) => {
    console.log(userAccount);
    try {
        const password= userAccount.password;
        console.log(password);
        let user = await userModel.findOne({ email: userAccount.email });
        console.log(user.password);
        if (!user) throw 'Account does not exist !';
        console.log(user);
        var isMatch = password.localeCompare(user.password);
        console.log(isMatch);
        if (isMatch!=0 )
        throw 'Password does not match !';
        let tokenData = {
            id: user._id,
            username: user.email,
        };
        let token = 'Bearer ' + jwt.sign(tokenData,'secret', { expiresIn: 86400 });
        return { err: null, token };
    } catch (err) {
        return { err, msg: 'Internal server error' };
    }
}
module.exports = authenticateUser;