const User = require('../models/userModel');
const CryptoJS = require('crypto-js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


function encryptData(valueToEncrypt){
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(valueToEncrypt),
     process.env.HASHKEY,
      {iv: CryptoJS.enc.Utf8.parse(process.env.FIXED_IV),
        salt: CryptoJS.enc.Utf8.parse(process.env.FIXED_SALT),
      }
    ).toString();
    return ciphertext;
}

exports.register = async (req, res) => {
    try{
        let encryptedEmail = encryptData(req.body.email);
        console.log('encrypt ',encryptedEmail);

        let userData = await User.findOne({email : encryptedEmail});
        console.log('saasassaas ' ,userData)
        if(userData){
            return res.status(400).send({ msg : 'user already registered'})
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            name: req.body.name,
            email: encryptedEmail,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(201).json({ msg: 'user registration successful' });

    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}

exports.login = async(req, res) => {
    try {
        const encryptedEmail = encryptData(req.body.email);
        let userData = await User.findOne({email: encryptedEmail});

        if(!userData){
            return res.status(404).send({msg : 'user not registered'})
        }
        const {email, password} = req.body;
        const validPwd = await bcrypt.compare(password, userData.password);
    
        if(!validPwd){
            return res.status(401).send({msg : 'password invalid'})
        }
        console.log('user data ',userData)

        const token = jwt.sign({ userId: userData._id }, process.env.SECRET_KEY, { algorithm: 'HS256', expiresIn: '2h' });

        return res.json({ token });
    }
    catch(err){
        return res.status(500).json({ msg: err.message });
    }
}

exports.hasAccess = async (req, res, next) => {
    const userAgent = req.get('User-Agent');
    const authToken = req.header('Authorization');

    if (userAgent == 'PostmanRuntime/7.35.0' && authToken) {
        jwt.verify(authToken, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ msg: 'Invalid JWT' });
            } else {
                req.userId = decoded.userId;
                next();
            }
        });
    } else {
        return res.status(403).json({ msg: 'Forbidden' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        //console.log(user.name);

        const name  = user.name;
        return res.json({ name });
    } catch (err) {
            return res.status(500).json({ msg: err.message });
    }
};

