import express from "express"
import dotenv from "dotenv"

import { connectdb } from "./lib/db.js"



import fileUpload from "express-fileupload"
import path from "path"
import userRoutes from "./routes/user.route.js"
import adminRoutes from "./routes/admin.route.js"
import authRoutes from "./routes/auth.route.js"
import songRoutes from "./routes/song.route.js"
import albumsRoutes from "./routes/albums.route.js"
import statsRoutes from "./routes/stats.route.js"
import { clerkMiddleware } from '@clerk/express'
import cors from "cors"
import { createServer } from "http"
import { initializeSocket } from "./lib/socket.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT

const __dirname = path.resolve()

console.log("DEBUG:", process.env.CLOUDINARY_API_KEY);

app.use(express.json())
app.use(clerkMiddleware()) // 
app.use(cors({
    origin: "http://localhost:3000",
    Credential:true,

}))

const httpServer = createServer(app)
initializeSocket(httpServer)
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:path.join(__dirname,"tmp"),
    createParentPath:true,
    limits:{
        fileSize:10*1024*1024
    }

}))


app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api/songs",songRoutes)
app.use("/api/albums",albumsRoutes)
app.use("/api/stats",statsRoutes)

app.use((err,req,res,next)=>{
    res.status(500).json({message:process.env.NODE_ENV==="production"?"Internal server error":err.message})
})

httpServer.listen(PORT,()=>{
    console.log(`the backend is running in the ${PORT}`)
    connectdb()

})