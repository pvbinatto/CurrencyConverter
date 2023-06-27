import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CurrencyCostService } from './currency-cost.service';

class MyServiceMock extends CurrencyCostService {

    response = {
        "CADBRL": {
            "code": "CAD",
            "codein": "BRL",
            "name": "Dólar Canadense/Real Brasileiro",
            "high": "3.6272",
            "low": "3.624",
            "varBid": "0.001",
            "pctChange": "0.03",
            "bid": "3.6226",
            "ask": "3.6282",
            "timestamp": "1687817167",
            "create_date": "2023-06-26 19:06:07"
        },
        "ARSBRL": {
            "code": "ARS",
            "codein": "BRL",
            "name": "Peso Argentino/Real Brasileiro",
            "high": "0.0188",
            "low": "0.0187",
            "varBid": "0",
            "pctChange": "0",
            "bid": "0.0187",
            "ask": "0.0187",
            "timestamp": "1687817139",
            "create_date": "2023-06-26 19:05:39"
        },
        "GBPBRL": {
            "code": "GBP",
            "codein": "BRL",
            "name": "Libra Esterlina/Real Brasileiro",
            "high": "6.0643",
            "low": "6.0602",
            "varBid": "0.0021",
            "pctChange": "0.03",
            "bid": "6.0569",
            "ask": "6.0716",
            "timestamp": "1687817135",
            "create_date": "2023-06-26 19:05:35"
        }
    }

    //Convert object to array
    ob = this.normalizeObject(this.response);    

    override getCurrency(){
        return of(this.ob);
    }
}

describe('CurrencyCostService', () => {
  let service: CurrencyCostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: CurrencyCostService,
          useClass: MyServiceMock,
        },
      ],
    });
    service = TestBed.inject(CurrencyCostService);
  });

  it('should be make call kttp', () => {


    const response = [
        {
            "currency": "CADBRL",
            "data": {
                "code": "CAD",
                "codein": "BRL",
                "name": "Dólar Canadense",
                "high": 3.6272,
                "low": "3.624",
                "varBid": "0.001",
                "pctChange": "0,03",
                "bid": "3.6226",
                "ask": "3.6282",
                "timestamp": "1687817167",
                "create_date": "19:06:07"
            }
        },
        {
            "currency": "ARSBRL",
            "data": {
                "code": "ARS",
                "codein": "BRL",
                "name": "Peso Argentino",
                "high": 0.0188,
                "low": "0.0187",
                "varBid": "0",
                "pctChange": "0",
                "bid": "0.0187",
                "ask": "0.0187",
                "timestamp": "1687817139",
                "create_date": "19:05:39"
            }
        },
        {
            "currency": "GBPBRL",
            "data": {
                "code": "GBP",
                "codein": "BRL",
                "name": "Libra Esterlina",
                "high": 6.0643,
                "low": "6.0602",
                "varBid": "0.0021",
                "pctChange": "0,03",
                "bid": "6.0569",
                "ask": "6.0716",
                "timestamp": "1687817135",
                "create_date": "19:05:35"
            }
        }
    ];

    service.get().subscribe((data: any) => {
      expect(data).toEqual(response);
    });
  });
});
