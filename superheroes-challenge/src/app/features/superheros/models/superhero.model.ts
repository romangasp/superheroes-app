import { PowerStats } from './power-stats.model';

export interface Superhero {
  id: string;
  name: string;
  image?: string;
  description?: string;
  powerstats?: PowerStats;
}
