import { FileText, GraduationCap, PlayCircle, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PlatformProduct } from "@/lib/platform-types";

const productTypeLabel: Record<PlatformProduct["type"], string> = {
  pdf: "PDF",
  "kurs-video": "Kurs video",
  "warsztat-online": "Warsztat",
  "konsultacja-indywidualna": "Konsultacja",
};

const productTypeIcon = {
  pdf: FileText,
  "kurs-video": PlayCircle,
  "warsztat-online": GraduationCap,
  "konsultacja-indywidualna": ShoppingBag,
};

type ShopProductCardProps = {
  product: PlatformProduct;
  onAddToCart: (productId: string) => void;
};

export const ShopProductCard = ({ product, onAddToCart }: ShopProductCardProps) => {
  const Icon = productTypeIcon[product.type];

  return (
    <article className="group overflow-hidden rounded-[1.8rem] border border-white/75 bg-white/72 shadow-[0_24px_70px_rgba(30,41,59,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(124,108,246,0.14)]">
      <div className="aspect-[4/3] overflow-hidden bg-[#F3EDE4]">
        <img
          src={product.image?.dataUrl ?? "/placeholder.svg"}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <Badge className="border-0 bg-[#EAF2FF] text-[#7C6CF6] hover:bg-[#EAF2FF]">
            <Icon className="mr-1 h-3.5 w-3.5" />
            {productTypeLabel[product.type]}
          </Badge>
          <span className="font-serif text-2xl font-semibold tracking-[-0.04em] text-[#1E293B]">
            {product.price} zł
          </span>
        </div>
        <h2 className="mt-4 font-serif text-[1.7rem] font-semibold tracking-[-0.045em] text-[#1E293B]">
          {product.title}
        </h2>
        <p className="mt-2 min-h-12 text-sm leading-6 text-[#526174]">{product.shortDescription}</p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Button asChild variant="outline" className="rounded-full">
            <Link to={`/produkt/${product.id}`}>Zobacz szczegóły</Link>
          </Button>
          <Button
            className="rounded-full bg-[#7C6CF6] text-white hover:bg-[#6655EA]"
            onClick={() => onAddToCart(product.id)}
          >
            Dodaj do koszyka
          </Button>
        </div>
      </div>
    </article>
  );
};