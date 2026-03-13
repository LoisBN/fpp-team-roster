import { type DragEvent } from 'react';

interface PropChipProps {
  field: string;
  value: string | number | boolean;
  type: 'string' | 'number' | 'boolean';
  isConnected?: boolean;
}

export default function PropChip({ field, value, type, isConnected = false }: PropChipProps) {
  const typeColors = {
    string: 'bg-blue-500/20 border-blue-500 text-blue-300',
    number: 'bg-green-500/20 border-green-500 text-green-300',
    boolean: 'bg-purple-500/20 border-purple-500 text-purple-300'
  };
  const typeColor = typeColors[type];
  const connectedStyle = isConnected ? 'opacity-50 cursor-not-allowed' : 'cursor-grab active:cursor-grabbing hover:scale-105';

  function handleDragStart(e: DragEvent<HTMLDivElement>) {
    if (isConnected) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('application/json', JSON.stringify({ field, value, type }));
    e.dataTransfer.effectAllowed = 'copy';
    (e.target as HTMLElement).classList.add('opacity-50');
  }

  function handleDragEnd(e: DragEvent<HTMLDivElement>) {
    (e.target as HTMLElement).classList.remove('opacity-50');
  }

  const displayValue = typeof value === 'boolean'
    ? value.toString()
    : typeof value === 'string' && value.length > 20
      ? value.substring(0, 20) + '...'
      : String(value);

  const valueDisplay = typeof value === 'boolean'
    ? <span className={value ? 'text-green-400' : 'text-gray-400'}>{displayValue}</span>
    : <span className="text-white/90">"{displayValue}"</span>;

  return (
    <div
      draggable={!isConnected}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`
        inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-mono
        transition-all duration-200
        ${typeColor}
        ${connectedStyle}
      `}
    >
      <span className="font-semibold">{field}:</span>
      {valueDisplay}
      {isConnected && (
        <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
  );
}
