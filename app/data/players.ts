export interface Player {
  id: number;
  name: string;
  position: string;
  number: number;
  team: string;
  imageUrl: string;
}

export const players: Player[] = [
  {
    id: 1,
    name: 'Alex Johnson',
    position: 'Forward',
    number: 7,
    team: 'Blue Team',
    imageUrl: 'https://via.placeholder.com/150?text=Alex+Johnson'
  },
  {
    id: 2,
    name: 'Sarah Chen',
    position: 'Midfielder',
    number: 5,
    team: 'Blue Team',
    imageUrl: 'https://via.placeholder.com/150?text=Sarah+Chen'
  },
  {
    id: 3,
    name: 'Marcus Brown',
    position: 'Defender',
    number: 3,
    team: 'Blue Team',
    imageUrl: 'https://via.placeholder.com/150?text=Marcus+Brown'
  },
  {
    id: 4,
    name: 'Emma Davis',
    position: 'Goalkeeper',
    number: 1,
    team: 'Red Team',
    imageUrl: 'https://via.placeholder.com/150?text=Emma+Davis'
  },
  {
    id: 5,
    name: 'James Wilson',
    position: 'Forward',
    number: 10,
    team: 'Red Team',
    imageUrl: 'https://via.placeholder.com/150?text=James+Wilson'
  },
  {
    id: 6,
    name: 'Lisa Martinez',
    position: 'Defender',
    number: 4,
    team: 'Red Team',
    imageUrl: 'https://via.placeholder.com/150?text=Lisa+Martinez'
  }
];