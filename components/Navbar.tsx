"use client";
import { logout } from "@/lib/Store/auth";
import { RootState } from "@/lib/Store/store";
import { Menu, XIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const auth = useSelector((s: RootState) => s.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <header className="bg-card shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl sm:text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-[#0D1821] bg-clip-text text-transparent"
        >
          e-Products
        </Link>

        <ul className="hidden md:flex flex-1 items-center justify-center gap-4">
          <Link
            href="/products"
            className="text-sm lg:text-md font-semibold hover:bg-[#0D1821] hover:text-white px-2 py-1 rounded"
          >
            Products List
          </Link>
          <Link
            href="/products/create"
            className="text-sm lg:text-md font-semibold hover:bg-[#0D1821] hover:text-white px-2 py-1 rounded"
          >
            Create Product
          </Link>
          <Link
            href="/category"
            className="text-md font-semibold hover:bg-[#0D1821] hover:text-white px-2 py-1 rounded"
          >
            Category List
          </Link>
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {auth.token ? (
            <>
              <span className="text-lg text-white bg-[#0D1821] p-2 rounded-md">
                {auth.email?.split("@", 1)}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-2 bg-[#A44A3F] rounded-lg border border-muted text-lg text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-3 py-2 bg-[#0D1821] rounded-lg border border-muted text-lg text-white"
            >
              Login
            </Link>
          )}
        </div>

        <button
          className=" bloxk bg-primary p-3 rounded-full md:hidden text-2xl text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <XIcon /> : <Menu />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-card w-full px-4 py-4 flex flex-col gap-3">
          <Link
            href="/products"
            className="text-black font-semibold hover:bg-[#0D1821] px-3 py-2 rounded"
            onClick={() => setMobileOpen(false)}
          >
            Products List
          </Link>
          <Link
            href="/products/create"
            className="text-black font-semibold hover:bg-[#0D1821] px-3 py-2 rounded"
            onClick={() => setMobileOpen(false)}
          >
            Create Product
          </Link>
          <Link
            href="/category"
            className="text-black font-semibold hover:bg-[#0D1821] px-3 py-2 rounded"
            onClick={() => setMobileOpen(false)}
          >
            Category List
          </Link>

          {auth.token ? (
            <>
              <span className="text-white bg-[#0D1821] p-2 rounded-md">
                {auth.email?.split("@", 1)}
              </span>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className="px-3 py-2 bg-[#A44A3F] rounded-lg border border-muted text-lg text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-3 py-2 bg-[#0D1821] rounded-lg border border-muted text-lg text-white"
              onClick={() => setMobileOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
