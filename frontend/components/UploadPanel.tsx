"use client";

import { useRef } from "react";

export default function UploadPanel({
  loading,
  setImage, 
  setCleanTags, 
  setError,
  }: {
  loading: boolean; 
  setImage: (file: File | null) => void;
  setCleanTags: (clean: boolean) => void;
  setError: (error: string | null) => void;
} ) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const cleanImage = () => {
    setImage(null);
    setCleanTags(true);
    setError(null);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCleanTags(true);
      setImage(file);
      setError(null);
    }

    
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <button
        className="rounded-full bg-white px-8 py-3 font-medium text-gray-900 hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
        onClick={handleUploadClick}
        disabled={loading}
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
      <button
        className="rounded-full bg-black px-8 py-3 font-medium text-white hover:bg-white-100 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
        onClick={cleanImage}
        disabled={loading}
      >
        Limpiar
      </button>
    </div>
  );
}
