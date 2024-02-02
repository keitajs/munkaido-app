import { Sequelize } from 'sequelize'
import mysql from 'mysql2/promise'
import { config } from 'dotenv'
config()

const checkDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS
    })
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\` DEFAULT CHARSET \`utf8\` COLLATE \`utf8_general_ci\`;`)
  } catch (error) {
    console.log(error)
  }
}

const db = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: 'mysql'
})

export { db, checkDatabase }