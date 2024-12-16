import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define the structure for the Color type with name and code
export type Color = {
  
  name: string; // The name of the color (e.g., Brown)
  code: string; // The color code (e.g., background color in Tailwind CSS format)
};

// Define the state structure for the Products slice
interface ProductsState {

  colorSelection: Color; // Holds the selected color details
  sizeSelection: string; // Holds the selected size (e.g., "Large")
}

// Define the initial state using the ProductsState structure
const initialState: ProductsState = {

  colorSelection: {
    name: "Brown", // Default color name
    code: "bg-[#4F4631]", // Default Tailwind CSS color code
  },
  sizeSelection: "Large", // Default size selection
};

// Create the productsSlice with actions to modify the state
export const productsSlice = createSlice({

  name: "products", // Slice name
  initialState, // Set initial state for the slice
  reducers: {
    // Action to set a new color selection
    setColorSelection: (state, action: PayloadAction<Color>) => {
      state.colorSelection = action.payload; // Update the color selection
    },
    // Action to set a new size selection
    setSizeSelection: (state, action: PayloadAction<string>) => {
      state.sizeSelection = action.payload; // Update the size selection
    },
  },
});

// Export the actions so they can be dispatched from components
export const { setColorSelection, setSizeSelection } = productsSlice.actions;

// Export the reducer to be used in the store
export default productsSlice.reducer;
