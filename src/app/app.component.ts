import { Component, OnInit } from '@angular/core';

import { CardsService } from './service/cards.service';
import { Card } from './models/card.model';
import { AddCardRequest } from './dto/add-card-request';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'CardsSystem-Ui';

  cards: Card[] = [];
  card: Card = {
    id: '',
    cardHolderName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: '',
  };

  constructor(private cardsService: CardsService) {}

  ngOnInit(): void {
    this.getAllCards();
  }

  getAllCards() {
    this.cardsService.getAllCards().subscribe((response) => {
      // console.log(response);
      this.cards = response.cards;
    });
  }

  onSubmit() {
    // console.log(this.card);
    if (this.card.id === '') {
      this.addCard();
    } else {
      this.updateCard();
    }
  }

  updateCard() {
    console.log('update card');
    this.cardsService
      .updateCard({
        cardId: this.card.id,
        cardHolderName: this.card.cardHolderName,
        cardNumber: this.card.cardNumber,
        expiryMonth: this.card.expiryMonth,
        expiryYear: this.card.expiryYear,
        cvc: this.card.cvc,
      })
      .subscribe((response) => {
        console.log(response);
        if (response.error) {
          alert('error : ' + response.error);
        } else {
          if (response.updatedCard) {
            this.getAllCards();
            alert('card updated = ' + JSON.stringify(response.updatedCard));
            this.card = {
              id: '',
              cardHolderName: '',
              cardNumber: '',
              expiryMonth: '',
              expiryYear: '',
              cvc: '',
            };
          } else {
            alert('card not found');
          }
        }
      });
  }

  addCard() {
    console.log('add card');
    this.cardsService
      .addCard({
        cardHolderName: this.card.cardHolderName,
        cardNumber: this.card.cardNumber,
        expiryMonth: this.card.expiryMonth,
        expiryYear: this.card.expiryYear,
        cvc: this.card.cvc,
      })
      .subscribe((response) => {
        console.log(response);
        if (response.addedCardId) {
          this.getAllCards();
          alert('added card id = ' + response.addedCardId);
          this.card = {
            id: '',
            cardHolderName: '',
            cardNumber: '',
            expiryMonth: '',
            expiryYear: '',
            cvc: '',
          };
        } else {
          alert('error : ' + response.error);
        }
      });
  }

  onDelete(id: string) {
    console.log(id);
    var response = this.cardsService.deleteCard(id).subscribe((response) => {
      alert('delete card : ' + JSON.stringify(response));
      if (response.cardDeleted) {
        this.getAllCards();
      }
    });
  }

  onRowClicked(card: Card) {
    console.log(card);
    this.card = card;
  }
}
