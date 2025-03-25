
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import MinecraftButton from './MinecraftButton';
import MinecraftSlider from './MinecraftSlider';
import { generateMultipleUUIDs, copyToClipboard } from '@/lib/uuidUtils';

const UuidGenerator: React.FC = () => {
  const [uuidCount, setUuidCount] = useState<number>(5);
  const [uuids, setUuids] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isLoadingAnimation, setIsLoadingAnimation] = useState<boolean>(false);

  // Generate UUIDs when component mounts
  useEffect(() => {
    handleGenerate();
  }, []);

  const handleGenerate = () => {
    // Don't proceed if we're already generating
    if (isGenerating) return;
    
    setIsGenerating(true);
    setIsLoadingAnimation(true);
    
    // Clear previous UUIDs with a slight delay for animation
    setTimeout(() => {
      const newUuids = generateMultipleUUIDs(uuidCount);
      setUuids(newUuids);
      
      // Short delay before removing loading state
      setTimeout(() => {
        setIsGenerating(false);
      }, 300);
      
      // Longer delay for pixel animation
      setTimeout(() => {
        setIsLoadingAnimation(false);
      }, 400);
    }, 300);
  };

  const handleCopyUuid = (uuid: string, index: number) => {
    copyToClipboard(uuid)
      .then(() => {
        toast.success(`UUID ${index + 1} copied!`);
      })
      .catch(() => {
        toast.error('Failed to copy');
      });
  };

  const handleCopyAll = () => {
    copyToClipboard(uuids.join('\n'))
      .then(() => {
        toast.success(`All ${uuids.length} UUIDs copied!`);
      })
      .catch(() => {
        toast.error('Failed to copy all UUIDs');
      });
  };

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto">
      <div className="bg-minecraft-dirt bg-repeat bg-opacity-90 p-6 pixel-border mb-6">
        <h2 className="font-minecraft text-lg sm:text-xl md:text-2xl mb-4 text-center text-white">
          Generate Version 4 UUIDs
        </h2>
        
        <div className="mb-6">
          <MinecraftSlider
            value={uuidCount}
            onChange={setUuidCount}
            min={1}
            max={100}
            label="Number of UUIDs"
            className="max-w-md mx-auto"
          />
        </div>
        
        <div className="flex justify-center gap-4">
          <MinecraftButton 
            onClick={handleGenerate} 
            disabled={isGenerating}
            className="w-40"
          >
            {isGenerating ? 'Mining...' : 'Generate'} 
          </MinecraftButton>
          
          <MinecraftButton
            onClick={handleCopyAll}
            variant="tertiary"
            disabled={uuids.length === 0 || isGenerating}
            className="w-40"
          >
            Copy All
          </MinecraftButton>
        </div>
      </div>
      
      <div className="bg-minecraft-stone bg-repeat p-4 pixel-border h-80 overflow-hidden">
        {isLoadingAnimation ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="font-minecraft text-xl animate-pulse-soft">
                Mining UUIDs...
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full overflow-y-auto minecraft-scrollbar px-2">
            {uuids.length > 0 ? (
              <div className="space-y-2">
                {uuids.map((uuid, index) => (
                  <div 
                    key={`${uuid}-${index}`} 
                    className="bg-black/30 p-3 pixel-border flex justify-between items-center opacity-0 animate-blocks-fall"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="font-minecraft text-xs sm:text-sm text-white break-all mr-2">
                      {uuid}
                    </span>
                    <MinecraftButton 
                      variant="secondary" 
                      size="sm" 
                      onClick={() => handleCopyUuid(uuid, index)}
                      className="min-w-[60px] whitespace-nowrap"
                    >
                      Copy
                    </MinecraftButton>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="font-minecraft text-white text-center">No UUIDs generated yet</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UuidGenerator;
