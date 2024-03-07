import mongoose from 'mongoose'
import 'dotenv/config'

const mongooseURL = process.env.MONGOOSEURL

  try {
    await mongoose.connect(mongooseURL);
    console.log('Conectado a la base de datos de MongoDB')
  } catch (error) {
    console.log(`ERROR => ${error}`)
  }