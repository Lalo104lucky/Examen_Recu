import React from 'react';
import { Navbar, Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from 'react-icons/hi';
import { Outlet } from 'react-router-dom';


const AdminLayouts = () => {
    // DIseñar el layout pora Usuario
    return (
        <>
            <header>
                <Navbar fluid rounded>
                    <Navbar.Brand href="https://www.youtube.com/channel/UCl4cDFJ4uLqKpiX0UvwsoNw">
                        <img src="https://cdn-icons-png.freepik.com/512/8362/8362415.png" className="mr-3 h-6 sm:h-9" alt="Unicorn" />
                        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Página de Administrador</span>
                    </Navbar.Brand>
                    <div className="flex md:order-2">
                        <Navbar.Toggle />
                    </div>
                    <Navbar.Collapse>
                        <Navbar.Link href="#" active>
                            Home
                        </Navbar.Link>
                        <Navbar.Link href="#">About</Navbar.Link>
                        <Navbar.Link href="#">Services</Navbar.Link>
                        <Navbar.Link href="#">Pricing</Navbar.Link>
                        <Navbar.Link href="#">Contact</Navbar.Link>
                    </Navbar.Collapse>
                </Navbar>
            </header>
            <div className='flex'>
                <aside>
                <Sidebar aria-label="Sidebar with multi-level dropdown example">
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item href="#" icon={HiChartPie}>
                                Dashboard
                            </Sidebar.Item>
                            <Sidebar.Collapse icon={HiShoppingBag} label="E-commerce">
                                <Sidebar.Item href="#">Products</Sidebar.Item>
                                <Sidebar.Item href="#">Sales</Sidebar.Item>
                                <Sidebar.Item href="#">Refunds</Sidebar.Item>
                                <Sidebar.Item href="#">Shipping</Sidebar.Item>
                            </Sidebar.Collapse>
                            <Sidebar.Item href="#" icon={HiInbox}>
                                Inbox
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiUser}>
                                Users
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiShoppingBag}>
                                Products
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiArrowSmRight}>
                                Sign In
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiTable}>
                                Sign Up
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </aside>
            
            <main className='w-full'>
                <section className='px-4 pt-2 pb-8'>
                    <Outlet />
                </section>
            </main>
            </div>
            
            
        </>
    )
}

export default AdminLayouts;