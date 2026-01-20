import { useParams } from "react-router";
import { useEffect, useState } from "react";

interface Article {
  objectId: string;
  title: string;
  image: string;
  content: string;
}

function DetailPage() {
  const [article, setArticle] = useState<Article | null>(null);
  const params = useParams();
  const objectId = params.objectId;

  useEffect(() => {
    async function getArticle() {
      const response = await fetch(
        `https://desiredwinter-us.backendless.app/api/data/articles/${objectId}`,
        { method: "GET" },
      );
      const data = await response.json();
      setArticle(data);
    }

    getArticle();
  }, []);

  return (
    <main>
      <img src={article?.image} alt="" />
      <h1>{article?.title}</h1>
      <p>{article?.content}</p>
    </main>
  );
}

export default DetailPage;
