import { Component, Input } from '@angular/core';
import { Location } from '../../@types/location.interface';

@Component({
  selector: 'app-unit-card',
  templateUrl: './unit-card.component.html',
  styleUrl: './unit-card.component.scss'
})
export class UnitCardComponent {
  @Input() unit!: Location

  constructor() { }


}
