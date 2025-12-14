const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/* ---------- express app ---------- */
const app = express();
const PORT = process.env.PORT || 4000;

/* ---------- middleware ---------- */
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json()); // parse JSON bodies

/* ---------- config ---------- */
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/demo";
const JWT_SECRET = process.env.JWT_SECRET || "devsecret";
/* ---------- simple schema ---------- */
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

/* ---------- routes ---------- */
app.get("/", (_req, res) => res.send("API is running"));

/* ---------- auth: signup / signin ---------- */
app.post("/auth/signup", async (req, res) => {
  try {
    console.log(req.body);
    const { email, username, password } = req.body;
    if (!email || !username || !password)
      return res
        .status(400)
        .json({ error: "Missing email, username or password" });

    const existing = await User.findOne({ username });
    if (existing)
      return res.status(409).json({ error: "Username already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, username, password: hashed });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res
      .status(201)
      .json({ user: { id: user._id, username: user.username }, token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/auth/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "Missing username or password" });

    const user = await User.findOne({ email: username });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ user: { id: user._id, username: user.username }, token });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/* CRUD */

app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/users", async (_req, res) => {
  const users = await User.find().lean();
  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "Not found" });
  res.json(user);
});

app.post("/users/add", async (req, res) => {
  try {
    console.log(req.body);

    // Check if username already exists
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ error: "Not found" });
  res.json({ message: "Deleted" });
});
/* ---------- start (connect DB then listen) ---------- */
async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Mongo connected");

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected");
    });

    app.listen(PORT, () =>
      console.log(`Listening on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();

process.on("SIGINT", async () => {
  console.log("Shutting down...");
  await mongoose.connection.close();
  process.exit(0);
});
