import { useAtom } from 'jotai';
import { atomWithImmer } from 'jotai/immer';
import { TimePeriod } from '../types';
import { addMonths, getFirstDayDate } from '../dateUtils';

const currentPertiodAtom = atomWithImmer<TimePeriod>({
  start: getFirstDayDate(new Date()),
  end: getFirstDayDate(addMonths(new Date(), 1)),
});

export function useCurrentPeriod() {
  const [currentPertiod, setCurrentPertiod] = useAtom(currentPertiodAtom);
  return { currentPertiod, setCurrentPertiod };
}
