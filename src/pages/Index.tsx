
import React, { useState, useEffect } from 'react';
import { Copy, RotateCcw, Download } from 'lucide-react';
import { toast } from 'sonner';
import { generateMultipleUUIDs, copyToClipboard } from '@/lib/uuidUtils';
import MinecraftSlider from '@/components/MinecraftSlider';

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
    <div className="min-h-screen bg-[#191919] p-4 sm:p-8">
      <div className="w-full max-w-4xl mx-auto flex flex-col h-screen">
        {/* Header with title - Bedrock Style */}
        <header className="mb-6 text-center">
          <div className="bg-[#242424] py-4 px-6 bedrock-panel">
            <h1 className="text-3xl md:text-4xl font-minecraft text-white tracking-wide mb-2">
              UUID Generator
            </h1>
            <p className="font-minecraft text-[#AAAAAA] text-sm">
              Generate Version 4 UUIDs in Bedrock Style
            </p>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex flex-col gap-6">
          {/* Controls Panel - Bedrock Style */}
          <div className="bg-[#242424] p-4 sm:p-6 bedrock-panel">
            <div className="flex flex-col gap-8">
              {/* Slider Control */}
              <div className="w-full">
                <MinecraftSlider
                  value={uuidCount}
                  onChange={setUuidCount}
                  min={1}
                  max={100}
                  label="Number of UUIDs"
                />
              </div>
              
              {/* Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="bedrock-button bg-[#3F8F41] min-w-[120px]"
                >
                  <div className="flex items-center justify-center gap-2">
                    <RotateCcw size={16} />
                    <span>{isGenerating ? 'Generating...' : 'Generate'}</span>
                  </div>
                </button>
                
                <button 
                  onClick={handleCopyAll}
                  disabled={uuids.length === 0}
                  className="bedrock-button bg-[#546574] min-w-[120px]"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Copy size={16} />
                    <span>Copy All</span>
                  </div>
                </button>
                
                <button 
                  onClick={handleDownload}
                  disabled={uuids.length === 0}
                  className="bedrock-button bg-[#795830] min-w-[120px]"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Download size={16} />
                    <span>Download</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* UUID Display - Bedrock Style */}
          <div className="bg-[#242424] flex-1 bedrock-panel overflow-hidden flex flex-col">
            <div className="p-2 bg-[#141414] font-minecraft text-white text-center">
              Generated UUIDs
            </div>
            
            <div className="flex-1 p-2 overflow-y-auto bedrock-scrollbar">
              {isGenerating ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="bedrock-loading-spinner" />
                    <p className="font-minecraft text-gray-300 mt-4">Generating UUIDs...</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {uuids.length > 0 ? (
                    uuids.map((uuid, index) => (
                      <div 
                        key={`${uuid}-${index}`} 
                        className="bedrock-list-item group"
                      >
                        <div className="font-minecraft text-sm text-gray-300 break-all mr-2">
                          {uuid}
                        </div>
                        <button 
                          onClick={() => handleCopyUuid(uuid)}
                          className="bedrock-icon-button"
                          aria-label="Copy UUID"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="font-minecraft text-gray-400">Click Generate to create UUIDs</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>

        <footer className="mt-4 text-center">
          <p className="font-minecraft text-gray-500 text-xs">
            Minecraft Bedrock Style • UUID Generator
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
