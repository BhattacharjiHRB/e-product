export interface AuthState {
  isLoggedIn: boolean;
  email: string | null;
  token: string | null;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  createdAt?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  slug: string;
  category: Category;
  categoryId?: string;
}
