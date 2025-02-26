import { Suspense } from "react";
import OrderConfirmation from "@/components/OrderConfirmation";

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<p>Loading order details...</p>}>
      <OrderConfirmation />
    </Suspense>
  );
}
