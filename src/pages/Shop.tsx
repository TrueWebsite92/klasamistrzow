import { useMemo, useState } from "react";
import { ShoppingBag } from "lucide-react";

import { ShopProductCard } from "@/components/shop-product-card";
import { StoreShell } from "@/components/store-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePlatformDemo } from "@/hooks/use-platform-demo";
import type { PlatformProduct } from "@/lib/platform-types";
import { showSuccess } from "@/utils/toast";

const filterOptions: Array<{ label: string; value: PlatformProduct["type"] | "wszystkie" }> = [
  { label: "Wszystkie", value: "wszystkie" },
  { label: "PDF", value: "pdf" },
  { label: "Kursy video", value: "kurs-video" },
  { label: "Warsztaty", value: "warsztat-online" },
  { label: "Konsultacje", value: "konsultacja-indywidualna" },
];

const Shop = () => {
  const { visibleProducts, addToCart, state } = usePlatformDemo();
  const [activeFilter, setActiveFilter] = useState<PlatformProduct["type"] | "wszystkie">("wszystkie");

  const filteredProducts = useMemo(() => {
    if (activeFilter === "wszystkie") {
      return visibleProducts;
    }

    return visibleProducts.filter((product) => product.type === activeFilter);
  }, [activeFilter, visibleProducts]);

  return (
    <StoreShell
      title="Sklep"
      subtitle="Wybierz materiały, kursy i spotkania stworzone tak, aby prowadzić ucznia spokojnie, konkretnie i krok po kroku."
    >
      <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-5 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <Button
                key={option.value}
                variant={activeFilter === option.value ? "default" : "outline"}
                className={
                  activeFilter === option.value
                    ? "rounded-full bg-[#7C6CF6] text-white hover:bg-[#6655EA]"
                    : "rounded-full"
                }
                onClick={() => setActiveFilter(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
          <Badge className="w-fit border-0 bg-[#FFF7DC] px-4 py-2 text-[#1E293B] hover:bg-[#FFF7DC]">
            <ShoppingBag className="mr-2 h-4 w-4" />
            {state.cart.length} produktów w koszyku
          </Badge>
        </div>
      </section>

      <section className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((product) => (
          <ShopProductCard
            key={product.id}
            product={product}
            onAddToCart={(productId) => {
              addToCart(productId);
              showSuccess("Produkt został dodany do koszyka.");
            }}
          />
        ))}
      </section>
    </StoreShell>
  );
};

export default Shop;