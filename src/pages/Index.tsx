
import React from 'react';
import UuidGenerator from '@/components/UuidGenerator';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black relative px-4 py-10">
      {/* Minecraft-style background overlay */}
      <div 
        className="absolute inset-0 bg-minecraft-stone bg-repeat opacity-30 z-0"
        style={{ imageRendering: 'pixelated' }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center">
        <header className="text-center mb-10 mt-4 animate-pixelate-in">
          <div className="mb-2">
            <div className="inline-block bg-minecraft-dirt pixel-border p-3 md:p-4 rotate-[-1deg] animate-float">
              <h1 className="font-minecraft text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white tracking-wide">
                Block UUID Factory
              </h1>
            </div>
          </div>
          
          <div className="max-w-xl mx-auto px-4">
            <p className="font-pixelify text-sm sm:text-base md:text-lg text-white text-opacity-90">
              Craft your UUIDs in bulk - Minecraft style!
            </p>
          </div>
        </header>
        
        <main className="w-full max-w-4xl mx-auto">
          <UuidGenerator />
        </main>
        
        <footer className="mt-16 text-center">
          <div className="inline-block bg-minecraft-stone/70 pixel-border p-3 font-minecraft text-xs text-white">
            <p>© Built with blocks and bytes</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
