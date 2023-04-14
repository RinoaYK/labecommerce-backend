import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/knex";

import {
  CATEGORY,
  TUserDB,
  TProductDB,
  TPurchaseDB,
  TUserPurchaseDB,
  TProductResumeDB,
  TPurchasesDetailedDB,
} from "./types";

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
app.get("/users", async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string | undefined;

    const query = db("users")
      .select("id", "name", "email", "password", "created_at AS createdAt")
      .orderBy("id", "asc");

    if (q !== undefined) {
      query.where("name", "LIKE", `%${q}%`).orWhere("id", "LIKE", `${q}%`);
    }

    const result = await query;
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

//getAllProducts
app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await db("products").orderBy("id", "asc");
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

//searchProductByName
app.get("/product/search", async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;

    if (q.length < 1) {
      res.status(400);
      throw new Error("Query params deve possuir pelo menos 1 caracter!");
    }

    const result = await db
      .select("*")
      .from("products")
      .where("name", "like", `%${q}%`);

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
app.post("/users", async (req: Request, res: Response) => {
  try {
    const { id, name, email, password } = req.body;

    if (id === undefined || id === "") {
      res.status(400);
      throw new Error("Preencher o 'id'!");
    } else if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id' precisa ser uma string!");
    }
    if (id.length < 4) {
      res.status(400);
      throw new Error("'id' deve possuir pelo menos 4 caracteres");
    }
    if (id[0] !== "u") {
      res.status(400);
      throw new Error("'id' deve começar com a letra 'u'!");
    }

    const [idExists]: TUserDB[] | undefined[] = await db("users").where({ id });

    if (idExists) {
      res.status(400);
      throw new Error("O 'id' de usuário já existe!!");
    }

    if (name === undefined || name === "") {
      res.status(400);
      throw new Error("Preencher o nome!");
    } else if (typeof name !== "string") {
      res.status(400);
      throw new Error("Nome precisa ser uma string!");
    }
    if (name.length < 2) {
      res.status(400);
      throw new Error("'name' deve possuir pelo menos 2 caracteres");
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
      throw new Error("Email precisa ser exemplo@mail.com");
    }

    const [emailExists]: TUserDB[] | undefined[] = await db("users").where({
      email,
    });

    if (emailExists) {
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

    const newUser: TUserDB = {
      id,
      name,
      email,
      password,
    };
    await db("users").insert(newUser);
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
app.post("/products", async (req: Request, res: Response) => {
  try {
    const { id, name, price, category, description, imageUrl } = req.body;

    if (id === undefined || id === "") {
      res.status(400);
      throw new Error("Preencher o 'id'!");
    } else if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id' precisa ser uma string!");
    }
    if (id.length < 7) {
      res.status(400);
      throw new Error("'id' deve possuir pelo menos 7 caracteres");
    }
    if (!id.startsWith("prod")) {
      res.status(400);
      throw new Error("O 'id' deve começar com a string 'prod'!");
    }

    const [idExists]: TProductDB[] | undefined[] = await db("products").where({
      id,
    });

    if (idExists) {
      res.status(400);
      throw new Error("O 'id' já existe!!");
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

    const newProduct: TProductDB = {
      id,
      name,
      price,
      category,
      description,
      imageUrl,
    };

    await db("products").insert(newProduct);

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
app.post("/purchases", async (req: Request, res: Response) => {
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

    const [idExists]: TPurchaseDB[] | undefined[] = await db("purchases").where(
      { id }
    );

    if (idExists) {
      res.status(400);
      throw new Error("Compra já existente!");
    }
    if (!id.startsWith("pur")) {
      res.status(400);
      throw new Error("O id deve começar com a string 'pur'!");
    }
    if (id.length < 6) {
      res.status(400);
      throw new Error("'id' deve possuir pelo menos 6 caracteres");
    }

    if (buyer === undefined || buyer === "") {
      res.status(400);
      throw new Error("Preencher o comprador!");
    } else if (typeof buyer !== "string") {
      res.status(400);
      throw new Error("O comprador precisa ser uma string!");
    }

    const [userExists]: TPurchaseDB[] | undefined[] = await db("users").where({
      id: buyer,
    });

    if (!userExists) {
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

    if (
      !Array.isArray(productsP) ||
      productsP.length < 1 ||
      typeof productsP[0] !== "object"
    ) {
      res.status(400);
      throw new Error(
        "O campo products é obrigatório e deve ser um array de objetos."
      );
    }

    let totalPrice = 0;
    const productsWithInfo: Array<{ product: TProductDB; quantity: number }> =
      [];

    for (const product of productsP) {
      if (!product.productId || typeof product.productId !== "string") {
        throw new Error("productId é obrigatório e deve ser uma string.");
      }
      const [productExists]: TProductDB[] | undefined[] = await db(
        "products"
      ).where({ id: product.productId });

      if (!productExists) {
        res.status(404);
        throw new Error(`Produto com id ${product.productId} não encontrado`);
      }

      const productsSet = new Set<string>();
      for (const product of productsP) {
        if (productsSet.has(product.productId)) {
          res.status(404);
          throw new Error(
            `O produto com id ${product.productId} já foi adicionado a sua compra. Só é possível adicionar um id desse produto.`
          );
        }
        productsSet.add(product.productId);
      }

      if (!product.quantity || typeof product.quantity !== "number") {
        throw new Error("quantity é obrigatório e deve ser um número.");
      }
      const productWithInfo = {
        product: productExists,
        quantity: product.quantity,
      };
      productsWithInfo.push(productWithInfo);

      totalPrice += productExists.price * product.quantity;
      totalPrice = Number(totalPrice.toFixed(2));
    }

    const newPurchase: TPurchaseDB = {
      id,
      buyer,
      totalPrice,
      products: productsWithInfo,
    };

    await db("purchases").insert({
      id: newPurchase.id,
      total_price: newPurchase.totalPrice,
      buyer_id: newPurchase.buyer,
    });

    for (const product of newPurchase.products) {
      await db("purchases_products").insert({
        purchase_id: newPurchase.id,
        product_id: product.product.id,
        quantity: product.quantity,
      });
    }

    res.status(201).send("Compra cadastrada com sucesso!");
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
app.get("/purchases", async (req: Request, res: Response) => {
  try {
    const purchases = await db("users")
      .select(
        "purchases.id as purchaseId",
        "users.id as buyerId",
        "users.name as buyerName",
        "users.email as buyerEmail",
        "total_price as totalPrice",
        "purchases.created_at as createdAt ",
        db.raw(
          "CASE WHEN delivered_at IS NULL THEN 'not delivered' ELSE delivered_at END AS deliveredAt"
        ),
        db.raw("CASE WHEN paid = 0 THEN 'not paid' ELSE 'paid' END AS 'isPaid'")
      )
      .innerJoin("purchases", "purchases.buyer_id", "=", "users.id")
      .orderBy("purchases.id", "desc");

    const result = [];
    for (let purchase of purchases) {
      const productsList = await db("purchases_products")
        .select(
          "products.id as id",
          "products.price",
          "purchases_products.quantity"
        )
        .innerJoin(
          "products",
          "purchases_products.product_id",
          "=",
          "products.id"
        )
        .where("purchases_products.purchase_id", "=", purchase.purchaseId);

      const products = productsList.map((product) => {
        const { id, price, quantity } = product;
        return { id, price, quantity };
      }) as TProductResumeDB[];

      const newPurchaseWithProducts: TUserPurchaseDB = {
        ...purchase,
        productsList: products,
      };

      result.push(newPurchaseWithProducts);
    }

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

//GetProductsById
app.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await db("products").where("id", "LIKE", `${id}`);

    if (result.length > 0) {
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
app.get("/users/:id/purchases", async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const [result] = await db("users").where({ id: userId });

    if (result) {
      const [userPurchase] = await db("purchases").where({ buyer_id: userId });
      if (userPurchase) {
        const purchases = await db("users")
          .select(
            "purchases.id as purchaseId",
            "users.id as buyerId",
            "users.name as buyerName",
            "users.email as buyerEmail",
            "total_price as totalPrice",
            "purchases.created_at as createdAt ",
            db.raw(
              "CASE WHEN delivered_at IS NULL THEN 'not delivered' ELSE delivered_at END AS deliveredAt"
            ),
            db.raw(
              "CASE WHEN paid = 0 THEN 'not paid' ELSE 'paid' END AS 'isPaid'"
            )
          )
          .innerJoin("purchases", "purchases.buyer_id", "=", "users.id")
          .where("purchases.buyer_id", "=", userId)
          .orderBy("purchases.id", "desc");

        const purchasesWithProducts = [];
        for (const purchase of purchases) {
          const productsList: TProductDB[] = await db("purchases_products")
            .select(
              "products.id as id",
              "products.price",
              "purchases_products.quantity"
            )
            .innerJoin(
              "products",
              "purchases_products.product_id",
              "=",
              "products.id"
            )
            .where("purchases_products.purchase_id", "=", purchase.purchaseId);

          const detailedPurchase: TPurchasesDetailedDB = {
            ...purchase,
            productsList,
          };

          purchasesWithProducts.push(detailedPurchase);
        }

        res.status(200).send(purchasesWithProducts);
      } else {
        res.status(404);
        throw new Error("Usuário não possui nenhuma compra!");
      }
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
app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;
    const [userExists]: TUserDB[] | undefined[] = await db("users").where({
      id: idToDelete,
    });

    if (!userExists) {
      res.status(404);
      throw new Error("Usuário não encontrado!");
    }

    const purchases = await db("purchases").where({ buyer_id: idToDelete });
    for (let purchase of purchases) {
      await db("purchases_products").del().where({ purchase_id: purchase.id });
    }

    await db("purchases").del().where({ buyer_id: idToDelete });
    await db("users").del().where({ id: idToDelete });
    res.status(200).send("Usuário apagado com sucesso!");
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
app.delete("/products/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;
    const [productExists]: TProductDB[] | undefined[] = await db(
      "products"
    ).where({
      id: idToDelete,
    });

    if (!productExists) {
      res.status(404);
      throw new Error("Produto não encontrado!");
    }

    const purchases = await db("purchases_products")
      .select("purchase_id", "quantity")
      .where({ product_id: idToDelete });

    for (let purchase of purchases) {
      const purchaseDetails = await db("purchases")
        .select("total_price")
        .where({ id: purchase.purchase_id })
        .first();

      const productDetails = await db("products")
        .select("price")
        .where({ id: idToDelete })
        .first();

      const totalPrice =
        purchaseDetails.total_price - productDetails.price * purchase.quantity;

      await db("purchases")
        .where({ id: purchase.purchase_id })
        .update({ total_price: totalPrice.toFixed(2) });

      await db("purchases_products")
        .where({ purchase_id: purchase.purchase_id, product_id: idToDelete })
        .del();
    }
    await db("purchases")
      .whereNotIn("id", function () {
        this.select("purchase_id").from("purchases_products");
      })
      .del();

    await db("products").del().where({ id: idToDelete });
    res.status(200).send("Produto apagado com sucesso!");
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
app.put("/users/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const userId = req.body.id;
    if (userId) {
      throw new Error("Não é possível atualizar o id do usuário.");
    }

    const newName = req.body.name as string | undefined;
    const newEmail = req.body.email as string | undefined;
    const newPassword = req.body.password as string | undefined;

    const [userToEdit]: TUserDB[] | undefined[] = await db("users").where({
      id,
    });

    if (userToEdit) {
      if (newName) {
        if (typeof newName !== "string") {
          res.status(400);
          throw new Error("Nome precisa ser uma string!");
        } else if (newName.length < 2) {
          res.status(400);
          throw new Error("'name' deve possuir pelo menos 2 caracteres");
        } else if (newName === userToEdit.name) {
          res.status(400);
          throw new Error("Não houve modificações no nome!");
        }
      }
      if (newEmail) {
        const [emailExists]: TUserDB[] | undefined[] = await db("users").where({
          email: newEmail,
        });
        if (emailExists) {
          res.status(400);
          throw new Error("Email já cadastrado!");
        } else {
          if (typeof newEmail !== "string") {
            res.status(400);
            throw new Error("Email precisa ser uma string!");
          } else if (
            !newEmail.match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$")
          ) {
            res.status(400);
            throw new Error("Email precisa ser exemplo@mail.com");
          }
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

      const newUser: TUserDB = {
        id,
        name: newName || userToEdit.name,
        email: newEmail || userToEdit.email,
        password: newPassword || userToEdit.password,
      };

      await db("users").update(newUser).where({ id });

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
app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newId = req.body.id as string | undefined;
    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newCategory = req.body.category as CATEGORY | undefined;
    const newDescription = req.body.description as string | undefined;
    const newImageUrl = req.body.imageUrl as string | undefined;

    const [productToEdit]: TProductDB[] | undefined[] = await db(
      "products"
    ).where({
      id,
    });

    if (productToEdit) {
      if (newId) {
        const [idExists]: TProductDB[] | undefined[] = await db(
          "products"
        ).where({
          id: newId,
        });

        if (!idExists) {
          if (typeof newName !== "string") {
            res.status(400);
            throw new Error("Nome precisa ser uma string!");
          }
          if (newId.length < 7) {
            res.status(400);
            throw new Error("'id' deve possuir pelo menos 7 caracteres");
          }
          if (!newId.startsWith("prod")) {
            res.status(400);
            throw new Error("O 'id' deve começar com a string 'prod'!");
          }
        } else {
          res.status(400);
          throw new Error("O 'id' já existe!!");
        }
      }

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

      const newProduct: TProductDB = {
        id: newId || productToEdit.id,
        name: newName || productToEdit.name,
        price: isNaN(newPrice) ? productToEdit.price : newPrice,
        category: newCategory || productToEdit.category,
        description: newDescription || productToEdit.description,
        imageUrl: newImageUrl || productToEdit.imageUrl,
      };

      await db("products").update(newProduct).where({ id });
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
app.delete("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;
    const [purchaseExists]: TPurchaseDB[] | undefined[] = await db(
      "purchases"
    ).where({
      id: idToDelete,
    });

    if (!purchaseExists) {
      res.status(404);
      throw new Error("Pedido não encontrado!");
    }

    await db("purchases_products").del().where({ purchase_id: idToDelete });
    await db("purchases").del().where({ id: idToDelete });
    res.status(200).send("Pedido cancelado com sucesso!");
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
app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const purchaseId = req.params.id;

    const [result] = await db("purchases").where({ id: purchaseId });

    if (result) {
      const [purchase] = await db("users")
        .select(
          "purchases.id as purchaseId",
          "users.id as buyerId",
          "users.name as buyerName",
          "users.email as buyerEmail",
          "total_price as totalPrice",
          "purchases.created_at as createdAt ",
          db.raw(
            "CASE WHEN delivered_at IS NULL THEN 'not delivered' ELSE delivered_at END AS deliveredAt"
          ),
          "paid"
        )
        .innerJoin("purchases", "purchases.buyer_id", "=", "users.id")
        .where("purchases.id", "=", purchaseId)
        .orderBy("purchases.id", "desc");

      const products = await db("purchases_products")
        .select(
          "products.id as id",
          "products.name as name",
          "products.price",
          "products.category",
          "products.description",
          "products.imageUrl",
          "purchases_products.quantity"
        )
        .innerJoin(
          "products",
          "purchases_products.product_id",
          "=",
          "products.id"
        )
        .where("purchases_products.purchase_id", "=", purchaseId);

      const result = { ...purchase, products };
      res.status(200).send(result);
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

// editPurchaseById
app.put("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const purchaseId = req.body.id;
    if (purchaseId) {
      throw new Error("Não é possível mudar o id da compra.");
    }
    const changeBuyer = req.body.buyer;
    if (changeBuyer) {
      throw new Error("Não é possível mudar o id do comprador.");
    }
    const productsP = req.body.products;
    if (productsP) {
      throw new Error("Não é possível mudar os produtos da compra.");
    }

    const paidStatus = req.body.paid as number | undefined;
    const deliveredAt = req.body.deliveredAt as string | number | undefined;

    const [purchaseEdit] = await db("purchases").where({
      id,
    });

    if (purchaseEdit) {
      if (paidStatus) {
        if (typeof paidStatus !== "number") {
          res.status(400);
          throw new Error("'paid' precisa ser um number!");
        } else if (paidStatus !== 0 && paidStatus !== 1) {
          res.status(400);
          throw new Error(
            "O valor de 'paid' precisa ser 0 (not paid) ou 1 (paid)"
          );
        } else if (paidStatus === purchaseEdit.paid) {
          res.status(400);
          throw new Error("Não houve modificações no status de pagamento!");
        }
      }

      if (deliveredAt) {
        const moment = require("moment");
        let updatedDeliveredAt = deliveredAt;
        if (typeof deliveredAt === "string") {
          const momentDeliveredAt = moment(deliveredAt, "YYYY-MM-DD HH:mm:ss");
          if (!momentDeliveredAt.isValid()) {
            res.status(400);
            throw new Error(
              "'deliveredAt' precisa estar no formato 'YYYY-MM-DD HH:mm:ss'"
            );
          }
        } else if (typeof deliveredAt === "number") {
          if (deliveredAt === 1) {
            const now = moment();
            updatedDeliveredAt = now.format("YYYY-MM-DD HH:mm:ss");
            console.log(updatedDeliveredAt);
          } else {
            res.status(400);
            throw new Error(
              "Mude o valor para 1 e 'deliveredAt' será criado automaticamente com a data atual!"
            );
          }
        }

        await db("purchases")
          .where({ id })
          .update({
            paid: isNaN(paidStatus) ? purchaseEdit.paid : paidStatus,
            delivered_at: updatedDeliveredAt || purchaseEdit.delivered_at,
          });
      }

      res.status(200).send("Compra atualizada com sucesso!");
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
