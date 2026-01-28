import type { Request, Response } from "express";
import {
  getArticleService,
  getArticlesService,
} from "../services/article.service.js";

export const getArticlesController = (req: Request, res: Response) => {
  const result = getArticlesService();
  res.status(200).send(result);
};

export const getArticleController = (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string);
  const result = getArticleService(id);
  res.status(200).send(result);
};
