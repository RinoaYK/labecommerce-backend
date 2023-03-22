import { TUser, TProduct, TPurchase, CATEGORY } from "./types";

export const users: TUser[] = [
  {
    id: "rinoayk",
    email: "rinoayk@gmail.com",
    password: "rinoayk123",
  },
  {
    id: "raito",
    email: "raito@gmail.com",
    password: "raito123",
  },
];

export const products: TProduct[] = [
  {
    id: "Chaveiro Millennium Falcon",
    name: "Chaveiro Millennium Falcon",
    price: 24.99,
    category: CATEGORY.ACESSORIES,
  },
  {
    id: "Camiseta Astronauta",
    name: "Camiseta Astronauta",
    price: 25.3,
    category: CATEGORY.TSHIRTS,
  },
];

function calculateTotalPrice(productId: string, quantity: number) {
  const product = products.find((p) => p.id === productId);
  if (!product) {
    throw new Error(`Produto ${productId} não encontrado!`);
  }
  return product.price * quantity;
}

export const purchases: TPurchase[] = [
  {
    userId: "rinoayk",
    productId: "Chaveiro Millennium Falcon",
    quantity: 2,
    totalPrice: calculateTotalPrice("Chaveiro Millennium Falcon", 2),
  },
  {
    userId: "raito",
    productId: "Camiseta Astronauta",
    quantity: 3,
    totalPrice: calculateTotalPrice("Camiseta Astronauta", 3),
  },
];

// export const purchases: TPurchase[] = [
//   {
//     userId: users[0].id,
//     productId: products[0].id,
//     quantity: 2,
//     totalPrice: products[0].price * 2,
//   },
//   {
//     userId: users[1].id,
//     productId: products[1].id,
//     quantity: 3,
//     totalPrice: products[1].price * 3,
//   },
// ];

// const users: TUser[] = [];
// posts: TPost[], autorInformado: string): TPost[]

export function createUser(
  id: string,
  email: string,
  password: string
): string {
  const newUser: TUser = { id, email, password };
  users.push(newUser);
  return "Cadastro realizado com sucesso";
}

export function getAllUsers(): TUser[] {
  return users;
}

// console.log(createUser("kabo", "kabo@gmail.com", "kabo123"));
// console.log(getAllUsers());

// const products: TProduct[] = [];

export function createProduct(
  id: string,
  name: string,
  price: number,
  category: CATEGORY
): string {
  const newProduct: TProduct = { id, name, price, category };
  products.push(newProduct);
  return `"${newProduct.name}" criado com sucesso!`;
}

export function getAllProducts(): TProduct[] {
  return products;
}

export function getProductById(idToSearch: string): TProduct | undefined {
  return products.find((product) => product.id === idToSearch);
}

// console.log("Novo Produto:", createProduct("Pelúcia Astronauta", "Pelúcia Astronauta", 15.99, CATEGORY.PLUSHS))
// console.log("Todos os produtos:", getAllProducts())
// console.log("Busca por Id:",getProductById("Pelúcia Astronauta"))

export function queryProductsByName(q: string): TProduct[] {
  const result = products.filter((product) =>
    product.name.toLowerCase().includes(q.toLowerCase())
  );
  return result;
}
// console.log("Buscando produto por name em filter", queryProductsByName("mil"))

// function createPurchase(userId: string, productId: string, quantity: number, totalPrice: number): string {
//   const newPurchase: TPurchase = { userId, productId, quantity, totalPrice };
//   purchases.push(newPurchase);
//   return "Compra realizada com sucesso";
// }
export function createPurchase(
  userId: string,
  productId: string,
  quantity: number
): string {
  const totalPrice = calculateTotalPrice(productId, quantity);
  const newPurchase: TPurchase = { userId, productId, quantity, totalPrice };
  purchases.push(newPurchase);
  return "Compra realizada com sucesso!";
}

export function getAllPurchasesFromUserId(userIdToSearch: string): TPurchase[] {
  return purchases.filter((purchase) => purchase.userId === userIdToSearch);
}

// console.log(createPurchase("rinoayk", "Camiseta Astronauta",5))
// console.log(getAllPurchasesFromUserId("rinoayk"))
