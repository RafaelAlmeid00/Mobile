export interface ICard {
  CardId: string;

  CardValidade: string;

  CardSaldo: string;

  CardTipo: string;

  CardStatus: string;

  CardUltimoUso: Date;

  CardUltimoOnibus: string;

  RequestCardReqId: string;
}

export type ICardIndex = {
  [key: string]: string | number | undefined;
};
