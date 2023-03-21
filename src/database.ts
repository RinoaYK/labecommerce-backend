import { TUser, TProduct, TPurchase } from "./types";

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
    category: "Acessórios",
  },
  {
    id: "Camiseta Astronauta",
    name: "Camiseta Astronauta",
    price: 25.3,
    category: "Camisetas",
  },
];


function calculateTotalPrice(productId: string, quantity: number) {
  const product = products.find((p) => p.id === productId);
  if (!product) {
    throw new Error(`Produto ${productId} não encontrado!`);
  }
  return product.price * quantity;
}

// export const purchases: TPurchase[] = [
//   {
//     userId: "rinoayk",
//     productId: "Chaveiro Millennium Falcon",
//     quantity: 2,
//     totalPrice: calculateTotalPrice("Chaveiro Millennium Falcon", 2),
//   },
//   {
//     userId: "raito",
//     productId: "Camiseta Astronauta",
//     quantity: 3,
//     totalPrice: calculateTotalPrice("Camiseta Astronauta", 3),
//   },
// ];

export const purchases: TPurchase[] = [
    {
      userId: users[0].id,
      productId: products[0].id,
      quantity: 2,
      totalPrice: products[0].price * 2,
    },
    {
      userId: users[1].id,
      productId: products[1].id,
      quantity: 3,
      totalPrice: products[1].price * 3,
    },
  ];