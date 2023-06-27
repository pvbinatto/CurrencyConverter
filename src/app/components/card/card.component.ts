import { Component, Input, Output, OnChanges, OnInit, EventEmitter } from '@angular/core';
import { CurrencyCost } from 'src/app/models/currencyCost';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnChanges {
  @Input() data: CurrencyCost;
  @Input() loading: boolean;
  @Input() typeError: boolean;
  @Output() isRefresh = new EventEmitter<boolean>();

  colorFont = 'text-basic';

  constructor() {}
  
  ngOnChanges(): void {

    if (this.data.data.high < 1) {
      this.colorFont = 'text-red';
    } else if (this.data.data.high > 1 && this.data.data.high <= 5) {
      this.colorFont = 'text-green';
    } else if (this.data.data.high > 5) {
      this.colorFont = 'text-blue';
    }
  }

  refresh() {
    this.isRefresh.emit(true);
  }
}
