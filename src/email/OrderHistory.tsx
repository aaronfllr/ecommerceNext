import { Html, Hr, Preview,Container, Head, Heading, Tailwind, Body } from "@react-email/components"
import { OrderInformation } from "./components/OrderInformation"
import React from "react"
import { Component } from "lucide-react"

type OrderHistoryEmailProps = {
    orders: {
        id: string
        pricePaidInCents: number
        createdAt: Date
        downloadVerificationId: string
        product: {
            name: string
            imagePath: string
            description: string
        }
    }[]
}

OrderHistoryEmail.PreviewProps = {
    orders: [
        {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            pricePaidInCents: 10000,
            downloadVerificationId: crypto.randomUUID(),
            product: { name: "Product Name", description: "Some description", imagePath: "/products/9db98931-7fbb-405a-bb96-2db0d112e5a9-flower1.jpg" },       
        }
    ]


} satisfies OrderHistoryEmailProps

export default function OrderHistoryEmail({ orders }: OrderHistoryEmailProps) {
    return (
        <Html>
            <Preview>Order History & Downloads</Preview>
            <Tailwind>
                <Head />
                <Body className="font-sans bg-white">
                    <Container className="max-w-xl">
                        <Heading>Order History</Heading>
                        {orders.map((order, index) => (
                        <React.Fragment key={order.id}>
                            <OrderInformation 
                            key={order.id}
                            order={order} 
                            product={order.product} 
                            downloadVerificationId={order.downloadVerificationId} 
                        />
                        {index < orders.length - 1 && <Hr />}
                        </ React.Fragment>
                        ))}
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}