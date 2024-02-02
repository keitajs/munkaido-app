import { DataTypes } from "sequelize"
import { db, checkDatabase } from '../libs/database.js'

export const employees = db.define('employees', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(128), allowNull: false },
  address: { type: DataTypes.STRING(128), allowNull: false },
  position: { type: DataTypes.STRING(128), allowNull: false },
  pricePerHour: { type: DataTypes.INTEGER, allowNull: false },
}, { createdAt: false, updatedAt: false });

export const worktimes = db.define('worktimes', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.DATE, allowNull: false },
  start: { type: DataTypes.TIME, allowNull: false },
  end: { type: DataTypes.TIME, allowNull: false }
}, { createdAt: false, updatedAt: false });

export const prepayments = db.define('prepayments', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  month: { type: DataTypes.INTEGER, allowNull: false },
  day: { type: DataTypes.INTEGER, allowNull: false },
  value: { type: DataTypes.INTEGER, allowNull: false }
}, { createdAt: false, updatedAt: false });

(async () => {
  employees.hasMany(worktimes, { foreignKey: { name: 'employeeId', allowNull: false }, onDelete: 'CASCADE' })
  worktimes.belongsTo(employees)

  employees.hasMany(prepayments, { foreignKey: { name: 'employeeId', allowNull: false }, onDelete: 'CASCADE' })
  prepayments.belongsTo(employees)

  await checkDatabase()
  await db.sync()
})()