// interface LoadingIndicatorProps {
//   className?: string;
// }

// export function LoadingIndicator({ className = '' }: LoadingIndicatorProps) {
//   return (
//     <div className={`flex items-center justify-center ${className}`}>
//       <img
//         src="/assets/c-loading-animation.webm"
//         alt="Loading"
//         className="h-16 w-auto object-contain"
//         draggable={false}
//       />
//     </div>
//   );
// }

interface LoadingIndicatorProps {
  className?: string;
}

export function LoadingIndicator({ className = '' }: LoadingIndicatorProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <span className="text-sm sm:text-base font-bold text-csl-blue tracking-wide">
        Loading...
      </span>
    </div>
  );
}