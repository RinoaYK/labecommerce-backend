import express, { Request, Response } from "express";
import cors from "cors";
import { users, products, purchases, calculateTotalPrice } from "./database";

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

app.get("/users", (req: Request, res: Response) => {
  try {
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado!");
    }
  }
});

app.get("/products", (req: Request, res: Response) => {
  try {
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado!");
    }
  }
});

app.get("/product/search", (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;
    // const {q} = req.query
    if (q.length < 1) {
      res.status(400);
      throw new Error("Query params deve possuir pelo menos 1 caracter!");
    }
    const result: TProduct[] = products.filter((product) => {
      return product.name.toLowerCase().includes(q.toString().toLowerCase());
    });

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado!");
    }
  }
});

app.post("/users", (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const email = req.body.email as string;
    const password = req.body.password as string;
    // const {id, email, password} = req.body;
    if (id === undefined || id === "") {
      res.status(400);
      throw new Error("Preencher o id!");
    } else if (typeof id !== "string") {
      res.status(400);
      throw new Error("Id precisa ser uma string!");
    }

    const userExists = users.filter((user) => {
      return user.id === id;
    });

    if (userExists.length > 0) {
      res.status(400);
      throw new Error("o usúário já existe!!");
    }

    if (email === undefined || email === "") {
      res.status(400);
      throw new Error("Preencher o email!");
    } else if (typeof email !== "string") {
      res.status(400);
      throw new Error("Email precisa ser uma string!");
    }
    const emailExists = users.filter((user) => {
      return user.email === email;
    });

    if (emailExists.length > 0) {
      res.status(400);
      throw new Error("Email já utilizado!");
    }

    if (password === undefined || password === "") {
      res.status(400);
      throw new Error("Preencher a senha!");
    } else if (typeof password !== "string") {
      res.status(400);
      throw new Error("Password precisa ser uma string!");
    }

    const newUser: TUser = {
      id,
      email,
      password,
    };

    users.push(newUser);
    res.status(201).send("Usuário cadastrado com sucesso!");
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado!");
    }
  }
});

app.post("/products", (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const price = req.body.price as number;
    const category = req.body.category as CATEGORY;

    if (id === undefined || id === "") {
      res.status(400);
      throw new Error("Preencher o id!");
    } else if (typeof id !== "string") {
      res.status(400);
      throw new Error("Id precisa ser uma string!");
    }

    const IdExists = products.filter((product) => {
      return product.id === id;
    });

    if (IdExists.length > 0) {
      res.status(400);
      throw new Error("Id já existe!!");
    }

    if (name === undefined || name === "") {
      res.status(400);
      throw new Error("Preencher o nome!");
    } else if (typeof name !== "string") {
      res.status(400);
      throw new Error("Nome precisa ser uma string!");
    }

    if (price === undefined) {
      res.status(400);
      throw new Error("Preencher o preço!");
    } else if (typeof price !== "number") {
      res.status(400);
      throw new Error("Preço precisa ser um número!");
    }

    if (category === undefined) {
      res.status(400);
      throw new Error("Preencher a categoria!");
    } else if (!Object.values(CATEGORY).includes(category)) {
      res.status(400);
      throw new Error("Categoria não encontrada!");
    }

    const newProduct: TProduct = {
      id,
      name,
      price,
      category,
    };

    products.push(newProduct);
    res.status(201).send("Produto cadastrado com sucesso!");
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado!");
    }
  }
});

app.post("/purchases", (req: Request, res: Response) => {
  try {
    const userId = req.body.userId as string;
    const productId = req.body.productId as string;
    const quantity = req.body.quantity as number;
    // const totalPrice = req.body.totalPrice as number;
    if (userId === undefined || userId === "") {
      res.status(400);
      throw new Error("Preencher o userId!");
    } else if (typeof userId !== "string") {
      res.status(400);
      throw new Error("userId precisa ser uma string!");
    }
    const userExists = users.filter((user) => {
      return user.id === userId;
    });

    if (userExists.length === 0) {
      res.status(400);
      throw new Error("Por favor, realize seu cadastro primeiro!");
    }

    if (productId === undefined || productId === "") {
      res.status(400);
      throw new Error("Preencher o productId!");
    } else if (typeof productId !== "string") {
      res.status(400);
      throw new Error("productId precisa ser uma string!");
    }

    const IdExists = products.filter((product) => {
      return product.id === productId;
    });

    if (IdExists.length === 0) {
      res.status(400);
      throw new Error("Produto não encontrado!");
    }

    if (quantity === undefined) {
      res.status(400);
      throw new Error("Preencher a quantidade!");
    } else if (typeof quantity !== "number") {
      res.status(400);
      throw new Error("Quantidade precisa ser um número!");
    }

    const newPurchase: TPurchase = {
      userId,
      productId,
      quantity,
      totalPrice: calculateTotalPrice(productId, quantity),
    };

    purchases.push(newPurchase);
    res.status(201).send("Compra realizada com sucesso!");
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado!");
    }
  }
});

