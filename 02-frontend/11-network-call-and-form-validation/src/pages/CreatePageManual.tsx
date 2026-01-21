import React, { useState } from "react";

function CreatePageManual() {
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  // const [image, setImage] = useState("");
  const [articleData, setArticleData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setIsLoading(true);

    const response = await fetch(
      "https://desiredwinter-us.backendless.app/api/data/articles",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(articleData),
      },
    );

    if (response.ok) {
      alert("New article created!");
      setIsLoading(false);
    } else {
      alert("Failed to create new article");
      setIsLoading(false);
    }

    setArticleData({ title: "", content: "", image: "" });
  }

  return (
    <main>
      <h1>Create New Article</h1>
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
          required
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
          required
        ></textarea>

        <label htmlFor="image">Image</label>
        <input
          type="text"
          placeholder="https://image.com"
          value={articleData.image}
          onChange={(event) =>
            setArticleData({ ...articleData, image: event.target.value })
          }
          required
        />

        <button type="submit" disabled={isLoading}>
          Create Article
        </button>
      </form>
    </main>
  );
}

export default CreatePageManual;
