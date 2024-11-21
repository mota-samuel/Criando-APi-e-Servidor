import express from "express";
import conectarAoBanco from "./src/config/dbConfig.js";
import routes from "./src/routes/postsRouts.js";

const app = express();
routes(app)

app.listen(3000, ()=>{
    console.log("Servidor escutando...");
});


