import {appInfo} from '../constants/appInfo';

export class DateTime {
  static getDatesString = (timestamp: number): string => {
    const date = new Date(timestamp);
    const dayName = appInfo.daysCollapseNames[date.getDay() - 1];
    const monthName = appInfo.monthCollapseNames[date.getMonth()];
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

  static getMonthString = (dateString: string): string => {
    const date = new Date(dateString);
    const monthIndex = date.getUTCMonth();
    const monthName = appInfo.monthCollapseNames[monthIndex];
    return monthName || 'Invalid Date';
  };

  static getDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = appInfo.monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  static getDay = (timestamp: number): string => {
    const date = new Date(timestamp);
    const dayName = appInfo.dayNames[date.getDay()];
    return dayName || 'Invalid Date';
  };
}
