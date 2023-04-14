export enum CATEGORY {
  ACESSORIES = "Acessórios",
  TOYS = "Brinquedos",
  TSHIRTS = "Camisetas",
  DECORATION = "Decoração",
  GAMES = "Jogos",
  BOOKS = "Livros",
  PLUSHS = "Pelúcias",
}

export type TUserDB = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type TProductDB = {
  id: string;
  name: string;
  price: number;
  category: CATEGORY;
  description: string;
  imageUrl: string;
};

export type TPurchaseDB = {
  id: string;
  buyer: string;
  totalPrice: number;
  products: Array<{
    product: TProductDB;
    quantity: number;
  }>;
};

export type TProductResumeDB = {
  id: string;  
  price: number;
  quantity: number;
};

export type TUserPurchaseDB = {
  purchaseId: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  totalPrice: number;
  createdAt: string;
  deliveredAt: string;
  isPaid: string;
  productsList: TProductResumeDB[];
};

export type TPurchasesDetailedDB = {
  purchaseId: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  totalPrice: number;
  createdAt: string;
  deliveredAt: string;
  isPaid: string;
  productsList: TProductDB[];
};