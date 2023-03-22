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
} from "./database";

import { CATEGORY } from "./types";

console.log("usuários:", users);
console.log("produtos:", products);
console.log("compras:", purchases);

console.log(createUser("kabo", "kabo@gmail.com", "kabo123"));
console.log(getAllUsers());

console.log("Novo Produto:", createProduct("Pelúcia Astronauta", "Pelúcia Astronauta", 15.99, CATEGORY.PLUSHS))
console.log("Todos os produtos:", getAllProducts())
console.log("Busca por Id:",getProductById("Pelúcia Astronauta"))

console.log("Buscando produto por name em filter", queryProductsByName("mil"))

console.log(createPurchase("rinoayk", "Camiseta Astronauta",5))
console.log(getAllPurchasesFromUserId("rinoayk"))
