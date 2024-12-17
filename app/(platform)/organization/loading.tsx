export default function Loading() {
  return (
    <div className="p-4 w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-8 bg-slate-200 rounded col-span-3"></div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="h-32 bg-slate-200 rounded" />
            <div className="h-32 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}