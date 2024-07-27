import express from 'express'
import './database/dbConnection.js'
import userRouter from './modules/user/user.routes.js'
import massageRouter from './modules/massage/massage.routes.js'
import { AppError } from './utils/error.js'

// process.on('uncaughtException', (err) => console.log('error'))  // handel errors outside express
process.on('uncaughtException', (err) => res.json({ message: err.message }))  // handel errors outside express

const app = express()
const port = 3000

app.use(express.json())

app.use("/users", userRouter)
app.use("/massage", massageRouter)

app.use('*', (req, res, next) => {  // handel 404 error in paths 
    next(new AppError(req.originalUrl + ' is not found', 404))
})

app.use((err, req, res, next) => {
    const { message, statusCode } = err
    res.status(statusCode).json({ message })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

process.on("unhandledRejection", (err) => console.log("error")) // handel errors outside express