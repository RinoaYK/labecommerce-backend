import { TUser, TProduct, TPurchase, CATEGORY } from "./types";

const date = new Date();
const year = date.getFullYear();
const month = (date.getMonth() + 1).toString().padStart(2, "0");
const day = date.getDate().toString().padStart(2, "0");
const hours = date.getHours().toString().padStart(2, "0");
const minutes = date.getMinutes().toString().padStart(2, "0");
const seconds = date.getSeconds().toString().padStart(2, "0");

export const dateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

export const users: TUser[] = [
  {
    id: "u001",
    name: "Fulano",
    email: "fulano@email.com",
    password: "fulano123",
    createdAt: "2023-01-15 09:12:42",
  },
  {
    id: "u002",
    name: "Ciclana",
    email: "ciclana@email.com",
    password: "ciclana99",
    createdAt: "2023-01-17 12:35:28",
  },
  {
    id: "u002",
    name: "Beltrano",
    email: "beltrano@email.com",
    password: "beltrano00",
    createdAt: "2023-02-22 15:50:49",
  },
];

export const products: TProduct[] = [
  {
    id: "prod001",
    name: "Foguete de Brinquedo",
    price: 29.99,
    category: CATEGORY.TOYS,
    description:
      "Este foguete de brinquedo é altamente detalhado e vem com uma variedade de acessórios, incluindo adesivos de planetas e estrelas.",
    imageUrl:
      "https://github.com/RinoaYK/projeto-frontendreact/blob/main/src/img/items/img1.png?raw=true",
  },
  {
    id: "prod002",
    name: "Camiseta Sistema Solar",
    category: CATEGORY.TSHIRTS,
    price: 29.99,
    description:
      "Esta camiseta é feita de algodão macio e tem uma estampa do Sistema Solar na frente.",
    imageUrl:
      "https://github.com/RinoaYK/projeto-frontendreact/blob/main/src/img/items/img2.png?raw=true",
  },
  {
    id: "prod003",
    name: "3D Sistema Solar",
    category: CATEGORY.TOYS,
    price: 89.99,
    description:
      "Construa seu próprio satélite com este kit de montagem, inclui peças e instruções detalhadas, brilha no escuro!",
    imageUrl:
      "https://github.com/RinoaYK/projeto-frontendreact/blob/main/src/img/items/img3.png?raw=true",
  },
  {
    id: "prod010",
    name: "Poster 'Sistema Solar'",
    price: 29.99,
    category: CATEGORY.TOYS,
    description:
      "Decore sua sala de estudo ou quarto com este poster do Sistema Solar, mostra todos os planetas e suas órbitas.",
    imageUrl:
      "https://github.com/RinoaYK/projeto-frontendreact/blob/main/src/img/items/img10.png?raw=true",
  },
  {
    id: "prod040",
    name: "Chaveiro Millennium Falcon",
    price: 24.99,
    category: CATEGORY.ACESSORIES,
    description: "Um chaveiro oficial da nave Millennium Falcon.",
    imageUrl:
      "https://github.com/RinoaYK/projeto-frontendreact/blob/main/src/img/items/img40.png?raw=true",
  },
  {
    id: "prod053",
    name: "Camiseta Astronauta",
    price: 25.3,
    category: CATEGORY.TSHIRTS,
    description:
      "Mostre sua paixão pelo espaço com essa camiseta incrível. Com um design realista de um astronauta em cima de um planeta.",
    imageUrl:
      "https://github.com/RinoaYK/projeto-frontendreact/blob/main/src/img/items/img53.png?raw=true",
  },
];

export function calculateTotalPrice(productId: string, quantity: number): number {
  const product = products.find((p) => p.id === productId);
  if (!product) {
    throw new Error(`Product with id ${productId} not found.`);
  }
  const totalPrice = product.price * quantity;
  return Number(totalPrice.toFixed(2));
}

export const purchases: TPurchase[] = [
  {
    id: "pur001",
    buyer: "u001",
    totalPrice:
      calculateTotalPrice("prod001", 2) + calculateTotalPrice("prod002", 1),
    products: [
      {
        product: {
          id: "prod001",
          name: "Foguete de Brinquedo",
          price: 29.99,
          category: CATEGORY.TOYS,
          description:
            "Este foguete de brinquedo é altamente detalhado e vem com uma variedade de acessórios, incluindo adesivos de planetas e estrelas.",
          imageUrl:
            "https://github.com/RinoaYK/projeto-frontendreact/blob/main/src/img/items/img1.png?raw=true",
        },
        quantity: 2,
      },
      {
        product: {
          id: "prod002",
          name: "Camiseta Sistema Solar",
          category: CATEGORY.TSHIRTS,
          price: 29.99,
          description:
            "Esta camiseta é feita de algodão macio e tem uma estampa do Sistema Solar na frente.",
          imageUrl:
            "https://github.com/RinoaYK/projeto-frontendreact/blob/main/src/img/items/img2.png?raw=true",
        },
        quantity: 1,
      },
    ],
  },
  {
    id: "pur002",
    buyer: "u002",
    totalPrice:
      calculateTotalPrice("prod040", 5) + calculateTotalPrice("prod010", 2),
    products: [
      {
        product: {
          id: "prod040",
          name: "Chaveiro Millennium Falcon",
          price: 24.99,
          category: CATEGORY.ACESSORIES,
          description: "Um chaveiro oficial da nave Millennium Falcon.",
          imageUrl:
            "https://github.com/RinoaYK/projeto-frontendreact/blob/main/src/img/items/img40.png?raw=true",
        },
        quantity: 5,
      },
      {
        product: {
          id: "prod010",
          name: "Poster 'Sistema Solar'",
          price: 29.99,
          category: CATEGORY.TOYS,
          description:
            "Decore sua sala de estudo ou quarto com este poster do Sistema Solar, mostra todos os planetas e suas órbitas.",
          imageUrl:
            "https://github.com/RinoaYK/projeto-frontendreact/blob/main/src/img/items/img10.png?raw=true",
        },
        quantity: 2,
      },
    ],
  },
];