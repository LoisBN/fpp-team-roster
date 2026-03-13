import { useState, type DragEvent } from 'react';

interface PropSlot {
  name: string;
  expectedType: 'string' | 'number' | 'boolean';
  value?: string | number | boolean;
  sourceField?: string;
}

interface ComponentDropZoneProps {
  slots: PropSlot[];
  onDrop: (slotName: string, field: string, value: string | number | boolean) => void;
  onRemove: (slotName: string) => void;
}

function DropSlot({
  slot,
  onDrop,
  onRemove
}: {
  slot: PropSlot;
  onDrop: (field: string, value: string | number | boolean) => void;
  onRemove: () => void;
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isWrongType, setIsWrongType] = useState(false);

  const typeColors = {
    string: { border: 'border-blue-500 bg-blue-500/10', filled: 'border-blue-400 bg-blue-500/30' },
    number: { border: 'border-green-500 bg-green-500/10', filled: 'border-green-400 bg-green-500/30' },
    boolean: { border: 'border-purple-500 bg-purple-500/10', filled: 'border-purple-400 bg-purple-500/30' }
  };

  const typeColor = typeColors[slot.expectedType].border;
  const filledColor = typeColors[slot.expectedType].filled;

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
  }

  function handleDragLeave() {
    setIsDragOver(false);
    setIsWrongType(false);
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
    setIsWrongType(false);

    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      if (data.type !== slot.expectedType) {
        setIsWrongType(true);
        setTimeout(() => setIsWrongType(false), 1000);
        return;
      }
      onDrop(data.field, data.value);
    } catch {
      // Invalid data
    }
  }

  const isFilled = slot.value !== undefined;

  const displayValue = typeof slot.value === 'boolean'
    ? slot.value.toString()
    : typeof slot.value === 'string' && slot.value.length > 12
      ? slot.value.substring(0, 12) + '...'
      : slot.value;

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs text-gray-500 font-mono">{slot.name}</span>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={isFilled ? onRemove : undefined}
        className={`
          relative min-w-[80px] h-10 rounded-lg border-2 border-dashed
          flex items-center justify-center px-3
          transition-all duration-200
          ${isFilled ? filledColor + ' border-solid cursor-pointer hover:opacity-80' : typeColor}
          ${isDragOver && !isWrongType ? 'scale-110 border-solid shadow-lg' : ''}
          ${isWrongType ? 'border-red-500 bg-red-500/20 animate-shake' : ''}
        `}
      >
        {isFilled ? (
          <div className="flex items-center gap-1">
            <span className={`text-sm font-mono truncate max-w-[100px] ${
              typeof slot.value === 'boolean'
                ? slot.value ? 'text-green-400' : 'text-gray-400'
                : 'text-white'
            }`}>
              {displayValue}
            </span>
            <svg className="w-3 h-3 text-gray-400 hover:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        ) : (
          <span className="text-xs text-gray-500">{slot.expectedType}</span>
        )}

        {isDragOver && !isFilled && (
          <div className="absolute inset-0 rounded-lg animate-pulse bg-white/10" />
        )}
      </div>
    </div>
  );
}

export default function ComponentDropZone({ slots, onDrop, onRemove }: ComponentDropZoneProps) {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      <div className="bg-gray-750 px-4 py-3 border-b border-gray-700">
        <span className="text-purple-400 font-mono">&lt;</span>
        <span className="text-yellow-300 font-mono font-bold">TeamMember</span>
        <span className="text-purple-400 font-mono">&gt;</span>
      </div>

      <div className="p-4">
        <p className="text-gray-400 text-sm mb-4">
          Drop matching props into each slot:
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          {slots.map((slot) => (
            <DropSlot
              key={slot.name}
              slot={slot}
              onDrop={(field, value) => onDrop(slot.name, field, value)}
              onRemove={() => onRemove(slot.name)}
            />
          ))}
        </div>
      </div>

      <div className="px-4 py-2 bg-gray-900/50 border-t border-gray-700">
        <p className="text-xs text-gray-500 text-center">
          Click a filled slot to remove it
        </p>
      </div>
    </div>
  );
}
