"use client";

import Image from "next/image";
import { imageAnalysis } from "./action";
import { useEffect, useState } from "react";

export default function ResultPanel({
  image,
  cleanTags,
  loading,
  error,
  setLoading,
  setError,
  setCleanTags
}: {
  image: File | null;
  cleanTags: boolean;
  loading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void; 
  setError: (error: string | null) => void; 
  setCleanTags: (clean: boolean) => void;
}) {
    
    const [ imageTags, setImageTags ] = useState<{ label: string; confidence: number }[]>([]);    
    
  const getUrlFromFile = (file: File) => {
    return URL.createObjectURL(file);
  };
  useEffect(() => {   
    if (cleanTags) {
      setImageTags([]);
    }
  }, [cleanTags]);  
  const proccessImage = async () => {
    if (image) {
      setLoading(true);
      setError(null);
      setImageTags([]);
     const resposeTags = await imageAnalysis(image);
     setLoading(false);  
     
     if (resposeTags && resposeTags.success === true ) {
      console.log(resposeTags.tags)
      setImageTags(resposeTags.tags);
     } else {
      setError(resposeTags.error || 'Error desconocido'); 
     }  
      setCleanTags(false);
    } else {
      setError("Por favor, sube una imagen primero.");
    } 
}
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl bg-gray-900/80 p-6 backdrop-blur-xl">
        {error && (
        <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500 p-4 text-sm text-red-500">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {!loading && <button 
              className="h-8 w-8 rounded-full bg-orange-500 ring-4 ring-orange-300 animate-pulse transition-all duration-200 hover:bg-orange-600 hover:scale-110" 
              onClick={proccessImage}>
            
            </button>}
            <span className="text-sm font-medium text-white">Analizar imagen</span>
          </div>
          <span className="text-xs text-gray-500">Open AI: gpt-4o</span>
        </div>

        {/* Loading bar */}
        {loading && (
          <div className="mb-6">
            <p className="mb-3 text-xs text-gray-400">Procesando imagen...</p>
            <div className="relative h-2 overflow-hidden rounded-full bg-gray-700">
              <div className="absolute h-full w-1/3 animate-slide bg-gradient-to-r from-purple-500 to-blue-500"></div>
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
              <div
                key={index}
                className="flex w-full items-center justify-between rounded-lg bg-gray-800/50 px-4 py-3 text-left text-sm text-gray-300 hover:bg-gray-800"
              >
                <span title="Label">{t.label}</span>
                <span title="confidence" className="text-white-500">{(t.confidence * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
