import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnitsResponse } from '../@types/units-response.interface';
import { Location } from '../@types/location.interface';

@Injectable({
  providedIn: 'root'
})
export class GetUnitsService {
  readonly apiUrl = 'https://test-frontend-developer.s3.amazonaws.com/data/locations.json'


  private allUnitsSubject: BehaviorSubject<Array<Location>> = new BehaviorSubject<Array<Location>>([])
  private allUnits$: Observable<Array<Location>> = this.allUnitsSubject.asObservable()
  private filteredUnits: Array<Location> = []

  constructor(private httpClient: HttpClient) {
    httpClient.get<UnitsResponse>(this.apiUrl).subscribe(data => {
      this.allUnitsSubject.next(data.locations)
      this.filteredUnits = data.locations
    })
  }

  getAllUnits(): Observable<Array<Location>> {
    return this.allUnits$
  }

  setFilteredUnits(value: Array<Location>) {
    this.filteredUnits = value
  }

  getFilteredUnits() {
    return this.filteredUnits
  }
}
