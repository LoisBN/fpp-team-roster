import TeamMemberPreview from './TeamMemberPreview';
import type { TeamMember as TeamMemberType } from '~/data/team';

interface LivePreviewProps {
  connectedProps: Partial<TeamMemberPreviewType>;
  showAllMembers: boolean;
  allMembers: TeamMemberType[];
  isComplete: boolean;
  onlineCount: number;
}

export default function LivePreview({
  connectedProps,
  showAllMembers,
  allMembers,
  isComplete,
  onlineCount
}: LivePreviewProps) {
  const hasAnyConnection = Object.keys(connectedProps).length > 0;

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden h-full flex flex-col">
      <div className="bg-gray-750 px-4 py-3 border-b border-gray-700 flex items-center justify-between">
        <span className="text-gray-300 font-medium">Live Preview</span>
        {isComplete && (
          <span className="text-green-400 text-sm flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            All connected!
          </span>
        )}
      </div>

      <div className="p-4 flex-1 overflow-auto">
        {!hasAnyConnection ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-gray-400 text-sm">
              Drag props to see the component render
            </p>
          </div>
        ) : showAllMembers ? (
          <div className="space-y-3">
            {/* Stats row */}
            <div className="bg-gray-900 rounded-lg p-3 flex items-center justify-between">
              <span className="text-gray-300 font-medium">Team Status</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-green-400 font-bold">{onlineCount}</span>
                <span className="text-gray-400">/ {allMembers.length} members online</span>
              </span>
            </div>

            <div className="grid gap-3 max-h-[350px] overflow-y-auto pr-2">
              {allMembers.map((member, index) => (
                <div key={member.id} className="animate-fadeIn" style={{ animationDelay: `${index * 50}ms` }}>
                  <TeamMemberPreview {...member} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <TeamMemberPreview {...connectedProps} />

            {isComplete && (
              <p className="text-center text-gray-400 text-sm">
                This is how one TeamMember renders with the connected props!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
