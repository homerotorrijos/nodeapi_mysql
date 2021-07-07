'use strict'

const express = require('express')
const api = express.Router()
const plan = require('../services/plan')

/* GET programming languages. */
api.get('/', async function(req, res, next) {
  try {
    res.json(await plan.getAllProgrammingLan(req.query.page))
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message)
    next(err);
  }
})

api.post('/', async function(req, res, next) {
    try {
        res.json(await plan.postProgrammingLan(req.body));
    } catch (err) {
        console.error(`Error while creating programming language`, err.message);
        next(err);
    }
})

api.delete('/:id', async function(req, res, next) {
    try {
      res.json(await plan.deleteProgrammingLan(req.params.id));
    } catch (err) {
      console.error(`Error while deleting programming language`, err.message);
      next(err);
    }
  })

  api.put('/:id', async function(req, res, next) {
    try {
      res.json(await programmingLanguages.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating programming language`, err.message);
      next(err);
    }
  })


module.exports = api;