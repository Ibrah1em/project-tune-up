import { useState, useRef, useEffect, memo } from "react";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const LazyImage = memo(({ src, alt, className = "", ...props }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className="relative">
      {isInView ? (
        <img
          src={src}
          alt={alt}
          className={`transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"} ${className}`}
          onLoad={() => setIsLoaded(true)}
          decoding="async"
          {...props}
        />
      ) : (
        <div
          className={`bg-muted/30 animate-pulse ${className}`}
          style={{ width: props.width, height: props.height }}
        />
      )}
    </div>
  );
});

LazyImage.displayName = "LazyImage";

export default LazyImage;
