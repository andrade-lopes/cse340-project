import { testConnection } from './src/models/db.js';
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// View engine
app.set("view engine", "ejs");

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
    res.render("index", {
        title: "Home"
    });
});

app.get("/organizations", (req, res) => {
    res.render("organizations", {
        title: "Organizations"
    });
});

app.get("/projects", (req, res) => {
    res.render("projects", {
        title: "Projects"
    });
});

app.get("/categories", (req, res) => {
    res.render("categories", {
        title: "Categories"
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

testConnection();