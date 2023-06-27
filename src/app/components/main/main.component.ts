import { Component, OnInit } from '@angular/core';
import { CurrencyCost } from 'src/app/models/currencyCost';
import { CurrencyCostService } from 'src/app/services/currency-cost.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(private currencyService: CurrencyCostService) {}

  currencyCostDefault: Array<CurrencyCost> = [
    {
      currency: 'Dólar Canadense',
      data: {
        name: 'Dólar Canadense',
      },
    },
    {
      currency: 'Peso Argentino',
      data: {
        name: 'Peso Argentino',
      },
    },
    {
      currency: 'Libra Esterlina',
      data: {
        name: 'Libra Esterlina',
      },
    },
  ];

  currencyCost: Array<CurrencyCost> = [];

  isLoading: boolean = false;
  isError: boolean = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.currencyCost = this.currencyCostDefault;
    this.getCurrencyCost();
    setInterval(() => {
      this.isLoading = true;
      this.currencyCost = this.currencyCostDefault;
      this.refresh();
    }, 180000);
  }

  getCurrencyCost() {
    this.currencyService.get().subscribe({
      next: (response) => {
        this.currencyCost = response;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
        this.isError = true;
      }
    });
  }

  refresh(){
    this.currencyCost = this.currencyCostDefault;
    this.isLoading = true;
    this.isError = false;
    this.getCurrencyCost();
  }
}
