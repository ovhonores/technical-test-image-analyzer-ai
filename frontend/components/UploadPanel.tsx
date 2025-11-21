"use client";

import { useRef } from "react";

export default function UploadPanel({setImage }: {
  setImage: (file: File) => void;
} ) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);

    
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <button
        className="rounded-full bg-white px-8 py-3 font-medium text-gray-900 hover:bg-gray-100"
        onClick={handleUploadClick}
      >
        Upload
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
