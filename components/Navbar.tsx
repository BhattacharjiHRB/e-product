"use client";
import { logout } from "@/lib/Store/auth";
import { RootState } from "@/lib/Store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const auth = useSelector((s: RootState) => s.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <header className="bg-card shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-6xl font-bold bg-gradient-to-r from-primary to-[#0D1821] bg-clip-text text-transparent"
          >
            e-Products
          </Link>
        </div>
        <ul className=" flex-1 items-center hidden md:inline-flex justify-center gap-4">
          <Link
            href="/products"
            className="text-md font-semibold hover:bg-[#0D1821] hover:text-white px-2 py-1 rounded"
          >
            Products List
          </Link>
          <Link
            href="/products/create"
            className="text-md font-semibold hover:bg-[#0D1821] hover:text-white px-2 py-1 rounded"
          >
            Create Product
          </Link>
          <Link
            href="/category"
            className="text-md font-semibold hover:bg-[#0D1821] hover:text-white px-2 py-1 rounded"
          >
            Catagory List
          </Link>
        </ul>
        <div className="flex items-center gap-3">
          {auth.token ? (
            <>
              <span className="text-lg text-white bg-[#0D1821] hidden p-2 rounded-md sm:inline">
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
      </div>
    </header>
  );
}
