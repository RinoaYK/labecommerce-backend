import express, { Request, Response } from "express";
import cors from "cors";
import {
  users,
  products,
  purchases,
  calculateTotalPrice,
  dateString,
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

//getAllUsers
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

//getAllProducts
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

//searchProductByName
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

//createUser
app.post("/users", (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (id === undefined || id === "") {
      res.status(400);
      throw new Error("Preencher o id!");
    } else if (typeof id !== "string") {
      res.status(400);
      throw new Error("Id precisa ser uma string!");
    }

    if (id[0] !== "u") {
      res.status(400);
      throw new Error("O id deve começar com a letra 'u'!");
    }

    const userExists = users.filter((user) => {
      return user.id === id;
    });

    if (userExists.length > 0) {
      res.status(400);
      throw new Error("o usúário já existe!!");
    }

    if (name === undefined || name === "") {
      res.status(400);
      throw new Error("Preencher o nome!");
    } else if (typeof name !== "string") {
      res.status(400);
      throw new Error("Nome precisa ser uma string!");
    }

    const nameExists = users.filter((user) => {
      return user.name === name;
    });

    if (nameExists.length > 0) {
      res.status(400);
      throw new Error("o usúário já existe!!");
    }

    if (email === undefined || email === "") {
      res.status(400);
      throw new Error("Preencher o email!");
    } else if (typeof email !== "string") {
      res.status(400);
      throw new Error("Email precisa ser uma string!");
    } else if (
      !email.match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$")
    ) {
      res.status(400);
      throw new Error("Email precisa ser exemplo@gmail.com");
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
    } else if (password.length < 7) {
      res.status(400);
      throw new Error("A senha deve conter no mínimo 7 caracteres!");
    }

    const regexLetters = /[a-zA-Z]/g;
    const regexNumbers = /\d/g;

    const lettersMatch = password.match(regexLetters);
    if (!lettersMatch || lettersMatch.length < 3) {
      res.status(400);
      throw new Error("A senha deve conter pelo menos 3 letras!");
    }

    const numbersMatch = password.match(regexNumbers);
    if (!numbersMatch || numbersMatch.length < 2) {
      res.status(400);
      throw new Error("A senha deve conter pelo menos 2 números!");
    }

    const newUser: TUser = {
      id,
      name,
      email,
      password,
      createdAt: dateString,
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

//createProduct
app.post("/products", (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;

    if (id === undefined || id === "") {
      res.status(400);
      throw new Error("Preencher o id!");
    } else if (typeof id !== "string") {
      res.status(400);
      throw new Error("Id precisa ser uma string!");
    }

    if (!id.startsWith("prod")) {
      res.status(400);
      throw new Error("O id deve começar com a string 'prod'!");
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

    if (description === undefined || description === "") {
      res.status(400);
      throw new Error("Preencher o descrição!");
    } else if (typeof description !== "string") {
      res.status(400);
      throw new Error("A descrição precisa ser uma string!");
    }

    if (imageUrl === undefined || imageUrl === "") {
      res.status(400);
      throw new Error("Preencher a url da imagem!");
    } else if (typeof imageUrl !== "string") {
      res.status(400);
      throw new Error("A url da imagem precisa ser uma string!");
    }

    const newProduct: TProduct = {
      id,
      name,
      price,
      category,
      description,
      imageUrl,
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

//createPurchase
app.post("/purchases", (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const buyer = req.body.buyer;
    const productsP = req.body.products;

    if (id === undefined || id === "") {
      res.status(400);
      throw new Error("Preencher o id da compra!");
    } else if (typeof id !== "string") {
      res.status(400);
      throw new Error("O id precisa ser uma string!");
    }
    const IdExists = purchases.filter((purchase) => {
      return purchase.id === id;
    });
    if (IdExists.length > 0) {
      res.status(400);
      throw new Error("Compra já existente!");
    }
    if (!id.startsWith("pur")) {
      res.status(400);
      throw new Error("O id deve começar com a string 'pur'!");
    }

    if (buyer === undefined || buyer === "") {
      res.status(400);
      throw new Error("Preencher o comprador!");
    } else if (typeof buyer !== "string") {
      res.status(400);
      throw new Error("O comprador precisa ser uma string!");
    }
    const userExists = users.filter((user) => {
      return user.id === buyer;
    });

    if (userExists.length === 0) {
      res.status(400);
      throw new Error("Por favor, realize seu cadastro primeiro!");
    }

    if (!productsP) {
      res.status(400);
      throw new Error("Preencha os produtos da compra!");
    } else {
      for (const product of req.body.products) {
        if (!product.productId || !product.quantity) {
          res.status(400);
          throw new Error(
            "Os produtos da compra precisam ter id e quantidade!"
          );
        }
      }
    }

    if (!Array.isArray(productsP)) {
      throw new Error("O campo products é obrigatório e deve ser um array.");
    }
    let totalPrice = 0;
    const productsWithInfo: Array<{ product: TProduct; quantity: number }> = [];
    for (const product of productsP) {
      if (!product.productId || typeof product.productId !== "string") {
        throw new Error("productId é obrigatório e deve ser uma string.");
      }
      const productExists = products.find((p) => p.id === product.productId);

      if (!productExists) {
        res.status(404);
        throw new Error(`Produto com id ${product.productId} não encontrado`);
      }
      if (!product.quantity || typeof product.quantity !== "number") {
        throw new Error("quantity é obrigatório e deve ser um número.");
      }
      const productWithInfo = {
        product: productExists,
        quantity: product.quantity,
      };
      productsWithInfo.push(productWithInfo);
      const productTotalPrice = calculateTotalPrice(
        product.productId,
        product.quantity
      );
      totalPrice += productTotalPrice;
    }
    const newPurchase: TPurchase = {
      id,
      buyer,
      totalPrice,
      products: productsWithInfo,
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

//getAllPurchases
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

//GetProductsById
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

//GetUserPurchasesByUserId
app.get("/users/:id/purchases", (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const result = purchases.find((user) => user.buyer === userId);
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

//DeleteUserById
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

//DeleteProductById
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

// EditUserById
app.put("/users/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newName = req.body.name as string | undefined;
    const newEmail = req.body.email as string | undefined;
    const newPassword = req.body.password as string | undefined;

    const userToEdit = users.find((user) => user.id === id);

    if (userToEdit) {
      if (newName) {
        if (typeof newName !== "string") {
          res.status(400);
          throw new Error("Nome precisa ser uma string!");
        } else if (newName === userToEdit.name) {
          res.status(400);
          throw new Error("Nome já cadastrado, não ouve mudanças!");
        }
      }
      if (newEmail) {
        if (typeof newEmail !== "string") {
          res.status(400);
          throw new Error("Email precisa ser uma string!");
        } else if (newEmail === userToEdit.email) {
          res.status(400);
          throw new Error("Email já cadastrado, não ouve mudanças!");
        }
      }
      if (newPassword) {
        if (typeof newPassword !== "string") {
          res.status(400);
          throw new Error("Password precisa ser uma string!");
        } else if (newPassword === userToEdit.password) {
          res.status(400);
          throw new Error("Modifique seu password!");
        } else if (newPassword.length < 7) {
          res.status(400);
          throw new Error("A senha deve conter no mínimo 7 caracteres!");
        }

        const regexLetters = /[a-zA-Z]/g;
        const regexNumbers = /\d/g;

        const lettersMatch = newPassword.match(regexLetters);
        if (!lettersMatch || lettersMatch.length < 3) {
          res.status(400);
          throw new Error("A senha deve conter pelo menos 3 letras!");
        }

        const numbersMatch = newPassword.match(regexNumbers);
        if (!numbersMatch || numbersMatch.length < 2) {
          res.status(400);
          throw new Error("A senha deve conter pelo menos 2 números!");
        }
      }

      userToEdit.name = newName || userToEdit.name;
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

//EditProductById
app.put("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newCategory = req.body.category as CATEGORY | undefined;
    const newDescription = req.body.description as string | undefined;
    const newImageUrl = req.body.imageUrl as string | undefined;

    const productToEdit = products.find((product) => product.id === id);

    if (productToEdit) {
      if (newName) {
        if (typeof newName !== "string") {
          res.status(400);
          throw new Error("Nome precisa ser uma string!");
        }
      }

      if (newPrice) {
        if (typeof newPrice !== "number") {
          res.status(400);
          throw new Error("O preço precisa ser um número!");
        }
      }

      if (newCategory) {
        if (!Object.values(CATEGORY).includes(newCategory)) {
          res.status(400);
          throw new Error("Categoria não encontrada!");
        }
      }

      if (newDescription) {
        if (typeof newDescription !== "string") {
          res.status(400);
          throw new Error("A descrição precisa ser uma string!");
        } else if (newDescription.length < 10) {
          res.status(400);
          throw new Error("A descrição deve conter no mínimo 10 caracteres!");
        }
      }

      if (newImageUrl) {
        if (typeof newImageUrl !== "string") {
          res.status(400);
          throw new Error("A nova url precisa ser uma string!");
        }
      }

      productToEdit.name = newName || productToEdit.name;
      productToEdit.price = isNaN(newPrice) ? productToEdit.price : newPrice;
      productToEdit.category = newCategory || productToEdit.category;
      productToEdit.description = newDescription || productToEdit.description;
      productToEdit.imageUrl = newImageUrl || productToEdit.imageUrl;

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

//deletePurchaseById
app.delete("/purchases/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const indexPurchaseToDelete = purchases.findIndex(
      (purchase) => purchase.id === id
    );
    if (indexPurchaseToDelete >= 0) {
      purchases.splice(indexPurchaseToDelete, 1);
      res.status(200).send("Pedido cancelado com sucesso!");
    } else {
      res.status(404);
      throw new Error("Pedido não encontrado!");
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

//getPurchaseById
app.get("/purchases/:id", (req: Request, res: Response) => {
  try {
    const purchaseId = req.params.id;
    const result = purchases.find((purchase) => purchase.id === purchaseId);
    if (result) {
      const user = users.find((user) => user.id === result.buyer);
      const purchase = {
        purchaseId: result.id,
        buyerId: result.buyer,
        buyerName: user.name,
        buyerEmail: user.email,
        totalPrice: result.totalPrice,
        createdAt: user.createdAt,
        paid: 0,
        products: [...result.products],
      };
      res.status(200).send(purchase);
    } else {
      res.status(404);
      throw new Error("Compra não encontrada!");
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
