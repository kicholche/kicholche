"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Slide = {
  id: string;
  title: string;
  excerpt: string;
  tag: string;
  href: string;
  image?: string;
  alt?: string;
};

export default function HomeHeroCarousel({ slides }: { slides: Slide[] }) {
  const safeSlides = slides.filter(Boolean);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (safeSlides.length < 2 || paused) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % safeSlides.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [paused, safeSlides.length]);

  if (!safeSlides.length) return null;
  const slide = safeSlides[index % safeSlides.length];

  const move = (direction: number) => {
    setIndex((current) => (current + direction + safeSlides.length) % safeSlides.length);
  };

  return (
    <article
      className="hero-main hero-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(event) => { touchX.current = event.touches[0]?.clientX ?? null; setPaused(true); }}
      onTouchEnd={(event) => {
        const start = touchX.current;
        const end = event.changedTouches[0]?.clientX;
        touchX.current = null;
        setPaused(false);
        if (start == null || end == null) return;
        const distance = end - start;
        if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
      }}
    >
      <div className="hero-carousel-stage">
        {slide.image ? (
          <img key={slide.id} className="visual-img hero-carousel-image" src={slide.image} alt={slide.alt || slide.title} />
        ) : (
          <div className="visual visual-mountain hero-carousel-image" aria-hidden="true"><span /></div>
        )}
      </div>
      <div className="hero-overlay">
        <span>{slide.tag}</span>
        <h1>{slide.title}</h1>
        <p>{slide.excerpt}</p>
        <Link href={slide.href}>বিস্তারিত পড়ুন →</Link>
      </div>

      {safeSlides.length > 1 && (
        <>
          <button className="hero-arrow hero-arrow-prev" onClick={() => move(-1)} aria-label="Previous news">‹</button>
          <button className="hero-arrow hero-arrow-next" onClick={() => move(1)} aria-label="Next news">›</button>
          <div className="hero-dots" aria-label="Featured news">
            {safeSlides.map((item, dotIndex) => (
              <button
                key={item.id}
                className={dotIndex === index ? "active" : ""}
                onClick={() => setIndex(dotIndex)}
                aria-label={`Show news ${dotIndex + 1}`}
              />
            ))}
          </div>
          <span className="hero-auto-state">{paused ? "Ⅱ" : "▶ 3s"}</span>
        </>
      )}
    </article>
  );
}
