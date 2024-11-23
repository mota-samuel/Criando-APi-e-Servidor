import fs from "fs";
import { getTodosPosts, creatPost, atualizarPost } from "../models/postModel.js";
import { url } from "inspector";
import gerarDescricaoComGemini from "../services/geminiServ.js";
// List all posts
export async function listarPosts(req,res){
  // Get all posts from the database
  const posts = await getTodosPosts()
  // Send the posts as a JSON response with status code 200
  res.status(200).json(posts);
}

// Create a new post
export async function postarNovoPost(req,res){
  // Get the new post data from the request body
  const novoPost = req.body;
  try{
    // Create the new post in the database
    const postCriado = await creatPost(novoPost);
    // Send the created post as a JSON response with status code 200
    res.status(200).json(postCriado);
  }catch(error){
    // Log the error message to the console
    console.error(error.message);
    // Send an error message as a JSON response with status code 500
    res.status(500).json({"erro":"Falha na requisição"})
  }
}


export async function uploadImage(req,res){
  // Create a new post object with the image URL and other fields
  const novoPost = {
    descrição: "",
    imgUrl: req.file.originalname,
    alt:""
  };
  try{
    // Create the new post in the database
    const postCriado = await creatPost(novoPost);
    // Construct the new image path
    const imageAtt = `uploads/${postCriado.insertedId}.png`
    // Rename the uploaded file to the new path
    fs.renameSync(req.file.path, imageAtt)
    // Send the created post as a JSON response with status code 200
    res.status(200).json(postCriado);
  }catch(error){
    // Log the error message to the console
    console.error(error.message);
    // Send an error message as a JSON response with status code 500
    res.status(500).json({"erro":"Falha na requisição"})
  }
}

export async function atualizarNovoPost(req,res){
  const id = req.params.id;
  const urlImage = `http://localhost:3000/${id}.png`
  
  try{
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
    const descricao = await gerarDescricaoComGemini(imgBuffer)

    const post = {
      imgUrl: urlImage,
      descricao: descricao,
      alt: req.body.alt
    }
    const postCriado = await atualizarPost(id, post);
    res.status(200).json(postCriado);
  }catch(error){
    console.error(error.message);
    res.status(500).json({"erro":"Falha na requisição"})
  }
}