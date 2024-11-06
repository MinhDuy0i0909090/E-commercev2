import { Outlet } from "react-router-dom";
import ShopingHeader from "./shoping-header";

function ShopingLayout() {
  return (
    <div className="flex flex-col bg-white">
      <ShopingHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default ShopingLayout;
