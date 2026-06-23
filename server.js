import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import flash from 'connect-flash';

import categoryRoutes from './src/routes/categoryRoutes.js';
import projectRoutes from './src/routes/projectRoutes.js';
import organizationRoutes from './src/routes/organizationRoutes.js';
import volunteerRoute from './src/routes/volunteerRoute.js';
import dashboardRoutes from './src/routes/dashboardRoutes.js';
import authRoutes from './src/routes.js';

const app = express();
const NODE_ENV = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session
app.use(session({
    secret: process.env.SESSION_SECRET || 'serveconnect-secret-key',
    resave: false,
    saveUninitialized: false
}));

// Flash messages
app.use(flash());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Dev logging
app.use((req, res, next) => {
    if (NODE_ENV === 'development') console.log(`${req.method} ${req.url}`);
    next();
});

// Globals available in every template
app.use((req, res, next) => {
    res.locals.isLoggedIn = !!(req.session?.user);
    res.locals.NODE_ENV = NODE_ENV;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use(authRoutes);
app.use(categoryRoutes);
app.use(projectRoutes);
app.use(organizationRoutes);
app.use(volunteerRoute);
app.use(dashboardRoutes);

// Home page
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// 404
app.use((req, res) => {
    res.status(404).render('index', { title: 'Page Not Found' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port} in ${NODE_ENV} mode`);
});