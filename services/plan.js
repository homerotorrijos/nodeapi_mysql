'use strict'

const mysql = require('mysql2/promise');
const helper = require('../app');
const config = require('../config');

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results, ] = await connection.execute(sql, params);

  return results;
}

async function getAllProgrammingLan(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await query(
    `SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank 
    FROM programming_languages LIMIT ?,?`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function postProgrammingLan(programmingLanguage){
  const result = await query(
    `INSERT INTO programming_languages 
    (name, released_year, githut_rank, pypl_rank, tiobe_rank) 
    VALUES 
    (?, ?, ?, ?, ?)`, 
    [
      programmingLanguage.name, programmingLanguage.released_year,
      programmingLanguage.githut_rank, programmingLanguage.pypl_rank,
      programmingLanguage.tiobe_rank
    ]
  );

  let message = 'Error in creating programming language';

  if (result.affectedRows) {
    message = 'Programming language created successfully';
  }

  return {message};
}

async function putpostProgrammingLan(id, programmingLanguage){
  const result = await query(
    `UPDATE programming_languages 
    SET name=?, released_year=?, githut_rank=?, 
    pypl_rank=?, tiobe_rank=? 
    WHERE id=?`, 
    [
      programmingLanguage.name, programmingLanguage.released_year,
      programmingLanguage.githut_rank, programmingLanguage.pypl_rank,
      programmingLanguage.tiobe_rank, id
    ]
  );

  let message = 'Error in updating programming language';

  if (result.affectedRows) {
    message = 'Programming language updated successfully';
  }

  return {message};
}

async function deleteProgrammingLan(id){
  const result = await query(
    `DELETE FROM programming_languages WHERE id=?`, 
    [id]
  );

  let message = 'Error in deleting programming language';

  if (result.affectedRows) {
    message = 'Programming language deleted successfully';
  }

  return {message};
}



module.exports = {
  getAllProgrammingLan,
  postProgrammingLan,
  putpostProgrammingLan,
  deleteProgrammingLan
}