import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PageHeader } from "../_components/pageHeader";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "@/components/ui/table";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { MoreVertical } from "lucide-react";
import { DeleteDropDownItem } from "./_components/OrderActions";

function getOrders() {
    return db.order.findMany({
        select: {
            id: true,
            pricePaidInCents: true,
            product: { select: { name: true }},
            user: { select: { email: true }}
        },
        orderBy: { createdAt: "desc" }, 
    })
}

export default function OrdersPage() {
    return (
        <>
            <PageHeader>Sales</PageHeader>
            <OrdersTable />
        </>
    )
}

async function OrdersTable() {
    const orders = await getOrders()

    if (orders.length === 0) return <p>No Sales Found</p>

    return ( 
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Price Paid</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map(order => (
                    <TableRow key={order.id}>
                        <TableCell>{order.product.name}</TableCell>
                        <TableCell>{order.user.email}</TableCell>
                        <TableCell>{formatCurrency(order.pricePaidInCents / 100) }</TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical />
                                    <span className="sr-only">Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DeleteDropDownItem id={order.id} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}