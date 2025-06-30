import useSWRImmutable from 'swr/immutable';
import fetcher from '../lib/fetcher';

export function getSuggestions() {
    const response = useSWRImmutable(
        `/suggestions`,
        async (url) =>
            (await fetcher<{ suggestions: string[] }>(url)).suggestions
    );

    return response;
}
