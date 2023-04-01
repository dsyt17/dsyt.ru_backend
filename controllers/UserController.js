import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';

// функционал по работе с пользователями

export const register = async (req, res) => {
    try {
        // шифруем пароль
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const passHash = await bcrypt.hash(password, salt);

        // готовим документ для монго
        const document = new UserModel({
            login: req.body.login,
            nickname: req.body.nickname,
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: passHash,
        });

        // сохраняем документ
        const user = await document.save();

        // токен по id
        const token = jwt.sign(
            {
                _id: user._id, // поле(я), которое содержит в себе токен
            },
            'dsyt17', // любая стока
            {
                expiresIn: '30d', //время жизни токена
            },
        );

        // вытаскиваем пароль и все остальное, что-бы вернуть все кроме пароля
        const { passwordHash, __v, updatedAt, ...userData } = user._doc;

        // если ошибок нет, то
        res.json({
            success: true,
            ...userData,
            token,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Registration error',
        });
        console.log(error);
    }
};

export const login = async (req, res) => {
    try {
        // находим пользователя по почте или логину
        let user = await UserModel.findOne({ email: req.body.loginOrEmail });
        if (!user) {
            user = await UserModel.findOne({ login: req.body.loginOrEmail });
        }

        // если не нашли
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user don't exist",
            });
        }

        // если нашли, то проверяем пароль
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        // если пароль не верный
        if (!isValidPass) {
            return res.status(400).json({
                success: false,
                message: 'login or password incorrect',
            });
        }

        // токен по id
        const token = jwt.sign(
            {
                _id: user._id, // поле(я), которое содержит в себе токен
            },
            'dsyt17', // любая стока
            {
                expiresIn: '30d', //время жизни токена
            },
        );

        // вытаскиваем пароль и все остальное, что-бы вернуть все кроме пароля
        const { passwordHash, __v, updatedAt, ...userData } = user._doc;

        // если ошибок нет, то
        res.json({
            success: true,
            ...userData,
            token,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Authorization error',
        });
        console.log(error);
    }
};

export const getMe = async (req, res) => {
    try {
        // находим пользователя по id из checkAuth
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'user not found',
            });
        }

        // вытаскиваем пароль и все остальное, что-бы вернуть все кроме пароля
        const { passwordHash, __v, updatedAt, ...userData } = user._doc;

        // если ошибок нет, то
        res.json({
            success: true,
            ...userData,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'no access to /me',
        });
        console.log(error);
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await UserModel.findOne({ nickname: req.params.nickname });

        if (!user) {
            return res.status(404).json({
                message: 'user not found',
            });
        }

        // вытаскиваем пароль и все остальное, что-бы вернуть все кроме пароля
        const { passwordHash, __v, updatedAt, login, email, _id, ...userData } = user._doc;

        // если ошибок нет, то
        res.json({
            success: true,
            ...userData,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'get user error',
        });
        console.log(error);
    }
};
