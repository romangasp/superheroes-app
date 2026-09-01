// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";
// import express from "express";
// import cors from "cors";
// import superheroesRoutes from "./routes/superheroes.routes";

// admin.initializeApp();

// const app = express();
// app.use(cors({ origin: true }));

// app.use(superheroesRoutes);

// exports.app = functions.https.onRequest(app);

import express from "express";
import cors from "cors";

import heroesRoutes from "./routes/superheroes.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/superheroes", heroesRoutes);

export { app };
