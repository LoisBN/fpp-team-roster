import type { TeamMember } from '~/data/team';
import PropChip from './PropChip';

interface DataSourceCardProps {
  member: TeamMember;
  memberIndex: number;
  connectedFields: string[];
  onSelectMember?: (index: number) => void;
  totalMembers: number;
  selectedIndex: number;
}

export default function DataSourceCard({
  member,
  memberIndex,
  connectedFields,
  onSelectMember,
  totalMembers,
  selectedIndex
}: DataSourceCardProps) {
  const props: { field: keyof TeamMember; type: 'string' | 'number' | 'boolean' }[] = [
    { field: 'name', type: 'string' },
    { field: 'role', type: 'string' },
    { field: 'avatar', type: 'string' },
    { field: 'isOnline', type: 'boolean' }
  ];

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      <div className="bg-gray-750 px-4 py-3 border-b border-gray-700 flex items-center justify-between">
        <div>
          <span className="text-gray-400 text-sm font-mono">team[</span>
          <span className="text-yellow-400 font-mono font-bold">{memberIndex}</span>
          <span className="text-gray-400 text-sm font-mono">]</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectMember?.(Math.max(0, selectedIndex - 1))}
            disabled={selectedIndex === 0}
            className="p-1 rounded hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-gray-500 text-sm">
            {selectedIndex + 1} / {totalMembers}
          </span>
          <button
            onClick={() => onSelectMember?.(Math.min(totalMembers - 1, selectedIndex + 1))}
            disabled={selectedIndex === totalMembers - 1}
            className="p-1 rounded hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <p className="text-gray-400 text-sm mb-3">
          Drag these props to the component slots below:
        </p>

        <div className="flex flex-wrap gap-2">
          {props.map(({ field, type }) => (
            <PropChip
              key={field}
              field={field}
              value={member[field]}
              type={type}
              isConnected={connectedFields.includes(field)}
            />
          ))}
        </div>
      </div>

      <div className="px-4 py-2 bg-gray-900/50 border-t border-gray-700">
        <p className="text-xs text-gray-500">
          <span className="text-blue-400">string</span> = text &nbsp;|&nbsp;
          <span className="text-purple-400">boolean</span> = true/false
        </p>
      </div>
    </div>
  );
}
