export interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  isOnline: boolean;
}

export const team: TeamMember[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Engineering Lead',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    isOnline: true
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    role: 'Senior Developer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    isOnline: true
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Product Designer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    isOnline: false
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Backend Developer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    isOnline: true
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'DevOps Engineer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    isOnline: false
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'Frontend Developer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    isOnline: true
  },
  {
    id: 7,
    name: 'Nina Patel',
    role: 'QA Engineer',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    isOnline: true
  },
  {
    id: 8,
    name: 'Alex Turner',
    role: 'Junior Developer',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&crop=face',
    isOnline: false
  }
];

// Helper function to count online members
export function countOnlineMembers(members: TeamMember[]): number {
  return members.filter(member => member.isOnline).length;
}
