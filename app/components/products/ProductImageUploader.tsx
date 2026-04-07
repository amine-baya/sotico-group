"use client";

type ProductImageUploaderProps = {
  label: string;
  imageUrls: string[];
  helpText?: string;
  onChange: (files: File[]) => void;
};

export function ProductImageUploader({
  label,
  imageUrls,
  helpText,
  onChange,
}: ProductImageUploaderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-600">{label}</label>
        <span className="text-xs text-slate-400">3 images required</span>
      </div>
      <label className="block rounded-2xl border border-dashed border-sky-300 bg-sky-50/60 p-5 transition hover:border-sky-400 hover:bg-sky-50">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm font-medium text-sky-800">
            Choose up to 3 images from your computer
          </p>
          <p className="text-xs text-slate-500">
            JPG, PNG, or WEBP. The first image becomes the main card image.
          </p>
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={(event) => {
            const files = Array.from(event.target.files ?? []).slice(0, 3);
            onChange(files);
          }}
        />
      </label>
      {helpText ? <p className="text-xs text-slate-400">{helpText}</p> : null}
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
          >
            <div className="flex h-40 items-center justify-center overflow-hidden bg-slate-100">
              {imageUrls[index] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrls[index]}
                  alt={`Product preview ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-sm text-slate-400">Image {index + 1}</span>
              )}
            </div>
            <div className="border-t border-slate-200 px-4 py-3 text-xs text-slate-500">
              {index === 0 ? "Main image" : `Gallery image ${index + 1}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
