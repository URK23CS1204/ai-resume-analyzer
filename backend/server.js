const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Simple skill extraction
function extractSkills(text) {
  const skills = ["Java", "Python", "React", "Node", "HTML", "CSS"];
  return skills.filter((skill) => text.includes(skill));
}

// Job matching
function matchJobs(skills) {
  let jobs = [];

  if (skills.includes("React")) jobs.push("Frontend Developer");
  if (skills.includes("Node")) jobs.push("Backend Developer");
  if (skills.includes("Python")) jobs.push("Data Analyst");

  return jobs;
}

app.post("/analyze", (req, res) => {
  const text = req.body.text;

  const skills = extractSkills(text);
  const jobs = matchJobs(skills);

  res.json({
    skills,
    jobs,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
