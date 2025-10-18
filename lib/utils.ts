import { clsx, type ClassValue } from "clsx";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { RootState } from "./Store/store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useAuth() {
  if (window.localStorage !== null || window.localStorage !== undefined) {
    return useSelector((state: RootState) => state.auth.isLoggedIn);
  }
}
