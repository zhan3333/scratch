import {Component, OnInit} from '@angular/core';
import {Prize} from '../../models/prize.model';
import {Router} from '@angular/router';
import {ScratchCard} from '../../lib/scratchcard';

@Component({
  selector: 'app-scratch',
  templateUrl: './scratch.component.html',
  styleUrls: ['./scratch.component.sass']
})
export class ScratchComponent implements OnInit {

  public prizes: Prize[] = [
    {
      title: '换座位卡',
      discover: false
    },
    {
      title: '免作业卡',
      discover: false
    },
    {
      title: '小奖品1',
      discover: false
    },
    {
      title: '小奖品2',
      discover: false
    },
    {
      title: '小奖品3',
      discover: false
    },
    {
      title: '换座位卡',
      discover: false
    },
  ];

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.randomPrizes();
    const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;
    if (canvas === null) {
      return;
    }
    const card = new ScratchCard(canvas);
    card.start();
  }

  private randomPrizes(): void {
    this.prizes = this.prizes.sort(() => {
      const t = Math.random() > .5;
      if (t) {
        return 1;
      } else {
        return -1;
      }
    });
    console.log(this.prizes);
  }

  public getCardColor(prize: Prize): string {
    if (prize.discover) {
      return '#ff6e40';
    } else {
      return 'grey';
    }
  }

  public refresh(): void {
    this.prizes.forEach((prize) => prize.discover = false);
    this.randomPrizes();
  }

  public discover(i: number): void {
    this.prizes[i].discover = true;
  }

  public setting(): void {
    this.router.navigate(['/setting']);
  }
}
