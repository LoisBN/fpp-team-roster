import { useRef, useCallback } from 'react';
import PropsPlayground from '~/components/PropsPlayground';
import TeamMember from '~/components/TeamMember';
import { team, countOnlineMembers } from '~/data/team';

export default function Home() {
  const onlineCount = countOnlineMembers(team);
  const challengeRef = useRef<HTMLDivElement>(null);

  const scrollToChallenge = useCallback(() => {
    challengeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className="space-y-12">
      {/* Section 1: Interactive Playground */}
      <PropsPlayground onTutorialComplete={scrollToChallenge} />

      {/* Section 2: Exercise Workspace */}
      <div ref={challengeRef} className="pt-8 scroll-mt-6">
        {/* Challenge Header */}
        <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl border border-purple-500/30 p-8 mb-8">
          <div className="text-center">
            <span className="inline-block px-4 py-1 bg-purple-600 text-white text-sm font-medium rounded-full mb-4">
              YOUR TURN
            </span>
            <h2 className="text-3xl font-bold text-white mb-3">Build the Component</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Now create the <code className="text-yellow-400 bg-gray-800 px-2 py-1 rounded">TeamMember</code> component yourself!
              Open <code className="text-blue-400 bg-gray-800 px-2 py-1 rounded">app/components/TeamMember.tsx</code> and prompt Claude Code.
            </p>
          </div>
        </div>

        {/* Challenge Cards */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Left: Instructions */}
          <div className="bg-gray-800 rounded-xl border-2 border-purple-500/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-sm font-bold">1</span>
              What to Build
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">◉</span>
                <span>Avatar image (rounded, with border)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">◉</span>
                <span>Status dot on avatar (<span className="text-green-400">green</span> = online, <span className="text-gray-400">gray</span> = offline)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">◉</span>
                <span>Name (bold, white text)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 mt-1">◉</span>
                <span>Role (smaller, gray text)</span>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-purple-900/30 border border-purple-500/30 rounded-lg">
              <p className="text-sm text-purple-300 mb-2 font-medium">💬 Example prompt for Claude:</p>
              <p className="text-sm text-white">
                "Create a TeamMember component that shows a rounded avatar with a status dot
                (green if online, gray if offline), the person's name and role. Use Tailwind CSS."
              </p>
            </div>
          </div>

          {/* Right: Key Concepts */}
          <div className="bg-gray-800 rounded-xl border-2 border-blue-500/50 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm">💡</span>
              Why This Matters
            </h3>
            <div className="space-y-4 text-gray-300">
              <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-500/20">
                <p className="font-medium text-blue-300">Reusability</p>
                <p className="text-sm text-gray-400 mt-1">
                  One component, 8 different team members. The component doesn't know who it's displaying -
                  it just receives props and renders them.
                </p>
              </div>
              <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-500/20">
                <p className="font-medium text-blue-300">Data-Driven UI</p>
                <p className="text-sm text-gray-400 mt-1">
                  Change the data array, and the UI updates automatically. Add a new team member?
                  Just add to the array - no component changes needed.
                </p>
              </div>
              <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-500/20">
                <p className="font-medium text-blue-300">Calculated Values</p>
                <p className="text-sm text-gray-400 mt-1">
                  The "{onlineCount} online" stat is calculated:
                  <code className="text-yellow-400 ml-1 text-xs">team.filter(m =&gt; m.isOnline).length</code>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Your Component Preview */}
        <div className="bg-gray-800 rounded-xl border-2 border-green-500/30 overflow-hidden">
          <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 px-6 py-4 border-b border-green-500/30 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-xs">✓</span>
              Your Component in Action
            </h3>
            <div className="flex items-center gap-2 text-sm bg-gray-900/50 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-green-400 font-medium">{onlineCount}</span>
              <span className="text-gray-400">/ {team.length} online</span>
            </div>
          </div>

          <div className="p-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {team.map((member) => (
                <TeamMember
                  key={member.id}
                  name={member.name}
                  role={member.role}
                  avatar={member.avatar}
                  isOnline={member.isOnline}
                />
              ))}
            </div>
          </div>

          <div className="px-6 py-4 bg-green-900/20 border-t border-green-500/30">
            <p className="text-sm text-green-300 text-center">
              👆 Once you build the TeamMember component, all {team.length} cards will display properly!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
