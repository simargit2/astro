export async function getStocks(searchQuery = "") {
    try {
        let url = `https://newspaper-dashboard.whalesbook1.shop/get-stocks?page=1&limit=5`;

        if (searchQuery?.trim()) {
            url += `&queryString=${searchQuery}`;
        }

        const res = await fetch(url);
        const json = await res.json();

        return json?.data || [];
    } catch (err) {
        console.error("getStocks error:", err);
        return [];
    }
}