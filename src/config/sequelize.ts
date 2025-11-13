import { Sequelize } from "sequelize"

export const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  host: "cms-database",
  dialect: "postgres",
  logging: false,
})
