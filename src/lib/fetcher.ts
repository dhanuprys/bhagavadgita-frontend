import axios from 'axios';

export default function fetcher<T>(url: string) {
    return axios.get<T>(url).then((response) => response.data);
}
