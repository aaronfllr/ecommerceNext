import { Nav, NavLink } from "@/components/Nav";

export const dynamic = "force-dynamic"; // force-dynamic lets the admin page not use caching to ensure most updated data with caveat being speed

export default function AdminLayour({
    children,
    }: Readonly<{
        children: React.ReactNode;
        }>) {
    return <>
    <Nav>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/users">Customers</NavLink>
        <NavLink href="/admin/orders">Sales</NavLink>

    </Nav>
    <div className="container my-6">{children}</div>
    </>
}