import { useEffect, useRef, useState, useCallback } from 'react';
import { preloadHomeAssets } from '../../lib/preloadHomeAssets';

interface IntroOverlayProps {
  onFadeStart: () => void;
  onComplete: () => void;
}

// Timeout constants to guarantee the intro never blocks the visitor indefinitely
const STARTUP_DEADLINE_MS = 1500; // 1.5 seconds max before initiating graceful fallback if video hasn't started playing
const PLAYBACK_MAX_DURATION_MS = 4000; // Hard fallback limit if video stalls or fails to fire 'ended'

export function IntroOverlay({ onFadeStart, onComplete }: IntroOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadeStartedRef = useRef(false);
  const completedRef = useRef(false);
  const hasStartedPlayingRef = useRef(false);
  const [isFading, setIsFading] = useState(false);

  // Idempotent completion callback
  const finishIntro = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  }, [onComplete]);

  // Idempotent fade-out initiator
  const beginFadeOut = useCallback(() => {
    if (fadeStartedRef.current) return;
    fadeStartedRef.current = true;
    onFadeStart();
    setIsFading(true);
    // Start preloading secondary home assets now that intro is completing/fading out
    preloadHomeAssets();

    // Fallback timer: ensure overlay completes even if transitionend doesn't fire
    window.setTimeout(() => {
      finishIntro();
    }, 600);
  }, [onFadeStart, finishIntro]);

  useEffect(() => {
    // 1. Accessibility: Check for prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        beginFadeOut();
        return;
      }
    }

    const video = videoRef.current;
    if (!video) {
      beginFadeOut();
      return;
    }

    let startupTimer: number | null = null;
    let playbackSafetyTimer: number | null = null;
    let stallTimer: number | null = null;

    // Reset safety timer when video begins playing
    const clearStartupTimer = () => {
      if (startupTimer !== null) {
        window.clearTimeout(startupTimer);
        startupTimer = null;
      }
    };

    const handlePlaying = () => {
      hasStartedPlayingRef.current = true;
      clearStartupTimer();
      if (stallTimer !== null) {
        window.clearTimeout(stallTimer);
        stallTimer = null;
      }
      // Set an upper bound for total playback duration in case 'ended' is not fired
      if (playbackSafetyTimer === null) {
        playbackSafetyTimer = window.setTimeout(() => {
          beginFadeOut();
        }, PLAYBACK_MAX_DURATION_MS);
      }
    };

    const handleEnded = () => {
      beginFadeOut();
    };

    const handleErrorOrReject = () => {
      beginFadeOut();
    };

    const handleWaitingOrStalled = () => {
      // If stalled while playing, give it 1 second to recover before falling back gracefully
      if (hasStartedPlayingRef.current && stallTimer === null) {
        stallTimer = window.setTimeout(() => {
          beginFadeOut();
        }, 1000);
      }
    };

    // 2. Startup Deadline: if the video hasn't started playing within 1.5s, fall back gracefully
    startupTimer = window.setTimeout(() => {
      if (!hasStartedPlayingRef.current) {
        beginFadeOut();
      }
    }, STARTUP_DEADLINE_MS);

    // 3. Attach listeners
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleErrorOrReject);
    video.addEventListener('stalled', handleWaitingOrStalled);
    video.addEventListener('waiting', handleWaitingOrStalled);

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked, decoding error, or playback rejected
          beginFadeOut();
        });
      }
    };

    // Attempt playback as soon as any usable frame/data is ready (readyState >= 2 = HAVE_CURRENT_DATA)
    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener('canplay', tryPlay, { once: true });
      video.addEventListener('loadeddata', tryPlay, { once: true });
    }

    return () => {
      clearStartupTimer();
      if (playbackSafetyTimer !== null) window.clearTimeout(playbackSafetyTimer);
      if (stallTimer !== null) window.clearTimeout(stallTimer);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleErrorOrReject);
      video.removeEventListener('stalled', handleWaitingOrStalled);
      video.removeEventListener('waiting', handleWaitingOrStalled);
      video.removeEventListener('canplay', tryPlay);
      video.removeEventListener('loadeddata', tryPlay);
    };
  }, [beginFadeOut]);

  const handleTransitionEnd = (
    event: React.TransitionEvent<HTMLDivElement>
  ) => {
    if (isFading && event.propertyName === 'opacity') {
      finishIntro();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500 ease-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      onTransitionEnd={handleTransitionEnd}
    >
      <video
        ref={videoRef}
        src="/intro/logo_intro_animation1.mp4"
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
