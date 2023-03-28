import express, { Request, Response } from "express";
import cors from "cors";
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
  calculateTotalPrice,
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
  const q = req.query.q as string;
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
  if (typeof id !== "string") {
    return res.status(400).send("Id precisa ser uma string!");
  }

  const newUser: TUser = {
    id,
    email,
    password,
  };

  users.push(newUser);
  // res.status(201).send("Usuário cadastrado com sucesso!");
  res.status(201).send({ message: "Usuário cadastrado com sucesso!", newUser });
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
    category,
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
    totalPrice: calculateTotalPrice(productId, quantity),
  };

  purchases.push(newPurchase);
  res.status(201).send("Compra realizada com sucesso!");
});

app.get("/purchases", (req: Request, res: Response) => {
  res.status(200).send(purchases);
});

//aprofundamento-express ex1
app.get("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const result = products.find((product) => product.id === id);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send("Produto não encontrado!");
  }
});

app.get("/users/:id/purchases", (req: Request, res: Response) => {
  const userId = req.params.id;
  const result = purchases.find((user) => user.userId === userId);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send("Usuário não encontrado!");
  }
});

//ex2
app.delete("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const indexUserToDelete = users.findIndex((user) => user.id === id);
  if (indexUserToDelete >= 0) {
    users.splice(indexUserToDelete, 1);
    res.status(200).send("User apagado com sucesso!");
  } else {
    res.status(404).send("Usuário não encontrado!");
  }
});

app.delete("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const indexProductToDelete = products.findIndex(
    (product) => product.id === id
  );
  if (indexProductToDelete >= 0) {
    products.splice(indexProductToDelete, 1);
    res.status(200).send("Produto apagado com sucesso!");
  } else {
    res.status(404).send("Produto não encontrado!");
  }
});

//ex3
app.put("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  const newEmail = req.body.email as string | undefined;
  const newPassword = req.body.password as string | undefined;

  const userToEdit = users.find((user) => user.id === id);

  if (userToEdit) {
    userToEdit.email = newEmail || userToEdit.email;
    userToEdit.password = newPassword || userToEdit.password;
    res.status(200).send("Cadastro atualizado com sucesso!");
  } else {
    res.status(404).send("Usuário não encontrado!");
  }
});

app.put("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  const newName = req.body.name as string | undefined;
  const newPrice = req.body.price as number | undefined;
  const newCategory = req.body.category as CATEGORY | undefined;

  const productToEdit = products.find((product) => product.id === id);

  if (productToEdit) {
    productToEdit.name = newName || productToEdit.name;
    productToEdit.price = isNaN(newPrice) ? productToEdit.price : newPrice;
    productToEdit.category = Object.values(CATEGORY).includes(newCategory)
      ? newCategory
      : productToEdit.category;
    res.status(200).send("Produto atualizado com sucesso!");
  } else {
    res.status(404).send("Produto não encontrado!");
  }  
});
