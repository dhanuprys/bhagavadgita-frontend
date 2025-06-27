export function ChapterSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border elegant-border">
        <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>

      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border elegant-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 bg-gray-200 rounded-full"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-gray-100 rounded-lg"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function VerseSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-6 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded w-32"></div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border elegant-border">
        <div className="h-8 bg-gray-200 rounded w-32 mb-4"></div>
        <div className="space-y-4">
          <div className="h-20 bg-gray-100 rounded-lg"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-16 bg-gray-100 rounded-lg"></div>
        </div>
      </div>
    </div>
  )
}
