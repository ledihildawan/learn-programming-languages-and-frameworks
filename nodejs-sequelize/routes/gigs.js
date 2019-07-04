const express = require('express');
const router = express.Router();
const db = require('./../config/database');
const Gig = require('./../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get gig list
router.get('/', (req, res) => {
  Gig.findAll()
    .then(gigs => {
      res.render('gigs', { gigs });
    })
    .catch(err => console.log(err));
});

// Display add gig form
router.get('/add', (req, res) => res.render('add'))

// Add
router.post('/add', (req, res) => {
  // const data = {
  //   title: 'Simple Wordpress website',
  //   technologies: 'wordpress,php,html,css',
  //   budget: '$1000',
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at est bibendum, imperdiet purus eget, sollicitudin justo. Aenean a elit eget nulla viverra iaculis in sed dui. Suspendisse sit amet faucibus nunc, tempus varius lacus. In ultricies sed metus sit amet malesuada. In hac habitasse platea dictumst',
  //   contact_email: 'user2@gmail.com'
  // };

  // let { title, technologies, budget ,description, contact_email } = data;
  // Dynamic from form
  let { title, technologies, budget, description, contact_email } = req.body;
  const errors = [];

  if (!title) errors.push({ text: 'please add a title' });
  if (!technologies) errors.push({ text: 'please add some technologies' });
  if (!description) errors.push({ text: 'please add a description' });
  if (!contact_email) errors.push({ text: 'please add a email' });

  // check for erros
  if (errors.length > 0) {
    res.render('add', {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email
    });
  } else {
    if (!budget) budget = 'Unknown';
    else budget = `$${budget}`;

    // make lowercase and remove space after comma
    technologies = technologies.toLowerCase().replace(/, /g, ',');

    // Insert into table
    Gig.create({
      title,
      technologies,
      description,
      budget,
      contact_email
    })
      .then(gig => res.redirect('/gigs'))
      .catch(err => console.log(err));
  }
});

// Search for gigs
router.get('/search', (req, res) => {
  let { term } = req.query;

  term = term.toLowerCase();

  Gig.findAll({ where: { technologies: { [Op.like]: `%${term}%` }}})
    .then(gigs => {
      console.log(gigs)
      res.render('gigs', { gigs })
    })
    .catch(err => console.log(err))
})

module.exports = router;