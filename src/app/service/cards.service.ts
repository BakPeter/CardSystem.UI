import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GetAllCardsResponse } from '../dto/get-all-cards-response';
import { AddCardResponse } from '../dto/add-card-response';
import { AddCardRequest } from '../dto/add-card-request';
import { DeleteCardResponse } from '../dto/delete-card-response';
import { UpdateCardRequest } from '../dto/update-card-request';
import { UpdateCardResponse } from '../dto/update-card-response';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  baseUrl = 'https://localhost:7030/api/Cards';

  constructor(private http: HttpClient) {}

  getAllCards(): Observable<GetAllCardsResponse> {
    return this.http.get<GetAllCardsResponse>(this.baseUrl);
  }

  addCard(addCardRequest: AddCardRequest): Observable<AddCardResponse> {
    return this.http.post<AddCardResponse>(this.baseUrl, addCardRequest);
  }

  updateCard(
    updateCardRequest: UpdateCardRequest
  ): Observable<UpdateCardResponse> {
    return this.http.put<UpdateCardResponse>(
      this.baseUrl + '/' + updateCardRequest.cardId,
      updateCardRequest
    );
  }

  deleteCard(id: string): Observable<DeleteCardResponse> {
    // console.log(this.baseUrl + '/' + id);
    return this.http.delete<DeleteCardResponse>(this.baseUrl + '/' + id);
  }
}
