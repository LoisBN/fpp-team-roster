// Internal preview component for the playground
// Students will create their own version in TeamMember.tsx

interface TeamMemberPreviewProps {
  name?: string;
  role?: string;
  avatar?: string;
  isOnline?: boolean;
}

export default function TeamMemberPreview({
  name = '???',
  role = '???',
  avatar,
  isOnline = false
}: TeamMemberPreviewProps) {
  return (
    <div className="flex items-center gap-4 bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="relative flex-shrink-0">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center">
            <span className="text-gray-500 text-lg">?</span>
          </div>
        )}
        <span
          className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-gray-800 ${
            isOnline ? 'bg-green-500' : 'bg-gray-500'
          }`}
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-white font-medium truncate">{name}</h3>
        <p className="text-gray-400 text-sm truncate">{role}</p>
      </div>
    </div>
  );
}
