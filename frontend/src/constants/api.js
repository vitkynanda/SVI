export const postArticle = async (data) => {
  const response = await fetch("http://localhost:8080/article", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateArticleById = async (data) => {
  const { id } = data;
  const response = await fetch(`http://localhost:8080/article/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getArticleById = async (id) => {
  const response = await fetch(`http://localhost:8080/article/${id}`, {
    method: "GET",
  });
  return response.json();
};

export const getAllArticle = async (params) => {
  const response = await fetch(`http://localhost:8080/articles`, {
    method: "GET",
  });
  return response.json();
};
export const getArticleByPage = async (params) => {
  const { page, limit } = params;
  const response = await fetch(
    `http://localhost:8080/articles/${page}/${limit}`,
    {
      method: "GET",
    }
  );
  return response.json();
};

export const deleteArticleById = async (id) => {
  const response = await fetch(`http://localhost:8080/article/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};
