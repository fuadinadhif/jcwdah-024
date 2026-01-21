import { useParams, Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
// import { type Article } from "../types/article.type";

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

  const navigate = useNavigate();

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

  async function handleDelete() {
    const response = await fetch(
      `https://desiredwinter-us.backendless.app/api/data/articles/${objectId}`,
      { method: "DELETE" },
    );

    if (response.ok) {
      alert("Article deleted!");
      navigate("/");
    } else {
      alert("Failed to delete article");
    }
  }

  return (
    <main>
      <div>
        <Link to={`/update/${objectId}`}>Update</Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <img src={article?.image} alt="" style={{ width: "100%" }} />
      <h1>{article?.title}</h1>
      <p>{article?.content}</p>
    </main>
  );
}

export default DetailPage;
