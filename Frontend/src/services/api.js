
const API_URL = 'http://localhost:5000';

export const getChildren = async (user, isAdmin = false) => {
  const url = isAdmin ? `${API_URL}/children` : `${API_URL}/children?parentId=${user.id}`;
  const res = await fetch(url);
  return res.json();
};

export const addChild = async (child) => {
  await fetch(`${API_URL}/children`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(child),
  });
};

export const deleteChild = async (id) => {
  await fetch(`${API_URL}/children/${id}`, { method: 'DELETE' });
};
