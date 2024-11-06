import { Avatar, Badge, Button, Drawer, Dropdown, Menu } from "antd";

import {
  AlignJustify,
  Box,
  LogOut,
  ShoppingCart,
  UserCog,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { shoppingViewHeaderMenuItems } from "../../config";
import { loginUser } from "../../store/auth-slice/authSlice";
import CartWrapper from "./cartwrapper";
import { fetchCartItems } from "../../store/shop-slice/cart-slice";

function MenuItems() {
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItems) => (
        <Link
          key={menuItems.id}
          to={menuItems.path}
          className="text-sm font-medium"
        >
          {" "}
          {menuItems.label}
        </Link>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(loginUser());
  }

  // Tạo các mục menu

  const menuItems = (
    <Menu className="w-64">
      {/* Divider */}

      {/* Account Item */}
      <Menu.Item
        key="account"
        onClick={() => navigate("/shop/account")}
        className="flex items-center w-36"
      >
        <div className="flex flex-row">
          <UserCog className="mr-2 h-4 w-4" />
          Account
        </div>
      </Menu.Item>

      {/* Divider */}
      <Menu.Divider className="my-2" />

      {/* Logout Item */}
      <Menu.Item
        key="logout"
        onClick={handleLogout}
        className="flex items-center w-36"
      >
        <div className="flex flex-row">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </div>
      </Menu.Item>
    </Menu>
  );

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  console.log(cartItems, "cartItems");
  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Badge count={cartItems && cartItems.items && cartItems.items.length}>
        <Button onClick={showDrawer} size="middle" type="text" variant="solid">
          <ShoppingCart />
          <span className="sr-only">User cart</span>
        </Button>
      </Badge>

      <Dropdown
        trigger={["click"]}
        menu={menuItems}
        dropdownRender={() => (
          <div className="rounded-t-lg shadow-lg bg-white">
            {/* Custom Header */}
            <div className="px-4 py-2 text-xl font-bold">
              Hi {user?.userName}
            </div>

            {menuItems}
          </div>
        )}
      >
        <Avatar
          size={35}
          className="cursor-pointer text-white bg-zinc-900 font-bold font-mono"
        >
          {user?.userName[0].toUpperCase()}
        </Avatar>
      </Dropdown>
      <Drawer
        placement="right"
        title="Your Cart"
        width={480}
        onClose={onClose}
        open={open}
      >
        <CartWrapper
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Drawer>
    </div>
  );
}

function ShopingHeader() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(loginUser());
  }
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <Box className="h-6 w-6" />
          <span className="font-bold"> TheClox</span>
        </Link>

        <Button onClick={showDrawer} className="lg:hidden sm:block">
          <AlignJustify />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <div className="hidden lg:flex flex-1 justify-center">
          <MenuItems />
        </div>
        <Drawer
          placement="left"
          title={
            <Link to="/shop/home" className="flex items-center gap-2">
              <Box className="h-6 w-6" />
              <span className="font-bold"> TheClox</span>
            </Link>
          }
          closable={false}
          onClose={onClose}
          open={open}
          extra={<Button type="text" onClick={onClose} icon={<XIcon />} />}
          footer={
            <div>
              {" "}
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
              </div>{" "}
            </div>
          }
        >
          <div className="ml-10 ">
            <MenuItems />
          </div>
        </Drawer>
        {isAuthenticated ? (
          <div>
            <HeaderRightContent />
          </div>
        ) : (
          "null"
        )}
      </div>
    </header>
  );
}

export default ShopingHeader;
