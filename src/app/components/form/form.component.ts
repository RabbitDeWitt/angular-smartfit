import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { GetUnitsService } from '../../services/get-units.service';
import { Location } from '../../@types/location.interface';
import { FilterUnitsService } from '../../services/filter-units.service';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  results: Array<Location> = []
  filteredResults: Array<Location> = []
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private unitService: GetUnitsService,
    private filterService: FilterUnitsService) { }

  ngOnInit(): void {
    this.unitService.getAllUnits().subscribe(data => {
      this.results = data.locations
      this.filteredResults = data.locations
    })
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true
    })
  }

  onSubmit(): void {
    this.filteredResults = this.filterService.filter(this.results, this.formGroup.value.showClosed, this.formGroup.value.hour)
  }

  onClear(): void {
    this.formGroup.reset()

  }
}
