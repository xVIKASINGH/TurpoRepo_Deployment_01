import express from "express";
import {prisma} from "@repo/db"
import { config } from "dotenv";
config();
const app = express();
app.use(express.json());


// Get users
app.get("/users",async(req,res)=>{
    await prisma.user.findMany()
    .then(users =>{
        res.json({users})
    }).catch(err =>{
        console.log("here is the error",err);
        return res.status(500).send({err ,message:"Geting some error while fetching users"});
    })
})


// Signup Endpoint
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username,email,password)
  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password, // Note: In a real app, hash this password first!
      },
    });
    res.json({ message: "User created", userId: user.id });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "User already exists or invalid data" });
  }
});

// Create Todo Endpoint
app.post("/todo", async (req, res) => {
  const { userId, task, deadline } = req.body;
  try {
    const todo = await prisma.todo.create({
      data: {
        userid: userId,
        task,
        deadline: new Date(deadline),
        duration: new Date(), 
      },
    });
    res.json(todo);
  } catch (e) {
    res.status(500).json({ error: "Failed to create todo" });
  }
});

app.listen(3001, () => {
  console.log("HTTP Server running on http://localhost:3000");
});