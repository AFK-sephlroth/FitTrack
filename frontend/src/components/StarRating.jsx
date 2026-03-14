import { useState } from "react";

const StarRating = ({ value, onChange }) => {
  const [hov, setHov] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          className={`text-2xl cursor-pointer transition-transform duration-150 select-none hover:scale-125 ${
            s <= (hov || value) ? "opacity-100" : "opacity-30 grayscale"
          }`}
          onMouseEnter={() => setHov(s)}
          onMouseLeave={() => setHov(0)}
          onClick={() => onChange(s)}
        >
          ⭐
        </span>
      ))}
      {value > 0 && (
        <span className="ml-2 text-sm font-bold text-orange-500">
          {value}/5
        </span>
      )}
    </div>
  );
};

export default StarRating;