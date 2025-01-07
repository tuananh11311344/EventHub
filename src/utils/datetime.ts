import {appInfo} from '../constants/appInfo';

export class DateTime {
  static getDayString = (timestamp: number): string => {
    const date = new Date(timestamp);
    const dayName = appInfo.daysNames[date.getDay() - 1]; 
    const monthName = appInfo.monthNames[date.getMonth()];
    const day = date.getDate();
    return `${dayName}, ${monthName} ${day}`;
  };

  static getTimeString = (timestamp: number): string => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes; 
    return `${hours}:${minutesStr} ${ampm}`;
  };
}
