"use client";

import { productColorOptions } from "./options";
import { AdminColor } from "./types";

type ProductColorSelectorProps = {
  selectedColors: AdminColor[];
  onToggle: (color: AdminColor) => void;
};

export function ProductColorSelector({
  selectedColors,
  onToggle,
}: ProductColorSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-slate-600">Colors</label>
      <div className="flex flex-wrap gap-3">
        {productColorOptions.map((color) => {
          const isActive = selectedColors.some((item) => item.id === color.id);

          return (
            <button
              key={color.id}
              type="button"
              onClick={() => onToggle(color)}
              className={`group inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "border-sky-600 bg-sky-50 text-sky-900"
                  : "border-slate-200 bg-white text-slate-600 hover:border-sky-300"
              }`}
            >
              <span
                className="h-5 w-5 rounded-full border border-slate-300"
                style={{ backgroundColor: color.hex }}
              />
              {color.name.en}
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        {selectedColors.map((color) => (
          <span
            key={color.id}
            className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
          >
            <span
              className="h-3 w-3 rounded-full border border-slate-300"
              style={{ backgroundColor: color.hex }}
            />
            {color.name.en}
          </span>
        ))}
      </div>
    </div>
  );
}
