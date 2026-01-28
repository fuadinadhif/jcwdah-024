import type { Article } from "../types/article.js";
import { ApiError } from "../utils/api-error.js";
import { getData } from "../utils/data.js";

export const getArticlesService = () => {
  const result = JSON.parse(getData());
  return result.articles;
};

export const getArticleService = (id: number) => {
  // 1. cari data article berdasarkan id
  const result = JSON.parse(getData());
  const article = result.articles.find((article: Article) => {
    return article.id === id;
  });

  // 2. kalo ga ketemu, kirim response not found
  if (!article) {
    throw new ApiError("Article not found", 404);
  }

  // 3. return datanya
  return article;
};
