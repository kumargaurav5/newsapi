import express from "express"
import "dotenv/config"
import ApiRoutes from "./routes/api.js"
import fileUpload from "express-fileupload"

const app = express()
const port = 3000 || process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static("public"))
app.use(fileUpload())



app.use("/api" , ApiRoutes)

app.listen(port , ()=>{
    console.log("server is listening on port 3000")
})