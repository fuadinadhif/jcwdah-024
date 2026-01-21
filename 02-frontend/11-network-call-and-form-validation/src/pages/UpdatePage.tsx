import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

// import { getArticleData, a, b } from "../utils/article.util";

function UpdatePage() {
  const [articleData, setArticleData] = useState({
    title: "",
    content: "",
    image: "",
  });

  const params = useParams();
  const objectId = params.objectId;

  const navigate = useNavigate();

  useEffect(() => {
    async function getArticleData() {
      const response = await fetch(
        `https://desiredwinter-us.backendless.app/api/data/articles/${objectId}`,
        { method: "GET" },
      );
      const data = await response.json();

      setArticleData({
        title: data.title,
        content: data.content,
        image: data.image,
      });
    }

    getArticleData();

    // async function getData() {
    //   const data = await getArticleData(objectId!);
    // setArticleData({
    //   title: data.title,
    //   content: data.content,
    //   image: data.image,
    // });
    // }
    // getData();
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const response = await fetch(
      `https://desiredwinter-us.backendless.app/api/data/articles/${objectId}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(articleData),
      },
    );

    if (response.ok) {
      alert("Article updated!");
      navigate(`/article/${objectId}`);
    } else {
      alert("Failed to update article");
    }

    setArticleData({ title: "", content: "", image: "" });
  }

  return (
    <main>
      <h1>Update Article</h1>
      <form style={{ display: "grid" }} onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Input the title here..."
          value={articleData.title}
          onChange={(event) =>
            setArticleData({ ...articleData, title: event.target.value })
          }
        />

        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          placeholder="Input the content here..."
          rows={10}
          value={articleData.content}
          onChange={(event) =>
            setArticleData({ ...articleData, content: event.target.value })
          }
        ></textarea>

        <label htmlFor="image">Image</label>
        <input
          type="text"
          placeholder="https://image.com"
          value={articleData.image}
          onChange={(event) =>
            setArticleData({ ...articleData, image: event.target.value })
          }
        />

        <button type="submit">Update Article</button>
      </form>
    </main>
  );
}

export default UpdatePage;
