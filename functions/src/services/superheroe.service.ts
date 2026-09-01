import { db } from "../config/firebase";

export interface Superhero {
  id: string;
  name: string;
  image: string;
  description?: string;
  publisher?: string;
  powerstats?: {
    intelligence: number;
    strength: number;
    speed: number;
    durability: number;
    power: number;
    combat: number;
  };
}

const collection = db.collection("superheroes");

export class SuperheroesService {
  async findAll(): Promise<Superhero[]> {
    const snapshot = await collection.get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as unknown as Superhero[];
  }

  async findById(id: string): Promise<Superhero | null> {
    const doc = await collection.doc(id).get();

    if (!doc.exists) {
      return null;
    }

    return {
      id: doc.id,
      ...doc.data()
    } as unknown as Superhero;
  }

  async createSuperhero(superhero: Omit<Superhero, "id">): Promise<Superhero> {
    const doc = await collection.add(superhero);

    return {
      id: doc.id,
      ...superhero
    };
  }

  async update(
    id: string,
    superhero: Partial<Omit<Superhero, "id">>
  ): Promise<Superhero | null> {
    const doc = collection.doc(id);

    const existing = await doc.get();

    if (!existing.exists) {
      return null;
    }

    await doc.update(superhero);

    return {
      id,
      ...existing.data(),
      ...superhero
    } as Superhero;
  }

  async delete(id: string): Promise<boolean> {
    const doc = collection.doc(id);

    const existing = await doc.get();

    if (!existing.exists) {
      return false;
    }

    await doc.delete();

    return true;
  }
}
