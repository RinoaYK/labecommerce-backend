import express, { Request, Response} from 'express';
import cors from 'cors';
import {
  users,
  products,
  purchases,
  createUser,
  getAllUsers,
  createProduct,
  getAllProducts,
  getProductById,
  queryProductsByName,
  createPurchase,
  getAllPurchasesFromUserId,
  calculateTotalPrice
} from "./database";

import { CATEGORY, TProduct, TUser, TPurchase } from "./types";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

// console.log("usuários:", users);
// console.log("produtos:", products);
// console.log("compras:", purchases);

// console.log(createUser("kabo", "kabo@gmail.com", "kabo123"));
// console.log(getAllUsers());

// console.log("Novo Produto:", createProduct("Pelúcia Astronauta", "Pelúcia Astronauta", 15.99, CATEGORY.PLUSHS))
// console.log("Todos os produtos:", getAllProducts())
// console.log("Busca por Id:",getProductById("Pelúcia Astronauta"))

// console.log("Buscando produto por name em filter", queryProductsByName("mil"))

// console.log(createPurchase("rinoayk", "Camiseta Astronauta",5))
// console.log(getAllPurchasesFromUserId("rinoayk"))


app.get("/users", (req: Request, res: Response) => {  
  res.status(200).send(users);
});

app.get("/products", (req: Request, res: Response) => {  
  res.status(200).send(products);
});

app.get("/product/search", (req: Request, res: Response) => {
  const q = req.query.q as string
// const {q} = req.query 
  const result: TProduct[] = products.filter((product) => {
    return product.name.toLowerCase().includes(q.toString().toLowerCase());
  });

  res.status(200).send(result);
});

app.post("/users", (req: Request, res: Response) => {
  const id = req.body.id as string;
  const email = req.body.email as string;
  const password = req.body.password as string;
  // const {id, email, password} = req.body;
  if(typeof id !== "string"){
return res.status(400).send("Id precisa ser uma string!");
  }

  const newUser: TUser = {
    id,
    email,
    password,
  };

  users.push(newUser);
  // res.status(201).send("Usuário cadastrado com sucesso!");
  res.status(201).send({message:"Usuário cadastrado com sucesso!", newUser});
});

app.post("/products", (req: Request, res: Response) => {
  const id = req.body.id as string;
  const name = req.body.name as string;
  const price = req.body.price as number;
  const category = req.body.category as CATEGORY;

  const newProduct: TProduct = {
    id,
    name,
    price,
    category
  };
  
  products.push(newProduct);
  res.status(201).send("Produto cadastrado com sucesso!");
});

app.post("/purchases", (req: Request, res: Response) => {
  const userId = req.body.userId as string;
  const productId = req.body.productId as string;
  const quantity = req.body.quantity as number;
  // const totalPrice = req.body.totalPrice as number;

  const newPurchase: TPurchase = {
    userId,
    productId,
    quantity,
    totalPrice : calculateTotalPrice(productId, quantity)
  };

  purchases.push(newPurchase);
  res.status(201).send("Compra realizada com sucesso!");
});

app.get("/purchases", (req: Request, res: Response) => {  
  res.status(200).send(purchases);
});