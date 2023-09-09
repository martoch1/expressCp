const express = require('express');
const app = express();
const port = 3000;

// Middleware to check working hours
const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
  const hour = now.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.status(403).send('This web application is only available during working hours (Mon-Fri, 9 AM to 5 PM).');
  }
};

app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', checkWorkingHours, (req, res) => {
  res.render('home');
});

app.get('/services', checkWorkingHours, (req, res) => {
  res.render('services');
});

app.get('/contact', checkWorkingHours, (req, res) => {
  res.render('contact');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
