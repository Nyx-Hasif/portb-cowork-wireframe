// components/ToastProvider.tsx
"use client";
import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#333",
          color: "#fff",
          padding: "16px",
          borderRadius: "10px",
        },
        success: {
          style: {
            background: "#10B981",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#10B981",
          },
        },
        error: {
          style: {
            background: "#EF4444",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#EF4444",
          },
        },
      }}
    />
  );
}
