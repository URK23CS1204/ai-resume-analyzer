const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

/* ---------------- SKILL EXTRACTION ---------------- */
function extractSkills(text) {
  const skillsList = [
    "Java",
    "Python",
    "React",
    "Node",
    "HTML",
    "CSS",
    "JavaScript",
    "MongoDB",
    "SQL",
  ];

  const foundSkills = skillsList.filter((skill) =>
    text.toLowerCase().includes(skill.toLowerCase()),
  );

  return foundSkills;
}

/* ---------------- JOB MATCHING ---------------- */
function matchJobs(skills) {
  let jobs = [];

  if (
    skills.includes("React") ||
    skills.includes("HTML") ||
    skills.includes("CSS")
  ) {
    jobs.push("Frontend Developer");
  }

  if (skills.includes("Node") || skills.includes("MongoDB")) {
    jobs.push("Backend Developer");
  }

  if (skills.includes("Python")) {
    jobs.push("Data Analyst");
  }

  if (skills.includes("Java")) {
    jobs.push("Software Engineer");
  }

  return jobs;
}

/* ---------------- SUGGESTIONS (CORRECTION) ---------------- */
function getSuggestions(skills) {
  let suggestions = [];

  if (!skills.includes("React")) {
    suggestions.push("Add React for frontend development roles");
  }

  if (!skills.includes("Node")) {
    suggestions.push("Learn Node.js for backend development");
  }

  if (!skills.includes("MongoDB")) {
    suggestions.push("Include database skills like MongoDB or SQL");
  }

  if (skills.length < 3) {
    suggestions.push("Add more technical skills to strengthen your resume");
  }

  if (skills.includes("HTML") && !skills.includes("CSS")) {
    suggestions.push("Add CSS along with HTML for better frontend profile");
  }

  return suggestions;
}

/* ---------------- MAIN API ---------------- */
app.post("/analyze", (req, res) => {
  const text = req.body.text;

  if (!text) {
    return res.status(400).json({ error: "No resume text provided" });
  }

  const skills = extractSkills(text);
  const jobs = matchJobs(skills);
  const suggestions = getSuggestions(skills);

  res.json({
    skills,
    jobs,
    suggestions,
  });
});

/* ---------------- SERVER ---------------- */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
