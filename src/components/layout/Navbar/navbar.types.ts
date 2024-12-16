import React from "react";

//Code breakdown

// The MenuItem type represents a single item in the navigation menu.
export type MenuItem = {
  id: number; // Unique identifier for the menu item
  type: "MenuItem" | "MenuList"; // Type of menu item, either a simple link (MenuItem) or a list (MenuList)
  label: string; // The label to display for the item
  url?: string; // Optional URL that the menu item links to
  children: 
    | (Omit<MenuItem, "children" | "type"> & {
        description?: string | React.ReactNode; // Optional description or content that may be displayed under a MenuList item
      })[] // If the type is "MenuList", this will contain child menu items (recursive structure)
    | []; // If the type is "MenuItem", this will be an empty array (no children)
};

// MenuListData is an array of MenuItem-like objects without the "children" and "type" properties
export type MenuListData = (Omit<MenuItem, "children" | "type"> & {
  description?: string | React.ReactNode; // Optional description for a menu item in a list
})[];

// NavMenu is an array of MenuItem objects, representing the entire navigation menu structure
export type NavMenu = MenuItem[];
