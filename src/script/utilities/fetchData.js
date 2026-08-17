/**
 * Fetches all deals from the API endpoint
 *
 *
 * @returns {Array} deals - An array of all deals fetched from the API endpoint
 */
async function fetchData() {
    const url =
        'https://gist.githubusercontent.com/ameer-wajid-ali/1f29ebee4295cede36f8d74b45e576df/raw/122966c9a123861249f173911d8d93a76dc06d7a/';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return response.json();
    } catch {
        return [];
    }
}

const deals = await fetchData();

export { deals };
