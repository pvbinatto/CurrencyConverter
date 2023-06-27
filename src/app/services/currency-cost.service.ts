import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environments';
import { Endpoints } from 'src/environments/endpoints';
import { CurrencyCost } from '../models/currencyCost';
import { BehaviorSubject, Observable, map, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyCostService {
  constructor(private api: ApiService) {}

  private cache: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  get(): Observable<Array<CurrencyCost>> {
    if (!localStorage.getItem('cache')) {
      localStorage.setItem('cache', new Date().toString());
    }

    let cacheExpiryTime = new Date(Number(localStorage.getItem('cache')));
    let now = new Date();

    if (cacheExpiryTime > now) {
      this.cache.next(JSON.parse(localStorage.getItem('currencyCost')));
      return this.cache.asObservable().pipe(timeout(180000));
    } else {
      return this.getCurrency();
    }
  }

  getCurrency(): Observable<any> {
    return this.api.get(environment.api + Endpoints.getCurrency).pipe(
      map((data) => {
        let ob = this.normalizeObject(data);
        this.cacheControl(ob);
        return ob;
      })
    );
  }

  cacheControl(ob) {
    this.cache.next(ob);
    localStorage.setItem('currencyCost', JSON.stringify(ob));
    localStorage.setItem(
      'cache',
      new Date().setMinutes(new Date().getMinutes() + 3).toString()
    );
  }

  normalizeObject(data) {
    let ob = [];
    for (const chave in data) {
      if (data.hasOwnProperty(chave)) {
        let mapper = data[chave];
        mapper.name = mapper.name.replace('/Real Brasileiro', '');
        mapper.create_date = mapper.create_date.split(' ')[1];
        mapper.pctChange = mapper.pctChange.replace('.', ',');
        mapper.high = Number(mapper.high);

        let obj = {
          currency: chave,
          data: mapper,
        };
        ob.push(obj);
      }
    }
    return ob;
  }
}
