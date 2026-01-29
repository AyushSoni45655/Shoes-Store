

import loginback from './loginback.avif'

import Icons from "./iconss";

export const assetss = {
  loginback
}

export const adminNavbar = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: Icons.dashboard,
    path: "/admin",
  },
  {
    id: "products",
    name: "Products",
    icon: Icons.product,
    hasSubMenu: true,
    subItems: [
      {
        id: "add-product",
        name: "Add Product",
        icon: Icons.add,
        path: "/admin/products/add",
      },
      {
        id: "list-product",
        name: "List Product",
        icon: Icons.list,
        path: "/admin/products/list",
      },
    ],
  },
  {
    id: "categories",
    name: "Categories",
    icon: Icons.category,
    hasSubMenu: true,
    subItems: [
      { id: "men", name: "Men", icon: Icons.man, path: "/admin/category/men" },
      { id: "women", name: "Women", icon: Icons.woman, path: "/admin/category/women" },
      { id: "kids", name: "Kids", icon: Icons.kid, path: "/admin/category/kids" },
    ],
  },
  {
    id: "inventory",
    name: "Inventory",
    icon: Icons.inventory,
    path: "/admin/inventory",
  },
  {
    id: "orders",
    name: "Orders",
    icon: Icons.order,
    path: "/admin/orders",
  },
  {
    id: "users",
    name: "Users",
    icon: Icons.users,
    path: "/admin/users",
  },
  {
    id: "profile",
    name: "Profile",
    icon: Icons.profile,
    path: "/admin/profile",
  },
];
