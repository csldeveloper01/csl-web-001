import { useEffect, useRef, useState, useCallback } from 'react';
import { preloadHomeAssets, waitForHomeAssets } from '../../lib/preloadHomeAssets';

interface IntroOverlayProps {
  onFadeStart: () => void;
  onComplete: () => void;
}

export function IntroOverlay({ onFadeStart, onComplete }: IntroOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const completedRef = useRef(false);
  const [isFading, setIsFading] = useState(false);

  const beginFadeOut = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onFadeStart();
    setIsFading(true);
  }, [onFadeStart]);

  useEffect(() => {
    preloadHomeAssets();

    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      waitForHomeAssets().then(beginFadeOut);
    };

    video.addEventListener('ended', handleEnded);

    const playVideo = () => {
      video.play().catch(() => {
        waitForHomeAssets().then(beginFadeOut);
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
  }, [beginFadeOut]);

  const handleTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (isFading && event.propertyName === 'opacity') {
      onComplete();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500 ease-out ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      onTransitionEnd={handleTransitionEnd}
    >
      <video
        ref={videoRef}
        src="/intro/logo_intro_animation.mp4"
        className="intro-video h-auto w-auto max-h-[min(480px,65vh)] max-w-[min(480px,85vw)] object-contain outline-none border-0 shadow-none"
        muted
        playsInline
        autoPlay
        preload="auto"
        controls={false}
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
      />
    </div>
  );
}
