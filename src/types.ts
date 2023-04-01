export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string; // formato: YYYY-MM-DD HH:MM:SS
};

export enum CATEGORY {
  ACESSORIES = "Acessórios",
  TOYS = "Brinquedos",
  TSHIRTS = "Camisetas",
  DECORATION = "Decoração",
  GAMES = "Jogos",
  BOOKS = "Livros",
  PLUSHS = "Pelúcias",
}

export type TProduct = {
  id: string;
  name: string;
  price: number;
  category: CATEGORY;
  description: string;
  imageUrl: string;
};

export type TPurchase = {
  id: string,
  buyer: string,
  totalPrice: number,
  products: Array<{
    product: TProduct,
    quantity: number
  }>
};
