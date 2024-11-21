import express from "express";
import { listarPosts } from "../controllers/postsController.js";

const routes = (app)=>{
    app.use(express.json());
    async function getTodosPosts(){
        const db = conexao.db("imersao_instabyte");
        const colecao = conexao.collection("posts");
        return colecao.find().toArray();
    } 
    
    app.get("/posts",listarPosts);
}

export default routes;