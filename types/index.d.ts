import { ReactNode } from "react";

export interface ChildProps {
  children: ReactNode;
}

export interface CardType {
  title: string;
  subtitle: string;
  options: string;
  price: string;
  priceId?: string;
}
