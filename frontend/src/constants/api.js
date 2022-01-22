export const postArticle = async (data) => {
  const response = await fetch("http://localhost:11000/article", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateArticleById = async (data) => {
  const { id } = data;
  const response = await fetch(`http://localhost:11000/article/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getArticleById = async (id) => {
  const response = await fetch(`http://localhost:11000/article/${id}`, {
    method: "GET",
  });
  return response.json();
};

export const getAllArticle = async (params) => {
  const { limit, offset } = params;
  const response = await fetch(
    `http://localhost:11000/article/${limit}/${offset}`,
    {
      method: "GET",
    }
  );
  return response.json();
};

export const deleteArticleById = async (id) => {
  const response = await fetch(`http://localhost:11000/article/${id}/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};
