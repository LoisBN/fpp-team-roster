interface PlayerCardProps {
  name?: string;
  position?: string;
  number?: number;
  team?: string;
  imageUrl?: string;
}

export default function PlayerCard({
  name = '???',
  position = '???',
  number,
  team = '???',
  imageUrl
}: PlayerCardProps) {
  const teamColor = team === 'Blue Team' ? 'bg-blue-600' : team === 'Red Team' ? 'bg-red-600' : 'bg-gray-600';

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
      <div className={`${teamColor} h-2`} />

      <div className="p-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center">
                <span className="text-gray-500 text-2xl">?</span>
              </div>
            )}
            {number !== undefined && (
              <span className="absolute -bottom-1 -right-1 bg-gray-900 text-white text-xs font-bold px-2 py-0.5 rounded-full border border-gray-600">
                #{number}
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white truncate">{name}</h3>
            <p className="text-gray-400 text-sm">{position}</p>
            <p className="text-gray-500 text-xs mt-1">{team}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
