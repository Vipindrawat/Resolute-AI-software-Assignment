import User from '../Models/UserModel.js';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import express from 'express';
const router = express.Router();

// user signup Route:
router.post('/signup', [
    body('name', "name should have atleast 3 charaters").isLength({ min: 3 }),
    body('email', "email should be a valid email").isEmail(),
    body('password', "password should have atleast 5 characters").isLength({ min: 5 })
], async (req, res) => {
    try {
        const result = validationResult(req);
        if (result.isEmpty()) {

            const findEmail = await User.findOne({ "email": req.body.email });
            if (findEmail) {
                res.status(400).json({ "success": false, "error": "email already exists" });
            }
            else {
                const { name, email, password } = req.body;
                const pepperPassword = password + process.env.MYPEPPER;
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(pepperPassword, salt);
                const insertedUser = await User.create({ name, email, password: hashedPassword });

                // creating json web token:
                const token = jwt.sign({ id: insertedUser.id }, process.env.SIGNATURE);
                res.json({ "success": true, token });
            }

        }
        else {
            res.json({ "success": false, "error": result.array() });
        }

    }
    catch (error) {
        res.status(500).json({ "success": false, "error": error });
    }
})


// User Signin Route:
router.post('/signin', [
    body('email', "email should be a valid email").isEmail(),
    body('password', "Invalid credential")
], async (req, res) => {
    try {
        const result = validationResult(req);
        if (result.isEmpty()) {
            const { email, password } = req.body;
            const findEmail = await User.findOne({ email });
            if (!findEmail) {
                return res.json({ "success": false, "error": "Invalid Credentials" });
            }
            const pepperPassword = password + process.env.MYPEPPER;
            let passwordCheck = await bcrypt.compare(pepperPassword, findEmail.password);
            if (!passwordCheck) {
                return res.json({ "success": false, "error": "Invalid Credentials" });
            }
            const token = jwt.sign({ id: findEmail.id }, process.env.SIGNATURE);
            res.json({ "success": true, token });

        }
        else {
            res.json({ "success": false, "error": result.array() });
        }
    }
    catch (error) {
        res.status(500).json({ "success": false, error: error })
    }

})

export default router;