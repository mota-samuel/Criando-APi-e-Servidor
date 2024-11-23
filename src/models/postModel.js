import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Connect to the database
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)

// Get all posts from the database
export async function getTodosPosts() {
  // Select the 'imersao_instabyte' database
  const db = conexao.db("imersao_instabyte");
  // Select the 'posts' collection
  const colecao = db.collection("posts");
  // Find all posts and return them as an array
  return colecao.find().toArray();
}

// Create a new post in the database
export async function creatPost(novoPost){
  // Select the 'imersao_instabyte' database
  const db = conexao.db("imersao_instabyte");
  // Select the 'posts' collection
  const colecao = db.collection("posts");
  // Insert the new post into the collection and return the result
  return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost){
  const db = conexao.db("imersao_instabyte");
  const colecao = db.collection("posts");
  const objId = ObjectId.createFromHexString(id)
  return colecao.updateOne({_id: new ObjectId(objId)}, {$set:novoPost})
}