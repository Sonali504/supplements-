"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      fetch(`/api/products?q=${query}`)
        .then((res) => res.json())
        .then((data) => setResults(data));
    }
  }, [query]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Search Results for "{query}"</h1>
      {results.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {results.map((product) => (
            <li key={product.id} className="border p-4 rounded-lg shadow-lg">
              <Link href={`/product/${product.id}`} className="text-blue-500 font-semibold text-lg">
                {product.name}
              </Link>
              <p className="text-gray-700">Price: ₹{product.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchPage;
