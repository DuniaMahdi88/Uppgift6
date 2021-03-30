import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectToDatabse = async () => {
    try {
        const DB_URL = process.env.DATABASE_URL
    await mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    console.log('Successfully connected to the database')
} catch (error){
    console.log('ERROR!', error)
    process.exit()

}
}

const connectToPort = (app) => {
 const port = process.env.PORT
 app.listen(port, () => {
 console.log(`Servern är igång på port ${port}`)
    })
}
export default {
    connectToDatabse,
    connectToPort
}