import mongoose from 'mongoose';

// Схема пользователя
// объект - обязателен для заполнения, простое поле - нет

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        text: {
            type: String,
            required: true,
        },
        tags: {
            type: Array,
            default: [],
        },
        viewsCount: {
            type: Number,
            default: 0,
        },
        // подключаем пользователя
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        imageUrl: String, // не обязательно к заполнению
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Post', PostSchema);
