function Loading() {
  return (
    <div className="flex justify-center items-center h-screen space-x-4">
      <div className="w-36 h-36 border-6 border-t-[#AD8A64] rounded-full animate-spin "></div>
      <div className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold">
        Loading..
      </div>
    </div>
  );
}

export default Loading;
