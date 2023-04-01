import mongoose from 'mongoose';

// Схема пользователя
// объект - обязателен для заполнения, простое поле - нет

const UserSchema = new mongoose.Schema(
    {
        login: {
            type: String,
            required: true,
            unique: true,
        },
        nickname: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        avatarUrl: String, // не обязательно к заполнению
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('User', UserSchema);
