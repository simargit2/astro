import { useEffect, useState } from "react";

export default function StocksPage({ initialData }) {
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");
  const [stocks, setStocks] = useState(initialData);
  const [loading, setLoading] = useState(false);

  // Debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchStocks(query);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  async function fetchStocks(q) {
    setLoading(true);
    const data = await (await fetch(`/api/get-stocks?q=${q}`)).json();
    setStocks(data);
    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto">

      {/* Search */}
      <input
        className="w-full bg-neutral-900 border border-neutral-700 px-4 py-3 rounded-lg text-white focus:outline-none"
        placeholder="Search stocks..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Tabs */}
      <div className="flex mt-4 bg-neutral-900 rounded-lg overflow-hidden">
        <button
          className={`flex-1 py-3 text-center ${
            tab === "all" ? "bg-neutral-800 text-white" : "text-gray-400"
          }`}
          onClick={() => setTab("all")}
        >
          All
        </button>

        <button
          className={`flex-1 py-3 text-center ${
            tab === "watchlist"
              ? "bg-neutral-800 text-white"
              : "text-gray-400"
          }`}
          onClick={() => setTab("watchlist")}
        >
          Watchlist
        </button>
      </div>

      {/* Watchlist */}
      {tab === "watchlist" && (
        <div className="mt-6 text-center">
          <p className="text-gray-400">Signup to add to watchlist</p>
        </div>
      )}

      {/* List */}
      {tab === "all" && (
        <div className="mt-6 space-y-3 max-h-[420px] overflow-y-auto">
          {loading && <p className="text-gray-300">Searching...</p>}

          {!loading && stocks.length === 0 && (
            <p className="text-gray-400">No stocks found.</p>
          )}

          {!loading &&
            stocks.map((s) => (
              <div
                key={s.id}
                className="bg-neutral-900 hover:bg-neutral-800 transition rounded-lg px-4 py-3 flex justify-between items-center"
              >
                <div>
                  <p className="text-white font-medium">{s.securityName}</p>
                  <p className="text-gray-500 text-sm">
                    BSE Code: {s.bseCode}
                  </p>
                </div>

                <button className="px-3 py-1 text-xs border border-green-500 text-green-400 rounded-lg">
                  Add to Watchlist
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}