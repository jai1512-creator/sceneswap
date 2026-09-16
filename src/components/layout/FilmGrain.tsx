import React from 'react';

export const FilmGrain: React.FC = () => {
  return (
    <svg className="film-grain" aria-hidden="true">
      <filter id="film-noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#film-noise)" />
    </svg>
  );
};
