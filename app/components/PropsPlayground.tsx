import { useState, useCallback } from 'react';
import { team, countOnlineMembers, type TeamMember } from '~/data/team';
import StepIndicator from './StepIndicator';
import DataSourceCard from './DataSourceCard';
import ComponentDropZone from './ComponentDropZone';
import LivePreview from './LivePreview';

interface Connection {
  field: string;
  value: string | number | boolean;
}

interface PropsPlaygroundProps {
  onTutorialComplete?: () => void;
}

const STEPS = [
  { number: 1, title: 'See the Data', description: 'Explore the team data available' },
  { number: 2, title: 'Connect Props', description: 'Drag props to their slots' },
  { number: 3, title: 'See Result', description: 'Watch the component render' }
];

const PROP_SLOTS = [
  { name: 'name', expectedType: 'string' as const },
  { name: 'role', expectedType: 'string' as const },
  { name: 'avatar', expectedType: 'string' as const },
  { name: 'isOnline', expectedType: 'boolean' as const }
];

export default function PropsPlayground({ onTutorialComplete }: PropsPlaygroundProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(0);
  const [connections, setConnections] = useState<Record<string, Connection>>({});
  const [showAllMembers, setShowAllMembers] = useState(false);

  const selectedMember = team[selectedMemberIndex];
  const connectedFields = Object.values(connections).map((c) => c.field);
  const isComplete = PROP_SLOTS.every((slot) => connections[slot.name]);
  const onlineCount = countOnlineMembers(team);

  const handleDrop = useCallback((slotName: string, field: string, value: string | number | boolean) => {
    setConnections((prev) => ({
      ...prev,
      [slotName]: { field, value }
    }));

    // Auto-advance to step 2 on first connection
    if (currentStep === 1) {
      setCurrentStep(2);
    }
  }, [currentStep]);

  // Check if all props connected after state update
  const allConnectedCount = Object.keys(connections).length;
  if (allConnectedCount === PROP_SLOTS.length && currentStep === 2) {
    setTimeout(() => setCurrentStep(3), 300);
  }

  const handleRemove = useCallback((slotName: string) => {
    setConnections((prev) => {
      const next = { ...prev };
      delete next[slotName];
      return next;
    });
    setShowAllMembers(false);
  }, []);

  const handleReset = useCallback(() => {
    setConnections({});
    setShowAllMembers(false);
    setCurrentStep(1);
  }, []);

  const connectedProps: Partial<TeamMember> = {};
  for (const [slotName, connection] of Object.entries(connections)) {
    (connectedProps as Record<string, string | number | boolean>)[slotName] = connection.value;
  }

  const slots = PROP_SLOTS.map((slot) => ({
    ...slot,
    value: connections[slot.name]?.value,
    sourceField: connections[slot.name]?.field
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Props Playground</h2>
        <p className="text-gray-400">
          Learn how data flows from parent to child components in React
        </p>
      </div>

      {/* Step Indicator */}
      <StepIndicator
        currentStep={currentStep}
        steps={STEPS}
        onStepClick={setCurrentStep}
      />

      {/* Step Content */}
      <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700">
        {/* Step 1: See the Data */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">Step 1: See the Data</h3>
              <p className="text-gray-400">
                This is your <code className="text-yellow-400 bg-gray-800 px-2 py-0.5 rounded">team</code> array with {team.length} members.
                Each member has props like name, role, avatar, and isOnline status.
              </p>
            </div>

            <DataSourceCard
              member={selectedMember}
              memberIndex={selectedMemberIndex}
              connectedFields={connectedFields}
              onSelectMember={setSelectedMemberIndex}
              totalMembers={team.length}
              selectedIndex={selectedMemberIndex}
            />

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h4 className="text-white font-medium mb-2">What you'll build:</h4>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• A <code className="text-yellow-400">TeamMember</code> component with avatar, name, role, and status dot</li>
                <li>• Map through the team array to render all members</li>
                <li>• Show a stats row: <span className="text-green-400">{onlineCount} members online</span></li>
              </ul>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                Continue to Connect Props
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Connect Props */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-white mb-2">Step 2: Connect the Props</h3>
              <p className="text-gray-400">
                Drag each property from the data to its matching slot in the component
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <DataSourceCard
                  member={selectedMember}
                  memberIndex={selectedMemberIndex}
                  connectedFields={connectedFields}
                  onSelectMember={setSelectedMemberIndex}
                  totalMembers={team.length}
                  selectedIndex={selectedMemberIndex}
                />

                <div className="flex justify-center">
                  <svg className="w-8 h-8 text-purple-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>

                <ComponentDropZone
                  slots={slots}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                />
              </div>

              <LivePreview
                connectedProps={connectedProps}
                showAllMembers={false}
                allMembers={team}
                isComplete={isComplete}
                onlineCount={onlineCount}
              />
            </div>

            {isComplete && (
              <div className="flex justify-center">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium transition-colors flex items-center gap-2 animate-pulse"
                >
                  See the Final Result
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 3: See Result */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-white mb-2">Step 3: See the Result!</h3>
              <p className="text-gray-400">
                You've connected all the props. Now see how <code className="text-yellow-400 bg-gray-800 px-2 py-0.5 rounded">.map()</code> renders all team members!
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
                  <h4 className="text-white font-medium mb-3">How it works in code:</h4>
                  <pre className="text-sm overflow-x-auto p-4 bg-gray-900 rounded-lg">
                    <code className="text-gray-300">
                      <span className="text-gray-500">{'// Calculate online count'}</span>{'\n'}
                      <span className="text-purple-400">const</span> onlineCount = team.<span className="text-yellow-400">filter</span>(<span className="text-orange-400">m</span> {'=>'} m.isOnline).<span className="text-blue-400">length</span>;{'\n\n'}
                      <span className="text-gray-500">{'// Render stats'}</span>{'\n'}
                      <span className="text-blue-400">&lt;p&gt;</span><span className="text-purple-400">{'{'}</span>onlineCount<span className="text-purple-400">{'}'}</span> members online<span className="text-blue-400">&lt;/p&gt;</span>{'\n\n'}
                      <span className="text-gray-500">{'// Map through team'}</span>{'\n'}
                      <span className="text-purple-400">{'{'}</span>team.<span className="text-yellow-400">map</span><span className="text-purple-400">{'('}</span><span className="text-orange-400">(member)</span> {'=>'} <span className="text-purple-400">{'('}</span>{'\n'}
                      {'  '}<span className="text-blue-400">&lt;TeamMember</span>{'\n'}
                      {'    '}<span className="text-green-400">key</span>=<span className="text-purple-400">{'{'}</span>member.id<span className="text-purple-400">{'}'}</span>{'\n'}
                      {'    '}<span className="text-green-400">name</span>=<span className="text-purple-400">{'{'}</span>member.name<span className="text-purple-400">{'}'}</span>{'\n'}
                      {'    '}<span className="text-green-400">role</span>=<span className="text-purple-400">{'{'}</span>member.role<span className="text-purple-400">{'}'}</span>{'\n'}
                      {'    '}<span className="text-green-400">avatar</span>=<span className="text-purple-400">{'{'}</span>member.avatar<span className="text-purple-400">{'}'}</span>{'\n'}
                      {'    '}<span className="text-green-400">isOnline</span>=<span className="text-purple-400">{'{'}</span>member.isOnline<span className="text-purple-400">{'}'}</span>{'\n'}
                      {'  '}<span className="text-blue-400">/&gt;</span>{'\n'}
                      <span className="text-purple-400">{'))'}</span>
                    </code>
                  </pre>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => setShowAllMembers(!showAllMembers)}
                    className={`
                      px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2
                      ${showAllMembers
                        ? 'bg-gray-700 hover:bg-gray-600 text-white'
                        : 'bg-purple-600 hover:bg-purple-500 text-white'
                      }
                    `}
                  >
                    {showAllMembers ? 'Show Single Card' : `Map All ${team.length} Members`}
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>

                  <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Start Over
                  </button>
                </div>
              </div>

              <LivePreview
                connectedProps={connectedProps}
                showAllMembers={showAllMembers}
                allMembers={team}
                isComplete={isComplete}
                onlineCount={onlineCount}
              />
            </div>

            {showAllMembers && (
              <div className="bg-green-900/30 border border-green-700 rounded-xl p-6 text-center animate-fadeIn">
                <p className="text-green-300 font-medium text-lg">
                  🎉 You understand how props flow in React!
                </p>
                <p className="text-green-400/80 text-sm mt-2 mb-4">
                  The parent passes data as props, each child renders with its own values, and you can calculate stats from the data.
                </p>
                <button
                  onClick={onTutorialComplete}
                  className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-medium transition-all hover:scale-105 flex items-center gap-2 mx-auto"
                >
                  Now Build It Yourself!
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
