import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { StoreShell } from "@/components/store-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePlatformDemo } from "@/hooks/use-platform-demo";
import { showSuccess } from "@/utils/toast";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItemsDetailed, cartTotal, createOrder, currentUser } = usePlatformDemo();

  const [form, setForm] = useState({
    firstName: currentUser?.name.split(" ")[0] ?? "",
    lastName: currentUser?.name.split(" ").slice(1).join(" ") ?? "",
    email: currentUser?.email ?? "",
  });

  return (
    <StoreShell
      title="Zamówienie"
      subtitle="Uzupełnij dane i przejdź dalej — płatność jest na razie symulowana, ale zakup od razu odblokuje produkt na koncie ucznia."
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
        <section className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
          <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em] text-[#1E293B]">
            Dane zamówienia
          </h2>
          <div className="mt-5 grid gap-4">
            <Input
              placeholder="Imię"
              value={form.firstName}
              onChange={(event) => setForm((previous) => ({ ...previous, firstName: event.target.value }))}
            />
            <Input
              placeholder="Nazwisko"
              value={form.lastName}
              onChange={(event) => setForm((previous) => ({ ...previous, lastName: event.target.value }))}
            />
            <Input
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(event) => setForm((previous) => ({ ...previous, email: event.target.value }))}
            />
          </div>
        </section>

        <aside className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
          <h2 className="font-serif text-2xl font-semibold tracking-[-0.04em] text-[#1E293B]">
            Podsumowanie zamówienia
          </h2>
          <div className="mt-5 grid gap-3">
            {cartItemsDetailed.map((item) => (
              <div key={item.productId} className="rounded-[1.2rem] bg-[#FAF7F2] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-[#1E293B]">{item.product.title}</p>
                  <p className="text-sm font-bold text-[#1E293B]">
                    {item.quantity} × {item.product.price} zł
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-[1.2rem] bg-[#FFF7DC] p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#1E293B]">Łącznie</span>
              <span className="font-serif text-3xl font-semibold tracking-[-0.05em] text-[#1E293B]">
                {cartTotal} zł
              </span>
            </div>
          </div>
          <Button
            className="mt-5 w-full rounded-full bg-[#7C6CF6] text-white hover:bg-[#6655EA]"
            disabled={cartItemsDetailed.length === 0}
            onClick={() => {
              const order = createOrder(form);
              if (!order) return;
              showSuccess("Zamówienie zostało przyjęte.");
              navigate("/zamowienie/potwierdzenie");
            }}
          >
            Przejdź do płatności
          </Button>
        </aside>
      </div>
    </StoreShell>
  );
};

export default Checkout;