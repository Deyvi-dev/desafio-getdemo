export function Loading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    </div>
  );
}
