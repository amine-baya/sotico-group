require("dotenv").config({ path: ".env.local" });

module.exports = {
  datasource: {
    url: process.env.DATABASE_URL
  },
}
