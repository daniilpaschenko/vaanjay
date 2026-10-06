'use client'

export function SkeletonText({ className = '' }: { className?: string }) {
  return <div className={`h-3 bg-surface-hover rounded animate-pulse ${className}`} />
}

export function SkeletonAvatar({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const s = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-20 h-20' : 'w-10 h-10'
  return <div className={`${s} rounded-full bg-surface-hover animate-pulse flex-shrink-0`} />
}

export function SkeletonImage({ className = '' }: { className?: string }) {
  return <div className={`bg-surface-hover animate-pulse ${className}`} />
}

export function PostSkeleton() {
  return (
    <div className="py-3 animate-pulse">
      <div className="flex items-center gap-3 px-4 mb-2">
        <SkeletonAvatar size="sm" />
        <div className="flex-1 min-w-0 space-y-1.5">
          <SkeletonText className="w-24" />
          <SkeletonText className="w-16" />
        </div>
      </div>
      <div className="bg-surface-secondary">
        <div className="aspect-square bg-surface-hover" />
      </div>
      <div className="flex items-center gap-4 px-4 pt-3 pb-1">
        <SkeletonText className="w-6 h-6 rounded" />
        <SkeletonText className="w-6 h-6 rounded" />
        <SkeletonText className="w-6 h-6 rounded" />
        <SkeletonText className="w-6 h-6 rounded ml-auto" />
      </div>
      <div className="px-4 pt-2 space-y-1.5">
        <SkeletonText className="w-20" />
        <SkeletonText className="w-full" />
        <SkeletonText className="w-3/4" />
      </div>
      <div className="px-4 mt-3 pt-2 border-t border-border">
        <SkeletonText className="w-full h-8 rounded-lg" />
      </div>
    </div>
  )
}

export function ProfileSkeleton() {
  return (
    <div className="pb-8 animate-pulse">
      <div className="p-4 border-b border-border">
        <div className="flex items-start gap-4">
          <SkeletonAvatar size="lg" />
          <div className="flex-1 min-w-0 space-y-2">
            <SkeletonText className="w-32 h-5" />
            <SkeletonText className="w-20" />
            <SkeletonText className="w-48" />
          </div>
        </div>
      </div>
      <div className="flex border-b border-border">
        <SkeletonText className="flex-1 h-10 rounded-none" />
        <SkeletonText className="flex-1 h-10 rounded-none" />
        <SkeletonText className="flex-1 h-10 rounded-none" />
      </div>
      <div className="grid grid-cols-3 gap-0.5 mt-0.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="aspect-square bg-surface-hover" />
        ))}
      </div>
    </div>
  )
}

export function ExploreSkeleton() {
  return (
    <div className="pb-8 animate-pulse">
      <div className="px-4 py-3 border-b border-border space-y-2">
        <SkeletonText className="w-40 h-5" />
        <SkeletonText className="w-full h-9 rounded-lg" />
      </div>
      <div className="p-4 space-y-3">
        <SkeletonText className="w-20 h-4" />
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <SkeletonAvatar />
              <div className="flex-1 space-y-1.5">
                <SkeletonText className="w-28" />
                <SkeletonText className="w-20" />
              </div>
              <SkeletonText className="w-16 h-8 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
      <div className="px-4 space-y-1">
        <SkeletonText className="w-24 h-4" />
        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-square bg-surface-hover rounded" />
          ))}
        </div>
      </div>
    </div>
  )
}

export function MessagesSkeleton() {
  return (
    <div className="flex flex-col h-full animate-pulse">
      <div className="px-4 py-3 border-b border-border space-y-3">
        <SkeletonText className="w-24 h-5" />
        <SkeletonText className="w-full h-9 rounded-lg" />
      </div>
      <div className="flex-1 divide-y divide-border">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3">
            <SkeletonAvatar />
            <div className="flex-1 space-y-1.5">
              <SkeletonText className="w-28" />
              <SkeletonText className="w-40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function NotificationsSkeleton() {
  return (
    <div className="pb-8 animate-pulse">
      <div className="px-4 py-3 border-b border-border">
        <SkeletonText className="w-32 h-5" />
      </div>
      <div className="flex border-b border-border">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonText key={i} className="flex-1 h-10 rounded-none" />
        ))}
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3 px-4 py-3">
            <SkeletonAvatar />
            <div className="flex-1 space-y-1.5">
              <SkeletonText className="w-48" />
              <SkeletonText className="w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PostDetailSkeleton() {
  return (
    <div className="min-h-screen max-w-2xl mx-auto border-x border-border animate-pulse">
      <div className="p-3 border-b border-border flex items-center gap-3">
        <SkeletonAvatar size="sm" />
        <div className="flex-1 space-y-1">
          <SkeletonText className="w-24" />
          <SkeletonText className="w-16" />
        </div>
      </div>
      <div className="bg-surface-secondary">
        <div className="max-h-[70vh] aspect-square bg-surface-hover" />
      </div>
      <div className="p-4 space-y-3">
        <div className="flex gap-4">
          <SkeletonText className="w-8 h-6 rounded" />
          <SkeletonText className="w-8 h-6 rounded" />
          <SkeletonText className="w-8 h-6 rounded" />
        </div>
        <SkeletonText className="w-full" />
        <SkeletonText className="w-3/4" />
        <SkeletonText className="w-20" />
      </div>
      <div className="border-t border-border p-4 space-y-3">
        <SkeletonText className="w-28 h-4" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-start gap-2">
            <SkeletonAvatar size="sm" />
            <div className="flex-1 space-y-1">
              <SkeletonText className="w-36" />
              <SkeletonText className="w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function VibezSkeleton() {
  return (
    <div className="h-full flex items-center justify-center bg-black animate-pulse">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-white/10 mx-auto" />
        <div className="w-32 h-4 bg-white/10 rounded mx-auto" />
        <div className="w-48 h-3 bg-white/10 rounded mx-auto" />
      </div>
    </div>
  )
}
