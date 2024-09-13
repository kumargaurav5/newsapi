import express from "express"
import "dotenv/config"
import ApiRoutes from "./routes/api.js"
import fileUpload from "express-fileupload"
import helmet from "helmet"
import cors from "cors"
import  {limiter}  from "./config/ratelimiter.js"
const app = express()
const port = 3000 || process.env.PORT
import "./jobs/indexjob.js"

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static("public"))
app.use(fileUpload())
app.use(helmet())
app.use(cors())
app.use(limiter)

//swagger
import swaggerUi from "swagger-ui-express"
import fs from "fs"
import yaml from "js-yaml"

const swaggerDocument = yaml.load(fs.readFileSync('./swagger.yaml', 'utf8'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api" , ApiRoutes)

app.get("/" , (req,res)=>{
    res.redirect("/api-docs")
})


app.listen(port , ()=>{
    console.log("server is listening on port 3000")
})