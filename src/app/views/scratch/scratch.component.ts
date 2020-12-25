import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Prize} from '../../models/prize.model';
import {Router} from '@angular/router';
import ClearPicture from 'clear-picture';

@Component({
  selector: 'app-scratch',
  templateUrl: './scratch.component.html',
  styleUrls: ['./scratch.component.sass']
})
export class ScratchComponent implements OnInit, AfterViewInit {

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

  }

  ngAfterViewInit(): void {
    this.prizes.map((prize: Prize, i) => {
      const card = document.getElementById('card-' + i);
      if (card === null) {
        return;
      }
      console.log(card.style.height);
      prize.clearPicture = new ClearPicture({
        canvas: document.getElementById('canvas-' + i), // 页面中的 canvas 元素
        background: '../assets/images/fightting.png', // 用于涂抹的背景，涂抹完成后消失
        canvasWidth: card.style.width, // canvas 宽度
        canvasHeight: card.style.height, // canvas 高度
        lineWidth: 60, // 画笔粗细
        completeRatio: 0.5, // 完成度，最大值为 1
        finishCallback: () => {
          prize.discover = true;
          console.log('end');
          // 完成回调
        },
      });
    });
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

  getOpacity(prize: Prize): number {
    if (prize.discover) {
      return 1;
    } else {
      return 0;
    }
  }
}
