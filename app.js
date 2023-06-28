const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const postsRoutes = require("./api/posts/posts.routes");
const connectDb = require("./database");
const notFound = require("./middlewares/notFound");
const errorhandler = require("./middlewares/errorHandler");

connectDb();

app.use("/media", express.static(path.join(__dirname, "media")));
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/posts", postsRoutes);
app.use(notFound);
app.use(errorhandler);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message || "Internal Server Error" });
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
