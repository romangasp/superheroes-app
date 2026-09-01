// import { Router } from "express";
// import * as admin from "firebase-admin";

// const router = Router();

// const db = admin.firestore();

// router.get("/api/superheroes", async (req: any, res: any) => {
//   const snapshot = await db.collection("superheroes").get();
//   const superheroes = snapshot.docs.map((doc: any) => ({
//     id: doc.id,
//     ...doc.data()
//   }));
//   return res.status(200).json(superheroes);
// });

// router.post("/api/superheroes", async (req: any, res: any) => {
//   try {
//     // const {phrase, author} = req.body;
//     // const newPhrase = {
//     //     phrase,
//     //     author,
//     //     date: new Date().toISOString()
//     // };

//     // await db
//     //   .collection("superheroes")
//     //   .add(newHeroe);

//     return res.status(204).json();
//   } catch (error: any) {
//     console.log(error);
//     return res.status(500).send(error);
//   }
// });

// router.delete("/api/superheroes/:id", async (req: any, res: any) => {
//   try {
//     const document = db.collection("superheroes").doc(req.params.id);
//     await document.delete();
//     return res.status(200).json();
//   } catch (error) {
//     return res.status(500).json();
//   }
// });

// export default router;

import { Router } from "express";

import {
  getSuperheroes,
  getSuperhero,
  createSuperhero,
  updateSuperhero,
  deleteSuperhero
} from "../controllers/superheroes.controllers";

const router = Router();

router.get("/", getSuperheroes);
router.get("/:id", getSuperhero);
router.post("/", createSuperhero);
router.put("/:id", updateSuperhero);
router.delete("/:id", deleteSuperhero);

export default router;
