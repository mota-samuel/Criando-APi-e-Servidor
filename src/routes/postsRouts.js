import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImage , atualizarNovoPost } from "../controllers/postsController.js";

const corsOptions = {
    origin : "http://localhost:8000",
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app)=>{
    app.use(express.json());
    app.use(cors(corsOptions))
    async function getTodosPosts(){
        const db = conexao.db("imersao_instabyte");
        const colecao = conexao.collection("posts");
        return colecao.find().toArray();
    } 
    
    app.get("/posts",listarPosts);
    app.post("/posts",postarNovoPost);
    app.post("/upload",upload.single("image"),uploadImage);
    app.put("/upload/:id", atualizarNovoPost)
}

export default routes;