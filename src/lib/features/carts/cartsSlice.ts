import { compareArrays } from "@/lib/utils";
import { Discount } from "@/types/product.types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Function to calculate the price of a product, considering discounts and quantity
const calculatePrice = (
  basePrice: number,
  product: CartItem,
  quantity?: number
): number => {
  // Calculate discount price based on the product's discount
  const discountPrice =
    product.discount.percentage > 0
      ? Math.round(product.price - (product.price * product.discount.percentage) / 100)
      : product.discount.amount > 0
      ? Math.round(product.price - product.discount.amount)
      : product.price;

  return discountPrice * (quantity || product.quantity);
};

// Define the shape of the object to remove a cart item
export type RemoveCartItem = {
  id: number;
  attributes: string[]; // Attributes to match the item to remove
};

// Define the CartItem type, representing each item in the cart
export type CartItem = {
  id: number;
  name: string;
  srcUrl: string;
  price: number;
  attributes: string[];
  discount: Discount;
  quantity: number; // Quantity of the item in the cart
};

// Define the Cart type, which holds the items and total quantities
export type Cart = {
  items: CartItem[];
  totalQuantities: number; // Total quantity of all items in the cart
};

// Define the state shape for the cart slice
interface CartsState {
  cart: Cart | null;
  totalPrice: number; // Total price of items in the cart
  adjustedTotalPrice: number; // Price after applying discounts
  action: "update" | "add" | "delete" | null; // Action type for tracking the cart update
}

// Initial state of the cart
const initialState: CartsState = {
  cart: null,
  totalPrice: 0,
  adjustedTotalPrice: 0,
  action: null,
};

// Create a slice for managing the cart
export const cartsSlice = createSlice({
  name: "carts", // Slice name
  initialState,
  reducers: {
    // Action to add an item to the cart
    addToCart: (state, action: PayloadAction<CartItem>) => {
      // If the cart is empty, initialize it with the item
      if (!state.cart) {
        state.cart = {
          items: [action.payload],
          totalQuantities: action.payload.quantity,
        };
        state.totalPrice += action.payload.price * action.payload.quantity;
        state.adjustedTotalPrice += calculatePrice(state.totalPrice, action.payload);
        return;
      }

      // Check if the item already exists in the cart (based on ID and attributes)
      const existingItem = state.cart.items.find(
        (item) =>
          action.payload.id === item.id &&
          compareArrays(action.payload.attributes, item.attributes)
      );

      // If the item exists, update its quantity
      if (existingItem) {
        state.cart.items = state.cart.items.map((cartItem) =>
          cartItem.id === action.payload.id &&
          compareArrays(cartItem.attributes, existingItem.attributes)
            ? {
                ...existingItem,
                quantity: existingItem.quantity + action.payload.quantity,
              }
            : cartItem
        );
        state.cart.totalQuantities += action.payload.quantity;
        state.totalPrice += action.payload.price * action.payload.quantity;
        state.adjustedTotalPrice += calculatePrice(state.totalPrice, action.payload);
        return;
      }

      // If the item doesn't exist, add it to the cart
      state.cart.items.push(action.payload);
      state.cart.totalQuantities += action.payload.quantity;
      state.totalPrice += action.payload.price * action.payload.quantity;
      state.adjustedTotalPrice += calculatePrice(state.totalPrice, action.payload);
    },

    // Action to remove a single unit of an item from the cart
    removeCartItem: (state, action: PayloadAction<RemoveCartItem>) => {
      if (!state.cart) return;

      // Find the existing item in the cart
      const existingItem = state.cart.items.find(
        (item) =>
          action.payload.id === item.id &&
          compareArrays(action.payload.attributes, item.attributes)
      );

      // If the item doesn't exist, return
      if (!existingItem) return;

      // Update the item quantity, and remove it if the quantity becomes zero
      state.cart.items = state.cart.items
        .map((cartItem) =>
          cartItem.id === action.payload.id &&
          compareArrays(cartItem.attributes, existingItem.attributes)
            ? { ...existingItem, quantity: existingItem.quantity - 1 }
            : cartItem
        )
        .filter((item) => item.quantity > 0);

      // Update total quantities and prices
      state.cart.totalQuantities -= 1;
      state.totalPrice -= existingItem.price;
      state.adjustedTotalPrice -= calculatePrice(existingItem.price, existingItem, 1);
    },

    // Action to remove an entire item (with its quantity) from the cart
    remove: (state, action: PayloadAction<RemoveCartItem & { quantity: number }>) => {
      if (!state.cart) return;

      // Find the existing item in the cart
      const existingItem = state.cart.items.find(
        (item) =>
          action.payload.id === item.id &&
          compareArrays(action.payload.attributes, item.attributes)
      );

      // If the item doesn't exist, return
      if (!existingItem) return;

      // Remove the item entirely from the cart
      state.cart.items = state.cart.items.filter(
        (item) =>
          item.id !== action.payload.id ||
          !compareArrays(item.attributes, existingItem.attributes)
      );
      
      // Update the total quantities and prices
      state.cart.totalQuantities -= existingItem.quantity;
      state.totalPrice -= existingItem.price * existingItem.quantity;
      state.adjustedTotalPrice -= calculatePrice(
        existingItem.price,
        existingItem,
        existingItem.quantity
      );
    },
  },
});

// Export actions and reducer for use in the application
export const { addToCart, removeCartItem, remove } = cartsSlice.actions;
export default cartsSlice.reducer;
