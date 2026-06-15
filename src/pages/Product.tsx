import { Check, ShoppingBag } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { StoreShell } from "@/components/store-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePlatformDemo } from "@/hooks/use-platform-demo";
import { showSuccess } from "@/utils/toast";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, addToCart } = usePlatformDemo();

  const product = state.products.find((item) => item.id === id);

  if (!product) {
    return (
      <StoreShell
        title="Produkt"
        subtitle="Nie udało się odnaleźć wybranego produktu."
      >
        <div className="rounded-[1.8rem] border border-white/75 bg-white/72 p-8 text-center shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
          <Button asChild className="rounded-full bg-[#7C6CF6] text-white hover:bg-[#6655EA]">
            <Link to="/sklep">Wróć do sklepu</Link>
          </Button>
        </div>
      </StoreShell>
    );
  }

  return (
    <StoreShell
      title={product.title}
      subtitle="Szczegóły produktu przygotowanego tak, aby nauka była spokojna, uporządkowana i naprawdę użyteczna."
    >
      <section className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
        <div className="overflow-hidden rounded-[2rem] border border-white/75 bg-white/72 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
          <div className="aspect-[4/3] bg-[#F3EDE4]">
            <img
              src={product.image?.dataUrl ?? "/placeholder.svg"}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl sm:p-8">
          <Badge className="border-0 bg-[#EAF2FF] text-[#7C6CF6] hover:bg-[#EAF2FF]">
            {product.type}
          </Badge>
          <h2 className="mt-4 font-serif text-[2.4rem] font-semibold tracking-[-0.05em] text-[#1E293B]">
            {product.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-[#526174]">{product.fullDescription}</p>
          <div className="mt-6 rounded-[1.5rem] bg-[#FAF7F2] p-5">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#7C6CF6]">Cena</p>
            <p className="mt-2 font-serif text-4xl font-semibold tracking-[-0.05em] text-[#1E293B]">
              {product.price} zł
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              className="rounded-full bg-[#7C6CF6] text-white hover:bg-[#6655EA]"
              onClick={() => {
                addToCart(product.id);
                showSuccess("Produkt został dodany do koszyka.");
              }}
            >
              Dodaj do koszyka
            </Button>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => {
                addToCart(product.id);
                navigate("/zamowienie");
              }}
            >
              Kup teraz
            </Button>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
          <h3 className="font-serif text-2xl font-semibold tracking-[-0.04em] text-[#1E293B]">
            Czego uczeń się nauczy
          </h3>
          <div className="mt-5 grid gap-3">
            {product.learningOutcomes.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-[1.2rem] bg-[#FAF7F2] p-4">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#7C6CF6]" />
                <p className="text-sm leading-6 text-[#1E293B]">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-white/75 bg-white/72 p-6 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl">
          <h3 className="font-serif text-2xl font-semibold tracking-[-0.04em] text-[#1E293B]">
            Informacje o dostępie
          </h3>
          <div className="mt-5 grid gap-3">
            {product.accessInformation.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-[1.2rem] bg-[#FAF7F2] p-4">
                <ShoppingBag className="mt-0.5 h-4 w-4 shrink-0 text-[#7C6CF6]" />
                <p className="text-sm leading-6 text-[#1E293B]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </StoreShell>
  );
};

export default Product;