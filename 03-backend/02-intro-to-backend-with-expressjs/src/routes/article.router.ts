import express from "express";
import {
  getArticleController,
  getArticlesController,
} from "../controllers/article.controller.js";

const articleRouter = express.Router();

articleRouter.get("/", getArticlesController);
articleRouter.get("/:id", getArticleController);

export { articleRouter };
