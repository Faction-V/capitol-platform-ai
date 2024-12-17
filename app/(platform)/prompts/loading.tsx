export default function Loading() {
  return (
    <div className="p-4 w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="flex gap-3 h-full">
            <div className="h-96 w-1/2 bg-slate-200 rounded" />
            <div className="h-96 w-1/2 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
