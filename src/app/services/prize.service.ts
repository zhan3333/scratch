import {Injectable} from '@angular/core';
import {Prize} from '../models/prize.model';

@Injectable({
  providedIn: 'root'
})
export class PrizeService {

  private storage: Storage;

  public get prizes(): Prize[] {
    const str = this.storage.getItem('prizes');
    if (str === null) {
      return [];
    }
    return JSON.parse(str);
  }

  constructor() {
    this.storage = localStorage;
  }

  public add(title: string): void {
    const prizes = this.prizes;
    prizes.push({title, discover: false});
    this.storage.setItem('prizes', JSON.stringify(prizes));

  }

  public del(i: number): void {
    const prizes = this.prizes;
    delete prizes[i];
    this.storage.setItem('prizes', JSON.stringify(prizes));
  }
}
