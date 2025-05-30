import { ItemVendaInput } from "./ItemVendaInput";

export interface VendaInput {
  cliente_id: number;
  forma_pagamento: string;
  itens: ItemVendaInput[];
}