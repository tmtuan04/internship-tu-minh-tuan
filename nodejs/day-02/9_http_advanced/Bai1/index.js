import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware để parse JSON body

const dataStore = [];

app.post("/data", (req, res) => {
  const newData = req.body;

  if (!newData) {
    return res.status(400).json({ error: "Data is required" });
  }

  dataStore.push(newData);
  res.status(201).json({
    message: "Data added successfully",
    currentData: dataStore,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
