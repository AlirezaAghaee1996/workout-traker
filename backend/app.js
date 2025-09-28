import express from 'express'
import {fileURLToPath} from 'url'
import path from 'path'
import cors from 'cors'
import morgan from 'morgan'
import { catchError, HandleERROR } from 'vanta-api'
import swaggerUi from 'swagger-ui-express'
import exportValidation from './Middlewares/ExportValidation.js'
import authRouter from './Routes/Auth.js'
import swaggerDocs from './Utils/Swagger.js'
import userRouter from './Routes/User.js'
import rateLimit from 'express-rate-limit'
const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100 ,
    message: "Too many requests from this IP, please try again later."
})
const app = express()
app.use(cors())
app.use(limiter)
app.use(express.json())
app.use(morgan('dev'))
app.use(exportValidation)
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use((req,res,next)=>{
    next(new HandleERROR('Not Found', 404))
})

app.use(catchError)

export default app

