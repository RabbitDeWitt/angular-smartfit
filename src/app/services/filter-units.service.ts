import { Injectable } from '@angular/core';
import { Location } from '../@types/location.interface';

const OPENING_HOURS = {
  morning: {
    first: '06',
    last: '12'
  },
  afternoon: {
    first: '12',
    last: '18'
  },
  night: {
    first: '18',
    last: '23'
  }
}

type HOUR_INDEXES = 'morning' | 'afternoon' | 'night'

@Injectable({
  providedIn: 'root'
})
export class FilterUnitsService {

  constructor() { }

  transformWeekday(weekday: number): string {
    switch (weekday) {
      case 0:
        return 'Dom.'
      case 6:
        return 'Sáb.'
      default:
        return 'Seg. à Sex.'
    }
  }


  filterUnits(unit: Location, openHour: string, closeHour: string): boolean {
    if (!unit.schedules) return false
    let openHourFilter = parseInt(openHour, 10)
    let closeHourFilter = parseInt(closeHour, 10)

    let todaysWeekday = this.transformWeekday(new Date().getDate())

    for (let schedule of unit.schedules) {
      let scheduleHour = schedule.hour
      let scheduleWeekday = schedule.weekdays

      if (todaysWeekday === scheduleWeekday) {
        if (scheduleHour !== 'Fechada') {
          let [unitOpenHour, unitCloseHour] = schedule.hour.split(' às ')
          let unitOpenHourInt = parseInt(unitOpenHour.replace('h', ''), 10)
          let unitCloseHourInt = parseInt(unitCloseHour.replace('h', ''), 10)

          return (unitOpenHourInt <= openHourFilter && unitCloseHourInt >= closeHourFilter) ? true : false
        }
      }
    }
    return false
  }

  filter(results: Array<Location>, showClosed: boolean, hour: string): Array<Location> {
    const OPEN_HOUR = OPENING_HOURS[hour as HOUR_INDEXES].first
    const CLOSE_HOUR = OPENING_HOURS[hour as HOUR_INDEXES].last

    if (!showClosed) {
      let intermediateResult = results.filter(location => location.opened === true)
      return intermediateResult.filter(location => this.filterUnits(location, OPEN_HOUR, CLOSE_HOUR))
    } else {
      return results.filter(location => this.filterUnits(location, OPEN_HOUR, CLOSE_HOUR))
    }

  }
}
