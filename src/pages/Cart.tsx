import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import { StoreShell } from "@/components/store-shell";
import { Button } from "@/components/ui/button";
import { usePlatformDemo } from "@/hooks/use-platform-demo";

const Cart = () => {
  const { cartItemsDetailed, cartTotal, removeFromCart, updateCartQuantity } = usePlatformDemo();

  return (
    <StoreShell
      title="Koszyk"
      subtitle="Tutaj możesz spokojnie sprawdzić wybrane produkty, zmienić ilość i przejść do zamówienia."
    >
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
          <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em] text-[#1E293B]">
            Lista produktów
          </h2>
          <div className="mt-5 grid gap-4">
            {cartItemsDetailed.length > 0 ? (
              cartItemsDetailed.map((item) => (
                <div key={item.productId} className="rounded-[1.3rem] bg-[#FAF7F2] p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.image?.dataUrl ?? "/placeholder.svg"}
                        alt={item.product.title}
                        className="h-20 w-20 rounded-2xl object-cover"
                      />
                      <div>
                        <p className="font-semibold text-[#1E293B]">{item.product.title}</p>
                        <p className="mt-1 text-sm text-[#526174]">{item.product.shortDescription}</p>
                        <p className="mt-2 text-sm font-bold text-[#1E293B]">{item.product.price} zł</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                        onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="min-w-10 text-center font-semibold text-[#1E293B]">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                        onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                        onClick={() => removeFromCart(item.productId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-[1.3rem] bg-[#FAF7F2] p-6 text-sm text-[#526174]">
                Koszyk jest jeszcze pusty.
              </div>
            )}
          </div>
        </section>

        <aside className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
          <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em] text-[#1E293B]">
            Podsumowanie
          </h2>
          <div className="mt-5 rounded-[1.4rem] bg-[#FAF7F2] p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#526174]">Suma</span>
              <span className="font-serif text-3xl font-semibold tracking-[-0.05em] text-[#1E293B]">
                {cartTotal} zł
              </span>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-3">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/sklep">Kontynuuj zakupy</Link>
            </Button>
            <Button
              asChild
              className="rounded-full bg-[#7C6CF6] text-white hover:bg-[#6655EA]"
              disabled={cartItemsDetailed.length === 0}
            >
              <Link to="/zamowienie">Przejdź do zamówienia</Link>
            </Button>
          </div>
        </aside>
      </div>
    </StoreShell>
  );
};

export default Cart;