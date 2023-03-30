import express from "express";
const router = express.Router();

router.get("/", async (req, res, next) => {
  res.status(200).send({ data: "API is working properly" });
});

export default router;
