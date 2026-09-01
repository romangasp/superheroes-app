import { Request, Response } from "express";
import { SuperheroesService } from "../services/superheroe.service";
const service = new SuperheroesService();

export async function getSuperheroes(_req: Request, res: Response) {
  try {
    const superheroes = await service.findAll();

    res.status(200).json(superheroes);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error getting superheroes"
    });
  }
}

export const getSuperhero = async (req: Request, res: Response) => {
  try {
    const superhero = await service.findById(req.params.id);

    if (!superhero) {
      return res.status(404).json({
        message: "Superhero not found"
      });
    }
    return res.status(200).json(superhero);
  } catch (error) {
    console.error("Error getting superhero:", error);

    return res.status(500).json({
      message: "Error getting superhero"
    });
  }
};

export const createSuperhero = async (req: Request, res: Response) => {
  try {
    const superhero = await service.createSuperhero(req.body);

    return res.status(201).json(superhero);
  } catch (error) {
    console.error("Error creating superhero:", error);

    return res.status(500).json({
      message: "Error creating superhero"
    });
  }
};

export const updateSuperhero = async (req: Request, res: Response) => {
  try {
    const superhero = await service.update(req.params.id, req.body);
    if (!superhero) {
      return res.status(404).json({
        message: "Superhero not found"
      });
    }
    return res.status(200).json(superhero);
  } catch (error) {
    console.error("Error updating superhero:", error);
    return res.status(500).json({
      message: "Error updating superhero"
    });
  }
};

export const deleteSuperhero = async (req: Request, res: Response) => {
  try {
    const deleted = await service.delete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Superhero not found"
      });
    }
    return res.status(200).json({
      message: "Superhero deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting superhero:", error);

    return res.status(500).json({
      message: "Error deleting superhero"
    });
  }
};
