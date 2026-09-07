import { useEffect, useRef } from 'react';
import { preloadHomeAssets, waitForHomeAssets } from '../../lib/preloadHomeAssets';

interface IntroOverlayProps {
  onComplete: () => void;
}

export function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    preloadHomeAssets();

    const video = videoRef.current;
    if (!video) return;

    const finishIntro = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      waitForHomeAssets().then(onComplete);
    };

    const handleEnded = () => {
      finishIntro();
    };

    video.addEventListener('ended', handleEnded);

    const playVideo = () => {
      video.play().catch(() => {
        finishIntro();
      });
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener('loadeddata', playVideo, { once: true });
    }

    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <video
        ref={videoRef}
        src="/intro/logo_intro_animation.mp4"
        className="h-full w-full object-contain"
        muted
        playsInline
        autoPlay
        preload="auto"
      />
    </div>
  );
}
