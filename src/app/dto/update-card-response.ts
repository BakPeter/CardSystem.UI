import { Card } from '../models/card.model';

export interface UpdateCardResponse {
  updatedCard: Card;
  error: 'string';
}
