export interface Team {
  id: number;
  name: string;
  country: string;
  city: string;
  commissionRate: number;
  accountBalance: number;
  players: {
    id: number;
    name: string;
  } [];
}
