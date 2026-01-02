export default function TaskSkeleton() {
  return (
    <div className="w-full h-16 bg-white dark:bg-[#1c2127] border border-white/10 rounded-xl flex items-center p-4 gap-4 animate-pulse">
      {/* Circle Skeleton */}
      <div className="size-5 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      
      {/* Text Skeleton */}
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-3 w-1/4 bg-gray-200 dark:bg-gray-700 rounded opacity-60"></div>
      </div>

      {/* Date Skeleton */}
      <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  );
}