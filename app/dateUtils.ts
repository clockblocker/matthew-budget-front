import { TimePeriod } from './types';

function isLeapYearInner(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function isLeapYear(d: Date) {
  return isLeapYearInner(d.getFullYear());
}

function getDaysInMonthInner(year: number, month: number) {
  return [
    31,
    isLeapYearInner(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ][month];
}

function getDaysInMonth(d: Date) {
  return getDaysInMonthInner(d.getFullYear(), d.getMonth());
}

export function addMonths(date: Date, value: number) {
  const copy = new Date(date);
  const n = copy.getDate();
  copy.setDate(1);
  copy.setMonth(copy.getMonth() + Math.floor(value));
  copy.setDate(Math.min(n, getDaysInMonth(copy)));
  return copy;
}

export function getFirstDayDate(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function rotatePeriod(
  { start, end }: TimePeriod,
  numberOfMonths: number
): TimePeriod {
  return {
    start: getFirstDayDate(addMonths(start, numberOfMonths)),
    end: getFirstDayDate(addMonths(end, numberOfMonths)),
  };
}

export function getNextPeriod(period: TimePeriod) {
  return rotatePeriod(period, 1);
}

export function getPrevPeriod(period: TimePeriod) {
  return rotatePeriod(period, -1);
}

export function monthLabelFromPeriod(period: TimePeriod) {
  return Intl.DateTimeFormat('en-US', { month: 'long' }).format(period.start);
}
