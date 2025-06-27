import axios from 'axios';

export default async function fetcher<T>(url: string) {
    return await axios
        .get<T>(url, { baseURL: import.meta.env.VITE_API_BASE_URL })
        .then((response) => response.data);
}
