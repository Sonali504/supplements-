"use client";
import { useEffect, useState } from "react";

export default function Reviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    user: "",
    rating: "",
    comment: "",
  });

  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  // Fetch only reviews for the specific product
  useEffect(() => {
    setLoading(true);
    fetch(`/api/reviews`)
      .then((res) => res.json())
      .then((data) => {
        const filteredReviews = data.filter((review) => review.productId === productId);
        setReviews(filteredReviews);
      })
      .catch((error) => console.error("Error fetching reviews:", error))
      .finally(() => setLoading(false));
  }, [productId]);

  // Handle adding a new review
  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      productId: productId,
      user: newReview.user,
      rating: parseFloat(newReview.rating),
      comment: newReview.comment,
    };

    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    });

    const result = await response.json();

    if (response.ok) {
      setReviews([result, ...reviews]); // Add new review at the top
      setNewReview({ user: "", rating: "", comment: "" });

      // Show success message
      setSuccessMessage("Review submitted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } else {
      console.error(result.message);
    }
  };

  // Handle deleting a review
  const handleDelete = async (id) => {
    const response = await fetch("/api/reviews", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      setReviews(reviews.filter((review) => review.id !== id));
    }
  };

  // Pagination Logic
  const lastReviewIndex = currentPage * reviewsPerPage;
  const firstReviewIndex = lastReviewIndex - reviewsPerPage;
  const currentReviews = reviews.slice(firstReviewIndex, lastReviewIndex);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold border-b pb-2 mb-4">Customer Reviews</h2>

      {/* Flex Container for Left (Form) & Right (Reviews) */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Review Form */}
        <div className="md:w-1/2 bg-gray-100 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Leave a Review</h3>

          {successMessage && (
            <p className="text-green-600 font-semibold mb-2">{successMessage}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              value={newReview.user}
              onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
              className="border p-2 w-full rounded-md"
              required
            />

            <input
              type="number"
              step="0.1"
              min="0.5"
              max="5"
              placeholder="Rating (0.5 - 5)"
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
              className="border p-2 w-full rounded-md"
              required
            />

            <textarea
              placeholder="Your review"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              className="border p-2 w-full rounded-md"
              required
            />

            <button
              type="submit"
              className="bg-yellow-600 text-white px-4 py-2 w-full rounded-md hover:bg-yellow-700"
            >
              Submit Review
            </button>
          </form>
        </div>

        {/* Right: Reviews List */}
        <div className="md:w-1/2 space-y-4">
          {loading ? (
            <p className="text-gray-500 text-center">Loading reviews...</p>
          ) : reviews.length > 0 ? (
            <>
              {currentReviews.map((review) => (
                <div key={review.id} className="p-4 border rounded-lg bg-gray-50 flex justify-between items-center">
                  {/* Left: User & Review Info */}
                  <div className="flex flex-col">
                    <strong className="text-lg">{review.user}</strong>
                    <span className="text-yellow-500 text-lg">{review.rating.toFixed(1)} ⭐</span>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>

                  {/* Right: Delete Button */}
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <span className="font-semibold">{currentPage} / {totalPages}</span>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-500">No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>
    </div>
  );
}
