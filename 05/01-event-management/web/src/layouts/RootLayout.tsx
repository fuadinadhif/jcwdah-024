import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";

import Header from "@/components/Header";

export default function RootLayout() {
  return (
    <>
      <Toaster />
      <Header />
      <Outlet />
      <footer>Created with 💖</footer>
    </>
  );
}
