// Importing createWebStorage from redux-persist for web storage functionality
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// Function to create a noop storage for server-side rendering (SSR) fallback
const createNoopStorage = () => {

  return {
    // Simulating getItem function, returns null in SSR environment
    getItem(_key: any) {
      return Promise.resolve(null);
    },

    // Simulating setItem function, returns the value in SSR environment
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },

    // Simulating removeItem function, resolves nothing in SSR environment
    removeItem(_key: any) {
      return Promise.resolve();

    },
  };
};

// Conditional check to use createWebStorage if window is defined, else use noop storage
const storage =
  typeof window !== "undefined"  // Ensure window is available (client-side)
    ? createWebStorage("local")  // Use local storage if available in the browser
    : createNoopStorage();       // Fallback to noop storage if on the server

// Exporting the storage for use in the application
export default storage;
