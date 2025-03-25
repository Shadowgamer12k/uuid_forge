
import React, { useState, useEffect } from 'react';
import { Copy, RotateCcw, Download } from 'lucide-react';
import { toast } from 'sonner';
import { generateMultipleUUIDs, copyToClipboard } from '@/lib/uuidUtils';

const Index = () => {
  const [uuidCount, setUuidCount] = useState<number>(5);
  const [uuids, setUuids] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  useEffect(() => {
    handleGenerate();
  }, []);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newUuids = generateMultipleUUIDs(uuidCount);
      setUuids(newUuids);
      setIsGenerating(false);
    }, 500);
  };

  const handleCopyUuid = (uuid: string) => {
    copyToClipboard(uuid)
      .then(() => toast.success('UUID copied to clipboard!'))
      .catch(() => toast.error('Failed to copy'));
  };

  const handleCopyAll = () => {
    copyToClipboard(uuids.join('\n'))
      .then(() => toast.success(`All ${uuids.length} UUIDs copied!`))
      .catch(() => toast.error('Failed to copy all UUIDs'));
  };

  const handleDownload = () => {
    const blob = new Blob([uuids.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'uuids.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('UUIDs downloaded successfully!');
  };

  return (
    <div className="min-h-screen bg-[#14191f] p-4 sm:p-8 flex flex-col">
      <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col">
        {/* Header with title */}
        <header className="relative mb-8 text-center">
          <div className="inline-block bg-minecraft-dirt pixel-border p-3 sm:p-4 relative z-10 transform rotate-[-1deg]">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-minecraft text-white tracking-wide">
              UUID Crafting Table
            </h1>
          </div>
          <div className="mt-2">
            <p className="font-minecraft text-gray-300 text-sm sm:text-base">Forge powerful Version 4 UUIDs in bulk</p>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex flex-col gap-6">
          {/* Controls */}
          <div className="bg-[#2d333b] p-4 sm:p-6 rounded-lg pixel-border border-black">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="w-full sm:w-1/2">
                <label className="block font-minecraft text-gray-300 mb-2">Number of UUIDs:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={uuidCount}
                    onChange={(e) => setUuidCount(parseInt(e.target.value))}
                    className="w-full h-5 appearance-none bg-minecraft-stone rounded-sm cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, 
                        #5D9C3B 0%, 
                        #5D9C3B ${uuidCount}%, 
                        #828282 ${uuidCount}%, 
                        #828282 100%)`
                    }}
                  />
                  <span className="font-minecraft bg-minecraft-stone px-3 py-1 text-white min-w-[40px] text-center">
                    {uuidCount}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-2 sm:gap-4 flex-wrap justify-center sm:justify-end mt-4 sm:mt-0">
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="bg-minecraft-grass font-minecraft text-white px-4 py-2 pixel-button flex items-center gap-2"
                >
                  <RotateCcw size={16} />
                  {isGenerating ? 'Mining...' : 'Generate'}
                </button>
                <button 
                  onClick={handleCopyAll}
                  disabled={uuids.length === 0}
                  className="bg-minecraft-stone font-minecraft text-white px-4 py-2 pixel-button flex items-center gap-2"
                >
                  <Copy size={16} />
                  Copy All
                </button>
                <button 
                  onClick={handleDownload}
                  disabled={uuids.length === 0}
                  className="bg-minecraft-wood font-minecraft text-white px-4 py-2 pixel-button flex items-center gap-2"
                >
                  <Download size={16} />
                  Download
                </button>
              </div>
            </div>
          </div>

          {/* UUID Display */}
          <div className="bg-[#1e2329] pixel-border border-black rounded-md flex-1 overflow-hidden">
            <div className="h-full p-4 overflow-y-auto minecraft-scrollbar">
              {isGenerating ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="inline-block relative w-16 h-16">
                      <div className="absolute top-0 left-0 w-full h-full">
                        <div className="pixelated bg-minecraft-dirt w-4 h-4 absolute animate-bounce" style={{ animationDelay: '0ms', left: '6px', top: '6px' }}></div>
                        <div className="pixelated bg-minecraft-stone w-4 h-4 absolute animate-bounce" style={{ animationDelay: '150ms', left: '6px', bottom: '6px' }}></div>
                        <div className="pixelated bg-minecraft-grass w-4 h-4 absolute animate-bounce" style={{ animationDelay: '300ms', right: '6px', top: '6px' }}></div>
                        <div className="pixelated bg-minecraft-wood w-4 h-4 absolute animate-bounce" style={{ animationDelay: '450ms', right: '6px', bottom: '6px' }}></div>
                      </div>
                    </div>
                    <p className="font-minecraft text-gray-300 mt-4">Mining UUIDs...</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {uuids.length > 0 ? (
                    uuids.map((uuid, index) => (
                      <div 
                        key={`${uuid}-${index}`} 
                        className="group bg-[#262c35] hover:bg-[#2d333b] p-4 rounded border-2 border-gray-800 flex justify-between items-center transition-all"
                      >
                        <div className="font-minecraft text-xs sm:text-sm text-gray-300 break-all mr-2 select-all">
                          {uuid}
                        </div>
                        <button 
                          onClick={() => handleCopyUuid(uuid)}
                          className="bg-minecraft-stone hover:bg-minecraft-stone/80 text-white p-1 sm:p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Copy UUID"
                        >
                          <Copy size={16} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="font-minecraft text-gray-400">Generate some UUIDs to see them here</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>

        <footer className="mt-8 text-center">
          <p className="font-minecraft text-gray-500 text-xs">
            Built with blocks and bytes • v1.0
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
