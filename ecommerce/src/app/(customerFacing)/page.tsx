import { Button } from "@/components/ui/button"
import db from "@/db/db"
import { Product } from "@prisma/client"
import Link from "next/link"

function getNewestProducts() {
    return db.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { createdAt: "desc" },
        take: 6
    })
}

function getMostPopularProducts() {
    return db.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { orders: { _count: "desc" } },
        take: 6
    })
}


export default function HomePages() {
  return (
      <main className="space-y-12">
          <ProductGridSelection title="Most Popular"
              productsFetcher={getMostPopularProducts} />
        <ProductGridSelection title="Newest" productsFetcher={getNewestProducts}/>
    </main>
  )
}

type ProductGridSelectionProps = {
    title: string;
    productsFetcher: () => Promise<Product[]>;
}

function ProductGridSelection({ productsFetcher, title }
    : ProductGridSelectionProps) {
    return (
     <div className="space-y-4">
         <div className="flex gap-4">
             <h2 className="text-3xl font-bold">{title}</h2>
                <Button asChild>
                    <Link href="/products">View All</Link>
                </Button>
         </div>
    </div>
    )
}