import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
  try {
    // получаем посты и популейтом инфу о пользовате
    const posts = await PostModel.find()
      .sort({ createdAt: "desc" })
      .populate("user")
      .exec();
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "failed to get posts",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    // вытаскиваем параметр из запроса
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        // инкрементируем счетчик просмотров
        $inc: { viewsCount: 1 },
      },
      {
        // хотим получить документ после изменений
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "failed to get this post",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "document don't exist",
          });
        }
        res.json(doc);
      }
    ).populate("user");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "failed to get this post",
    });
  }
};

export const remove = async (req, res) => {
  try {
    // вытаскиваем параметр из запроса
    const postId = req.params.id;

    PostModel.findByIdAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "failed to remove this post",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "post don't exist",
          });
        }
        res.json({
          message: "post removed successfully",
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "failed to remove this post",
    });
  }
};

export const create = async (req, res) => {
  try {
    const document = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId, // получаем его из checkAuth
    });

    const post = await document.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "failed to create post",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
        user: req.userId, // получаем его из checkAuth
      }
    );
    res.json({
      success: true,
      message: "post updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "failed to update post",
    });
  }
};
