import { body } from 'express-validator';

// если в теле запроса есть соответствующие свойства, то проверяем их
export const postCreateValidation = [
    body('title', 'bad title (min 1, string)').isLength({ min: 1 }).isString(),
    body('text', 'bad text (min 1, string)').isLength({ min: 1 }).isString(),
    body('tags', 'bad tags (need array)').optional().isArray(),
    body('imageUrl', 'bad URL (need string)').optional().isString(),
];
