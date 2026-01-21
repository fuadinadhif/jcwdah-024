export async function getArticleData(objectId: string) {
  const response = await fetch(
    `https://desiredwinter-us.backendless.app/api/data/articles/${objectId}`,
    { method: "GET" },
  );
  const data = await response.json();
  return data;
}

export async function a() {}

export async function b() {}
