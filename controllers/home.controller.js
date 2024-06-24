const path = require("path");

const HomeController = (req, res) => {
  try {
    res.status(200).send("This is home route");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = HomeController;
