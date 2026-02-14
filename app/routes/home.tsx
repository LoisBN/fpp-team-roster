import { players } from '~/data/players';
// TODO: Import the PlayerCard component once you create it
// import PlayerCard from '~/components/PlayerCard';

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">Your Challenge</h2>
        <ol className="text-gray-300 space-y-2 list-decimal list-inside">
          <li>Create a PlayerCard component that accepts props (name, position, number, team, imageUrl)</li>
          <li>Use TypeScript to define the component props interface</li>
          <li>Style the card nicely with Tailwind CSS</li>
          <li>Import the component in this file</li>
          <li>Use .map() to render all players as PlayerCard components</li>
          <li>Add a unique key prop to each card</li>
        </ol>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Team Roster</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* TODO: Uncomment this and replace with actual PlayerCard component usage
          {players.map((player) => (
            <PlayerCard key={player.id} {...player} />
          ))}
          */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
            <p className="text-gray-400">Create the PlayerCard component to see players here</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">Sample Data</h2>
        <p className="text-gray-300 mb-4">You have {players.length} players to display:</p>
        <pre className="bg-gray-900 p-4 rounded overflow-x-auto text-gray-300 text-sm">
          {JSON.stringify(players.slice(0, 2), null, 2)}...
        </pre>
      </div>
    </div>
  );
}