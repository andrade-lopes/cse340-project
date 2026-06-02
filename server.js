import dotenv from "dotenv";
dotenv.config();

import categoryRoutes from "./routes/categoryRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import { Pool } from 'pg';
import express from "express";
import { testConnection } from './src/models/db.js';
import path from "path";
import { fileURLToPath } from "url";

const express = require('express');
const app = express();
const NODE_ENV = process.env.NODE_ENV || "development"
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

testConnection();

// View engine
app.set("view engine", "ejs");

// Static files
app.use(express.static(path.join(__dirname, "public")));

app.use(categoryRoutes);

// Middleware to log all incoming requests
app.use((req, res, next) => {
    if (NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }

    next(); // Pass control to the next middleware or route
});

// Middleware to make NODE_ENV available to all templates
app.use((req, res, next) => {
    res.locals.NODE_ENV = NODE_ENV;
    next();
});

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

app.get("/categories", (req, res) => {
    res.render("categories", {
        title: "Categories"
    });
});

app.use(projectRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});