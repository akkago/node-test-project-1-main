require('dotenv').config()

const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 8080

const cors = require('cors')
const router = require('./routes/index')


/*const errorHandler = require('./middleware/ErrorHandlingMiddleware')*/

const app = express()
app.use(cors())
app.use(express.json())
app.use('/parse', router)

/*app.use(errorHandler)*/





const start = async () => {
  try {

    app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})
  } catch (e) {

  }
}
start()