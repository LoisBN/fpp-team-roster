// ============================================
// EXERCISE: Create the TeamMember component
// ============================================
//
// Use Claude Code to build this component!
//
// PROPS NEEDED:
//   - name: string      → Person's name
//   - role: string      → Job title
//   - avatar: string    → Image URL
//   - isOnline: boolean → Green dot if true, gray if false
//
// WHAT TO BUILD:
//   - Avatar image (rounded)
//   - Status dot on the avatar (green=online, gray=offline)
//   - Name (bold)
//   - Role (smaller, gray text)
//
// EXAMPLE PROMPT FOR CLAUDE:
//   "Create a TeamMember component that shows a rounded
//    avatar with a status dot (green if online, gray if
//    offline), the person's name and role. Use Tailwind."
//
// ============================================

interface TeamMemberProps {
  name: string;
  role: string;
  avatar: string;
  isOnline: boolean;
}

export default function TeamMember({ name, role, avatar, isOnline }: TeamMemberProps) {
  // TODO: Replace this placeholder with your component!
  // Use the playground above to understand what props you receive

  return (
    <div className="flex items-center gap-4 bg-gray-800 rounded-xl p-4 border border-dashed border-gray-600">
      {/* Placeholder - replace with your implementation */}
      <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-2xl">
        🎯
      </div>
      <div>
        <p className="text-white font-medium">Create this component!</p>
        <p className="text-gray-500 text-sm">Prompt Claude Code with the hints above</p>
      </div>
    </div>
  );
}
