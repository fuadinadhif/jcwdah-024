import { useEffect, useState } from "react";
import { Link } from "react-router";

interface Article {
  objectId: string;
  title: string;
  image: string;
  content: string;
}

function HomePage() {
  const [articles, setArticles] = useState<Article[] | null>(null);

  useEffect(() => {
    async function getArticles() {
      const response = await fetch(
        "https://desiredwinter-us.backendless.app/api/data/articles",
        { method: "GET" },
      );
      const data = await response.json();
      setArticles(data);
    }

    getArticles();
  }, []);

  return (
    <main>
      <h1>Home Page</h1>

      <section style={{ display: "flex", overflowX: "scroll", width: "50vw" }}>
        {articles?.map((item) => (
          <div>
            <img src={item.image} alt="" style={{ height: "200px" }} />
            <h2>{item.title}</h2>
            <Link to={`/article/${item.objectId}`}>Read more</Link>
          </div>
        ))}
      </section>
    </main>
  );
}

export default HomePage;
