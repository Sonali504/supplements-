import { Suspense } from "react";
import SearchResults from "@/components/SearchResults";

export default function SearchPage() {
  return (
    <Suspense fallback={<p>Loading search results...</p>}>
      <SearchResults />
    </Suspense>
  );
}
