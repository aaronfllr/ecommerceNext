import { Html, Preview,Container, Head, Heading, Tailwind, Body } from "@react-email/components"
import { OrderInformation } from "./components/OrderInformation"

type PurchaseReceiptsEmailProps = {
    product: { name: string, imagePath: string, description: string },
    order: { id: string; createdAt: Date; pricePaidInCents: number}
    downloadVerificationId: string
}

PurchaseReceiptEmail.PreviewProps = {
    product: { name: "Product Name", description: "Some Description", imagePath: "/products/9db98931-7fbb-405a-bb96-2db0d112e5a9-flower1.jpg" },
    order: {
        id: crypto.randomUUID(),
        createdAt: new Date(),
        pricePaidInCents: 1000,
    },
    downloadVerificationId: crypto.randomUUID(),

} satisfies PurchaseReceiptsEmailProps

export default function PurchaseReceiptEmail({ product, order,}: PurchaseReceiptsEmailProps) {
    return (
        <Html>
            <Preview>Download {product.name} and view reciept</Preview>
            <Tailwind>
                <Head />
                <Body className="font-sans bg-white">
                    <Container className="max-w.xl">
                        <Heading>Purchase Receipt</Heading>
                        <OrderInformation order={order} product={product} downloadVerificationId=""></OrderInformation>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}