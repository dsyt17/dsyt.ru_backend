// проверяем пользователя по токену

import { json } from "express";
import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      // расшифровываем токен
      const decoded = jwt.verify(token, "dsyt17");
      // вытаскиваем из токена id пользователя
      req.userId = decoded._id;
      // выполняем get запрос дальше
      next();
    } catch (error) {
      return res.status(403).json({
        message: "no access",
      });
    }
  } else {
    return res.status(403).json({
      message: "no access",
    });
  }
};
