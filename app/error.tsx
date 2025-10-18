"use client";

import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-red-200 via-red-300 to-red-400 px-4">
      <img
        src="/images/error.jpg"
        alt="Error Illustration"
        className="w-86 h-2/4 rounded-2xl object-contain mb-8 animate-bounce-slow"
      />

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 text-center animate-pulse">
        Oops! Something Went Wrong
      </h1>

      <p className="text-lg sm:text-xl md:text-2xl text-white text-center mb-8 max-w-md">
        Cannot Load the page. Go back to home
      </p>

      <button
        onClick={() => router.push("/")}
        className="px-6 py-3 bg-white text-red-500 font-semibold rounded-lg shadow-lg hover:bg-red-100 transition transform hover:scale-105 duration-300"
      >
        Go Home
      </button>
    </div>
  );
}
