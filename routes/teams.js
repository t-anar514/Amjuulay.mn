import express from "express";
import Team from "../models/teams.js";
import { name } from "ejs";



const router = express.Router();

router.post("/CreateTeam", async (req, res) => {
  try {
    const { name, color, members } = req.body;

    // Check if all required fields are provided
    if (!name || !color || !members) {
      return res
        .status(400)
        .send({ message: "Please provide name, color, and members" });
    }

    // Check if the user already exists
    const existingTeam = await Team.findOne({ name });
    if (existingTeam) {
      return res.status(409).send({ message: " this team already exists" });
    }

    // Create new team
    const newTeam = new Team({ name, color, members });
    await newTeam.save();
    // Return success response
    return res
      .status(201)
      .send({ message: "Team  created successfully", team: newTeam });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
}); 

router.get("/",async (req, res) => {
  const select = req.query.select;

  const members = await Team.find(req.query, select)

  res.status(200).json({
    success: true,
    data: members
  });
})

export default router;
