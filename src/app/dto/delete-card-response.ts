import { Card } from '../models/card.model';

export interface DeleteCardResponse {
  cardDeleted: boolean;
  deletedCard: Card;
  error: string;
}
