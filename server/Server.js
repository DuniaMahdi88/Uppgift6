import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import Configuration from './configuration/Configuration.js'
import UserRoutes from './routes/User.routes.js'

dotenv.config()
const app = express()
app.use(bodyParser.urlencoded({ extended : true }))
app.use(bodyParser.json())
app.use(helmet())
app.use(morgan('common'))


app.get('/recipe', (req, res) => {
    res.send('Pancakes!')
})

UserRoutes.routes(app)
Configuration.connectToDatabse()
Configuration.connectToPort(app)