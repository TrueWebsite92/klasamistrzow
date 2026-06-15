import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

import { StoreShell } from "@/components/store-shell";
import { Button } from "@/components/ui/button";
import { usePlatformDemo } from "@/hooks/use-platform-demo";

const OrderConfirmation = () => {
  const { lastOrder, state } = usePlatformDemo();

  const purchasedProducts =
    lastOrder?.items
      .map((item) => state.products.find((product) => product.id === item.productId))
      .filter(Boolean) ?? [];

  return (
    <StoreShell
      title="Potwierdzenie zamówienia"
      subtitle="Zamówienie zostało przyjęte, a zakupione produkty zostały automatycznie dodane do strefy ucznia."
    >
      <section className="rounded-[2rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl sm:p-8">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#E8F7EF] text-[#24553A]">
            <CheckCircle2 className="h-6 w-6" />
          </span>
          <div>
            <h2 className="font-serif text-3xl font-semibold tracking-[-0.04em] text-[#1E293B]">
              Zamówienie przyjęte
            </h2>
            <p className="mt-1 text-sm text-[#526174]">
              Produkty są już gotowe do użycia na Twoim koncie.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          {purchasedProducts.map((product) => (
            <div key={product?.id} className="rounded-[1.2rem] bg-[#FAF7F2] p-4">
              <p className="font-semibold text-[#1E293B]">{product?.title}</p>
              <p className="mt-1 text-sm text-[#526174]">{product?.shortDescription}</p>
            </div>
          ))}
        </div>

        <Button asChild className="mt-6 rounded-full bg-[#7C6CF6] text-white hover:bg-[#6655EA]">
          <Link to="/uczen">Przejdź do strefy ucznia</Link>
        </Button>
      </section>
    </StoreShell>
  );
};

export default OrderConfirmation;