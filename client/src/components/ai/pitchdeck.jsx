import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PitchDeckView({ data }) {
  const [index, setIndex] = useState(0);
  if (!data?.slides?.length) return null;

  const slide = data.slides[index];

  return (
    <div>
      <div className="flex aspect-video flex-col justify-center rounded-2xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 p-10 text-white shadow-glow">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-200">
          Slide {index + 1} of {data.slides.length}
        </p>
        <h3 className="mt-2 font-display text-3xl font-bold">{slide.title}</h3>
        <p className="mt-4 max-w-2xl text-brand-50">{slide.content}</p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="btn-secondary"
        >
          <ChevronLeft className="h-4 w-4" /> Prev
        </button>
        <div className="flex gap-1.5">
          {data.slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-brand-600' : 'w-1.5 bg-gray-200'}`}
            />
          ))}
        </div>
        <button
          onClick={() => setIndex((i) => Math.min(data.slides.length - 1, i + 1))}
          disabled={index === data.slides.length - 1}
          className="btn-secondary"
        >
          Next <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
