import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImage } from "../controllers/postsController.js";

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
    async function getTodosPosts(){
        const db = conexao.db("imersao_instabyte");
        const colecao = conexao.collection("posts");
        return colecao.find().toArray();
    } 
    
    app.get("/posts",listarPosts);
    app.post("/posts",postarNovoPost);
    app.post("/upload",upload.single("image"),uploadImage)
}

export default routes;