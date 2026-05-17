const SkeletonLoader = ({ count = 5, viewType = "list" }) => {
  if (viewType === "grid") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="bg-neutral-900/40 p-5 rounded-2xl border border-neutral-800 flex flex-col items-center"
          >
            <div className="w-full aspect-square bg-neutral-800 rounded-xl animate-pulse mb-4" />
            <div className="h-4 bg-neutral-700 rounded w-3/4 animate-pulse mb-2" />
            <div className="h-3 bg-neutral-800 rounded w-1/2 animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center p-3 bg-neutral-900/20 hover:bg-neutral-900/40 border border-neutral-900 rounded-xl transition"
        >
          <div className="w-12 h-12 bg-neutral-800 rounded-lg animate-pulse shrink-0" />
          <div className="ml-4 space-y-2 flex-1">
            <div className="h-4 bg-neutral-700 rounded w-1/3 max-w-60 animate-pulse" />
            <div className="h-3 bg-neutral-800 rounded w-1/4 max-w-40 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
