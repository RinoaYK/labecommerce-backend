export type TUser = {
  id: string;
  email: string;
  password: string;
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
  category: CATEGORY
};

export type TPurchase = {
  userId: string;
  productId: string;
  quantity: number;
  totalPrice: number;
};
