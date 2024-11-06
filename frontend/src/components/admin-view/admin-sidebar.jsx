import { useNavigate } from "react-router-dom";
import { UsersRound } from "lucide-react";
import { Fragment } from "react";
import { ListOrdered, LayoutDashboard, PackageSearch } from "lucide-react";
import {  Drawer } from "antd";
  
export const adminSidebarMenuItems = [
 
  {
    id: "Product",
    label: "Product",
    path: "/admin/product",
    icon: <PackageSearch />,
  },
  {
    id: "Order",
    label: "Order",
    path: "/admin/order",
    icon: <ListOrdered />,
  },
];

function MenuItems() {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={()=>navigate(menuItem.path)}
          className="flex cursor-pointer text-xl items-center gap-4 rounded-xs px-5 py-2 text-gray-500 hover:bg-gray-100 hover:text-black"
        >
          {menuItem.icon} <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSidebar({ closeDrawer, isDrawerOpen }) {
    const navigate = useNavigate();
  return (
    <Fragment>
      <Drawer
        title={
          <div
            onClick={() => navigate("/admin/dashboard")}
            className="flex cursor-pointer items-center gap-2"
          >
            <UsersRound size={30} />
            <h1 className="text-2xl font-extrabold">Admin Panel</h1>
          </div>
        }
        placement="left"
        onClose={closeDrawer}
        open={isDrawerOpen}
      >
        <MenuItems />
      </Drawer>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <UsersRound size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSidebar;
