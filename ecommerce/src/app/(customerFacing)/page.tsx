import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import db from "@/db/db"
import { cache } from "@/lib/cache"
import { Product } from "@prisma/client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

function getNewestProducts() {
    return db.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { createdAt: "desc" },
        take: 6
    })
}

const getMostPopularProducts = cache(() => {
    return db.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { orders: { _count: "desc" } },
        take: 6
    })
}, ["/", "getMostPopularProducts"], {revalidate: 60 * 60 * 24 })


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
                <Button variant="outline" asChild>
                    <Link href="/products" className="space-x-2">
                        <span>View All</span>
                        <ArrowRight className="size-4"/>
                    </Link>
                </Button>
         </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols3 gap-4">
                <Suspense
                    fallback={
                        <>
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                        <ProductCardSkeleton />
                    </>
                } 
                >
                    <ProductSuspense productsFetcher={productsFetcher} />
                </Suspense>
         </div>
    </div>
    )
}

async function ProductSuspense({ productsFetcher }: { productsFetcher: () => Promise<Product[]> }) {
    return (await productsFetcher()).map((product) => (
        <ProductCard key={product.id} {...product} />
    ))
}