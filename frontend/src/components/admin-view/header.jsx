import { Button } from "antd";
import { AlignJustify, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/auth-slice/authSlice";
function AdminHeader({ isDrawerOpen }) {
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(loginUser());
  }
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={isDrawerOpen} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        {" "}
        <Button
          className="inline-flex gap-2 items-center rounded-md px-4 py-3 text-sm font-medium shadow"
          color="default"
          variant="solid"
          onClick={() => handleLogout()}
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
