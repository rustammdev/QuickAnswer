import "dotenv/config";

const AuthMiddlware = (req, res, next) => {
  try {
    const cookies = req.cookies;

    if (!cookies || !cookies.token) {
      return res.status(401).redirect("/");
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Toekn mavjud emas" });
  }
};

export { AuthMiddlware };
