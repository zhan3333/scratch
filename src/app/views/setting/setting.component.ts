import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PrizeService} from '../../services/prize.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.sass']
})
export class SettingComponent implements OnInit {

  public title = new FormControl('', Validators.required);

  constructor(
    private router: Router,
    public prize: PrizeService,
  ) {
  }

  ngOnInit(): void {
  }

  home(): void {
    this.router.navigate(['/']);
  }

  public add(): void {
    this.prize.add(this.title.value);
    this.title.reset();
  }
}
