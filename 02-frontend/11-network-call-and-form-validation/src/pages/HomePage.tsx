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
    <main className="p-8">
      <h1 className="text-center text-3xl mb-4">Home Page</h1>

      <section className="flex flex-col gap-8 items-center m-auto  w-[70vw] sm:flex-row sm:overflow-x-scroll">
        {articles?.map((item) => (
          <div className="min-w-[400px]">
            <img src={item.image} alt="" />
            <h2 className="text-xl">{item.title}</h2>
            <Link to={`/article/${item.objectId}`}>Read more</Link>
          </div>
        ))}
      </section>
    </main>
  );
}

export default HomePage;
