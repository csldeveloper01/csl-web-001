import { useEffect, useRef, ReactNode } from 'react';

export function GlobalDistortionWrapper({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dispCanvas = document.createElement('canvas');
    const dispCtx = dispCanvas.getContext('2d', { willReadFrequently: true })!;
    
    const scale = 0.5; // lower resolution for performance & smoothness
    let width = 0;
    let height = 0;

    // Brush Creation - Normal Map with Shadow tracking in Blue channel
    const brushSize = 64;
    const brushCanvas = document.createElement('canvas');
    brushCanvas.width = brushSize; brushCanvas.height = brushSize;
    const bCtx = brushCanvas.getContext('2d', { willReadFrequently: true })!;
    const imgData = bCtx.createImageData(brushSize, brushSize);
    for (let y = 0; y < brushSize; y++) {
      for (let x = 0; x < brushSize; x++) {
        const dx = (x - brushSize / 2) / (brushSize / 2);
        const dy = (y - brushSize / 2) / (brushSize / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        let r = 128, g = 128, b = 128, a = 0;
        if (dist <= 1) {
          const z = Math.pow(Math.cos(dist * Math.PI / 2), 1.5);
          r = 128 + (dx * 127 * z);
          g = 128 + (dy * 127 * z);
          b = 128;
          a = 255;
        }
        const i = (y * brushSize + x) * 4;
        imgData.data[i] = r;
        imgData.data[i+1] = g;
        imgData.data[i+2] = b;
        imgData.data[i+3] = a;
      }
    }
    bCtx.putImageData(imgData, 0, 0);

    const onResize = () => {
      if (!wrapperRef.current) return;
      width = wrapperRef.current.clientWidth;
      height = wrapperRef.current.clientHeight;
      
      dispCanvas.width = width * scale;
      dispCanvas.height = height * scale;
      
      dispCtx.fillStyle = 'rgb(128,128,128)';
      dispCtx.fillRect(0, 0, dispCanvas.width, dispCanvas.height);
      
      const feImage = document.getElementById('refraction-map-image');
      if (feImage) feImage.setAttribute('href', dispCanvas.toDataURL('image/png'));
    };
    
    // Use ResizeObserver for accurate height tracking since content might change
    const observer = new ResizeObserver(onResize);
    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }
    window.addEventListener('resize', onResize);
    onResize();

    let mousePos = { x: -100, y: -100 };
    let currentTarget = 'white';
    
    const onMouseMove = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      
      const el = document.elementFromPoint(e.clientX, e.clientY);
      
      // Disable distortion when hovering over UI elements
      if (el?.closest('a') || el?.closest('button') || el?.closest('nav')) {
        mousePos = { x: -100, y: -100 };
        return;
      }
      
      const rect = wrapperRef.current.getBoundingClientRect();
      const rawX = e.clientX - rect.left;
      const rawY = e.clientY - rect.top;
      
      currentTarget = el?.closest('[data-distort]')?.getAttribute('data-distort') || 'white';
      
      mousePos = { x: rawX * scale, y: rawY * scale };
    };
    
    const onMouseLeave = () => {
      mousePos = { x: -100, y: -100 };
    };
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    const feImage = document.getElementById('refraction-map-image');
    let animationId = 0;

    const render = () => {
      dispCtx.globalCompositeOperation = 'source-over';
      dispCtx.fillStyle = 'rgb(128,128,128)';
      dispCtx.fillRect(0, 0, dispCanvas.width, dispCanvas.height);

      if (mousePos.x > -100) {
        // Draw exactly ON the mouse, no trailing arrays or aging.
        const radius = currentTarget === 'text' ? 14 : (currentTarget === 'yellow' ? 24 : 18);
        const intensity = currentTarget === 'text' ? 1.0 : (currentTarget === 'yellow' ? 0.85 : 0.65);
        
        dispCtx.globalAlpha = intensity;
        dispCtx.drawImage(brushCanvas, mousePos.x - radius, mousePos.y - radius, radius * 2, radius * 2);
        
        if (feImage) feImage.setAttribute('href', dispCanvas.toDataURL('image/png'));
        if (wrapperRef.current) wrapperRef.current.dataset.cleared = 'false';
      } else {
        if (wrapperRef.current && wrapperRef.current.dataset.cleared !== 'true') {
          dispCtx.fillStyle = 'rgb(128,128,128)';
          dispCtx.fillRect(0, 0, dispCanvas.width, dispCanvas.height);
          if (feImage) feImage.setAttribute('href', dispCanvas.toDataURL('image/png'));
          wrapperRef.current.dataset.cleared = 'true';
        }
      }

      animationId = requestAnimationFrame(render);
    };
    
    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      observer.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div 
      ref={wrapperRef} 
      className="relative w-full min-h-screen"
      style={{ filter: 'url(#global-optical-refraction)' }}
    >
      <svg width="0" height="0" className="absolute pointer-events-none -z-50">
        <defs>
          <filter id="global-optical-refraction" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feImage href="" id="refraction-map-image" result="DISP_MAP" preserveAspectRatio="none" />
            
            <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="R" />
            <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="G" />
            <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="B" />
            
            <feDisplacementMap in="R" in2="DISP_MAP" scale="35" xChannelSelector="R" yChannelSelector="G" result="DISP_R" />
            <feDisplacementMap in="G" in2="DISP_MAP" scale="25" xChannelSelector="R" yChannelSelector="G" result="DISP_G" />
            <feDisplacementMap in="B" in2="DISP_MAP" scale="45" xChannelSelector="R" yChannelSelector="G" result="DISP_B" />
            
            <feBlend mode="screen" in="DISP_R" in2="DISP_G" result="RG" />
            <feBlend mode="screen" in="RG" in2="DISP_B" result="FINAL" />
          </filter>
        </defs>
      </svg>
      {children}
    </div>
  );
}
