import dotenv from 'dotenv'
dotenv.config()
export const envService = {
    JWT:{
        SECRET: process.env.JWT_SECRET || "hahahha"
    }
}