app.get("/purchases", (req: Request, res: Response) => {
  try {
    res.status(200).send(purchases);
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado!");
    }
  }
});

//ex2
app.get("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = products.find((product) => product.id === id);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404);
      throw new Error("Produto não encontrado!");
    }
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado!");
    }
  }
});

app.get("/users/:id/purchases", (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const result = purchases.find((user) => user.userId === userId);
    if (result) {
      res.status(200).send(result);
    } else if (users.find((user) => user.id === userId)) {
      res.status(200).send("Usuário não realizou nenhuma compra  ainda!");
    } else {
      res.status(404);
      throw new Error("Usuário não encontrado!");
    }
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado!");
    }
  }
});

app.delete("/users/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const indexUserToDelete = users.findIndex((user) => user.id === id);
    if (indexUserToDelete >= 0) {
      users.splice(indexUserToDelete, 1);
      res.status(200).send("User apagado com sucesso!");
    } else {
      res.status(404);
      throw new Error("Usuário não encontrado!");
    }
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado!");
    }
  }
});

app.delete("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const indexProductToDelete = products.findIndex(
      (product) => product.id === id
    );
    if (indexProductToDelete >= 0) {
      products.splice(indexProductToDelete, 1);
      res.status(200).send("Produto apagado com sucesso!");
    } else {
      res.status(404);
      throw new Error("Produto não encontrado!");
    }
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado!");
    }
  }
});

app.put("/users/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const newEmail = req.body.email as string | undefined;
    const newPassword = req.body.password as string | undefined;

    const userToEdit = users.find((user) => user.id === id);

    if (userToEdit) {
      if (newEmail) {
        if (newEmail === undefined || newEmail === "") {
          res.status(400);
          throw new Error("Preencher o email!");
        } else if (typeof newEmail !== "string") {
          res.status(400);
          throw new Error("Email precisa ser uma string!");
        } else if (newEmail === userToEdit.email) {
          res.status(400);
          throw new Error("Email já cadastrado, não ouve mudanças!");
        }
      }
      if (newPassword) {
        if (newPassword === undefined || newPassword === "") {
          res.status(400);
          throw new Error("Preencher o password!");
        } else if (typeof newPassword !== "string") {
          res.status(400);
          throw new Error("Password precisa ser uma string!");
        } else if (newPassword === userToEdit.password) {
          res.status(400);
          throw new Error("Modifique seu password!");
        }
      }

      userToEdit.email = newEmail || userToEdit.email;
      userToEdit.password = newPassword || userToEdit.password;
      res.status(200).send("Cadastro atualizado com sucesso!");
    } else {
      res.status(404);
      throw new Error("Usuário não encontrado!");
    }
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado!");
    }
  }
});

app.put("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newCategory = req.body.category as CATEGORY | undefined;

    const productToEdit = products.find((product) => product.id === id);

    if (productToEdit) {
      if (newName) {
        if (newName === undefined || newName === "") {
          res.status(400);
          throw new Error("Preencher o nome do produto!");
        } else if (typeof newName !== "string") {
          res.status(400);
          throw new Error("Nome precisa ser uma string!");
        }
      }

      if (newPrice) {
        if (newPrice === undefined) {
          res.status(400);
          throw new Error("Preencher o nome do produto!");
        } else if (typeof newPrice !== "number") {
          res.status(400);
          throw new Error("Quantidade precisa ser um número!");
        }
      }

      if (newCategory) {
        if (!Object.values(CATEGORY).includes(newCategory)) {
          res.status(400);
          throw new Error("Categoria não encontrada!");
        }
      }

      productToEdit.name = newName || productToEdit.name;
      productToEdit.price = isNaN(newPrice) ? productToEdit.price : newPrice;
      productToEdit.category = newCategory || productToEdit.category;
      res.status(200).send("Produto atualizado com sucesso!");
    } else {
      res.status(404);
      throw new Error("Produto não encontrado!");
    }
  } catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado!");
    }
  }
});
