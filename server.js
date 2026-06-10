import dotenv from "dotenv";
dotenv.config();

import express from "express";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import { Pool } from "pg";
import { testConnection } from "./src/models/db.js";
import path from "path";
import { fileURLToPath } from "url";
import organizationRoutes from "./src/routes/organizationRoutes.js";
import routes from './src/routes.js';

const app = express();

const NODE_ENV = process.env.NODE_ENV || "development";
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//testConnection();

// View engine
app.set("view engine", "ejs");

// Allow Express to receive and process common POST data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Logging middleware
app.use((req, res, next) => {
    if (NODE_ENV === "development") {
        console.log(`${req.method} ${req.url}`);
    }
    next();
});

// Make NODE_ENV available in templates
app.use((req, res, next) => {
    res.locals.NODE_ENV = NODE_ENV;
    next();
});

// Routes
app.use(categoryRoutes);
app.use(projectRoutes);
app.use(organizationRoutes);
app.use('/', routes);

app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

app.get("/organizations", (req, res) => {
    res.render("organizations", { title: "Organizations" });
});

app.get("/categories", (req, res) => {
    res.render("categories", { title: "Categories" });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});