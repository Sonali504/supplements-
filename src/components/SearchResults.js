"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      fetch(`/api/search?q=${query}`)
        .then((res) => res.json())
        .then((data) => setResults(data.results));
    }
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Search Results for "{query}"</h1>
      {results.length > 0 ? (
        <ul className="mt-4">
          {results.map((item, index) => (
            <li key={index} className="border p-2 rounded-md">
              {item.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-gray-600">No results found.</p>
      )}
    </div>
  );
}
