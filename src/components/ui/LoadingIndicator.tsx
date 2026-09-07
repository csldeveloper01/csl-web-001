interface LoadingIndicatorProps {
  className?: string;
}

export function LoadingIndicator({ className = '' }: LoadingIndicatorProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        src="/assets/c-loading-animation.gif"
        alt="Loading"
        className="h-16 w-auto object-contain"
        draggable={false}
      />
    </div>
  );
}
