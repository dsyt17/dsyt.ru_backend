import { body } from "express-validator";

// если в теле запроса есть соответствующие свойства, то проверяем их
export const registerValidation = [
  body("email", "Email incorrect").isEmail(),
  body("login", "Login incorrect").isString().isLength({ min: 5 }),
  body("nickname", "Nickname incorrect").isString().isLength({ min: 3 }),
  body("password", "Bad password").isLength({ min: 5 }),
  body("fullName", "Full name min length 3 letters").isLength({ min: 3 }),
  body("avatarUrl", "not a URL").optional().isURL(),
];

export const loginValidation = [
  body("email", "Email incorrect").isEmail().optional(),
  body("login", "Login incorrect").isString().isLength({ min: 5 }).optional(),
  body("password", "Bad password").isLength({ min: 5 }),
];
