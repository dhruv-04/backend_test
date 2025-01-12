const { verifyCredentials } = require('../auth/authUser');

const authLogin = async(req, res) => {
    try {
        const user = {
            username: req.body.username,
            password: req.body.password,
        }
        const token = await verifyCredentials(user);
        if (token) {
            res.status(200).json({ token });
        }
        else {
            res.status(401).json({ message: 'Invalid username or passowrd' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err.message});
    }
};

module.exports = {
    authLogin,
};