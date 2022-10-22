import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";

import { checkAuth, handleValidationErrors } from "./utils/index.js";

import { registerValidation, loginValidation } from "./validations/auth.js"; // .js в конце обязателен
import { PostController, UserController } from "./controllers/index.js";
import { postCreateValidation } from "./validations/post.js";
import upload from "./multer/index.js";

// переменные среды
config();

// mongodb
mongoose
  .connect(
    // между / и ? знаками пишем название БД, соответсвующие коллекции создаются автоматически,
    // в зависимости от названий моделей
    process.env.DB_URL
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB error: ", err));

// создаем сервер
const app = express();

// читаем json из запроса
app.use(express.json());
// возващаем статику
app.use("/uploads", express.static("uploads"));
app.use(cors());

// -----ROUTES-----

// передаем валидатор в качестве коллбека и контроллеры
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.get("/auth/me", checkAuth, UserController.getMe);
app.get("/user/:nickname", UserController.getUser);

// ожидаем свойство image, можно любое другое, это не важно
app.post("/uploads", upload.single("image"), (req, res) => {
  res.json({
    success: true,
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);

// запуск сервера
app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server started");
});
