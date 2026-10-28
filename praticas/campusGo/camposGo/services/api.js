export async function apiGet(path) {
  const url = `${process.env.EXPO_PUBLIC_API_URL}${path}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Falha na requisição (${response.status})`);
  }
  return response.json();
}