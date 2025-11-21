"use client";

import Image from "next/image";
import { imageAnalysis } from "./action";
import { useState } from "react";

export default function ResultPanel({
  loading,
  image,
}: {
  loading: boolean;
  preview?: string;
  image: File | null;
}) {
    const [ imageTags, setImageTags ] = useState<{ label: string; confidence: number }[]>([]);    
    const [ error, setError ] = useState<string | null>(null);  
  const getUrlFromFile = (file: File) => {
    return URL.createObjectURL(file);
  };
  const proccessImage = async () => {
    if (image) {
     const resposeTags = await imageAnalysis(image);
     if (resposeTags && resposeTags.success === true ) {
      console.log(resposeTags.tags)
      setImageTags(resposeTags.tags);
     } else {
      setError(resposeTags.error || 'Error desconocido'); 
     }  
      
    }
}
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl bg-gray-900/80 p-6 backdrop-blur-xl">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              className="h-8 w-8 rounded-full bg-orange-500 ring-4 ring-orange-300 animate-pulse transition-all duration-200 hover:bg-orange-600 hover:scale-110" 
 
   onClick={proccessImage}>

            </button>
            <span className="text-sm font-medium text-white">Analizar imagen</span>
          </div>
          <span className="text-xs text-gray-500">Open AI: gpt-4o</span>
        </div>

        {/* Loading bar */}
        {loading && (
          <div className="mb-6">
            <p className="mb-3 text-xs text-gray-500">Procesando...</p>
            <div className="h-2 overflow-hidden rounded-full bg-gray-700">
              <div className="h-full w-3/4 animate-pulse bg-gradient-to-r from-purple-500 to-blue-500"></div>
            </div>
          </div>
        )}

        {/* Image Preview */}
        {image  && (
          <div className="mb-6 overflow-hidden rounded-2xl">
            <Image
              src={getUrlFromFile(image)}
              alt="Preview"
              width={600}
              height={400}
              className="h-64 w-full object-cover"
            />
          </div>
        )}

        {/* Tags */}
        {imageTags.length > 0 && (
          <div className="space-y-2">
            {imageTags.map((t, index) => (
              <button
                key={index}
                className="flex w-full items-center justify-between rounded-lg bg-gray-800/50 px-4 py-3 text-left text-sm text-gray-300 hover:bg-gray-800"
              >
                <span>{t.label}</span>
                <span className="text-gray-500">{(t.confidence * 100).toFixed(1)}%</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
