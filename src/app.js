const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  //

  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  
  const {title,url,tech,likes} = request.body
   const project = {id:uuid(),title, url,tech,likes};
   
   repositories.push(project)
   
   
    return response.json(project)
});

app.put("/repositories/:id", (request, response) => {
  const {id}  = request.params

  const {title,url,tech,likes} = request.body

  const projectIndex = repositories.findIndex(repo => repo.id == id)


    console.log(projectIndex)
  if(projectIndex < 0){
    return response.status(400).json({error:"Project not found"})
  }

  const repos = {id,title,url,tech,likes}

  repositories[projectIndex] = repos

  return response.json(repos)
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params

  const index = repositories.findIndex(repo => repo.id == id)
  if(index<0){
    return response.status(400).json({error:"Project not found"})
  }
  repositories.splice(index, 1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const {id}  = request.params
  

  const like = repositories.findIndex((repo) => repo.id == id)
  if(like <0){
    return response.status(400).json({error:"Erro inesperado"})
  }
  repositories[like].likes +=1
  return response.status(204).send()

});

module.exports = app;
