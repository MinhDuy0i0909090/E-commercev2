import { Outlet } from "react-router-dom";
import AdminSidebar from "./admin-sidebar";
import AdminHeader from "./header";
import { useState } from "react";
function AdminLayout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="flex min-h-screen w-full ">
      <AdminSidebar isDrawerOpen={isDrawerOpen} closeDrawer={closeDrawer} />
      <div className="flex flex-1 flex-col mb-4">
        <AdminHeader isDrawerOpen={openDrawer} />
        <main className="flex flex-1 bg-mute/40 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
