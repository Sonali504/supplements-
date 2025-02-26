let reviews = [
  { id: 1, productId: 1, user: "Alice", rating: 5, comment: "Great product!" },
  { id: 2, productId: 2, user: "Bob", rating: 4, comment: "Nice phone!" },
  { id: 3, productId: 1, user: "Charlie", rating: 3, comment: "Good, but could be better." },
];

export async function GET(req) {
  return Response.json(reviews);
}

export async function POST(req) {
  const newReview = await req.json();
  newReview.id = reviews.length + 1; // Assign a unique ID
  reviews.push(newReview);
  return Response.json(newReview, { status: 201 });
}

export async function DELETE(req) {
  const { id } = await req.json();
  reviews = reviews.filter((review) => review.id !== id);
  return Response.json({ message: "Review deleted successfully" });
}
