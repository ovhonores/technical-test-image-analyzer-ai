'use client';
import ResultPanel from "@/components/ResultPanel";
import UploadPanel from "@/components/UploadPanel";
import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-teal-500 via-purple-600 to-purple-900 font-sans">
      {/* Header */}
      <header className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
            <span className="text-xl">🤖</span>
          </div>
          <span className="text-lg font-semibold text-white">IMAGE ANALYZER</span>
        </div>
        
       
      </header>

      {/* Main Content */}
      <main className="flex min-h-screen items-center px-8 py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16">
          
          {/* Left Column - Hero Text */}
          <div className="flex flex-col  space-y-8">
            <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Sube una imagen 
              <br />
              para analizarla con IA
              <br />
            </h1>
            <UploadPanel setImage={setImage} />
          </div>

          {/* Right Column - IMAGE ANALYZER */}
          <ResultPanel loading={false} image={image}  />
        </div>
      </main>
    </div>
  );
}