import type { Comic } from '$lib/types';
import dayjs from './dayjs';

const NO_EVENT = '(no event)';
const NO_CREATOR = '(unknown)';

export function getSeries(c: Comic): string {
	return c.series.name;
}

export function getCreators({ creators }: Comic): string[] {
	if (creators.length > 0) {
		return creators.map((cr) => cr.name);
	} else {
		return [NO_CREATOR];
	}
}

export function getEvents({ events }: Comic): string[] {
	if (events.length > 0) {
		return events.map((e) => e.name);
	} else {
		return [NO_EVENT];
	}
}

export function compareDates(a: Comic, b: Comic) {
	return getOnSaleDate(a).diff(getOnSaleDate(b));
}

export function compareUnlimitedDates(a: Comic, b: Comic) {
	return getUnlimitedDate(a).diff(getUnlimitedDate(b));
}

export function compareTitles({ title: titleA }: Comic, { title: titleB }: Comic) {
	// TODO: possible perf enhancement
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare#performance
	return titleA.localeCompare(titleB, undefined, { numeric: true, sensitivity: 'base' });
}

export function isEventSelected({ events }: Comic, selectedEvents: Set<string>) {
	return (
		events.find((e) => selectedEvents.has(e.name)) !== undefined ||
		(selectedEvents.has(NO_EVENT) && events.length === 0)
	);
}

// TODO: make more efficient
export function isCreatorSelected({ creators }: Comic, selectedCreators: Set<string>) {
	return (
		creators.find((e) => selectedCreators.has(e.name)) !== undefined ||
		(selectedCreators.has(NO_CREATOR) && creators.length === 0)
	);
}

export function getOnSaleDate(comic: Comic) {
	return dayjs.utc(comic.dates.onSale);
}

export function getUnlimitedDate(comic: Comic) {
	return dayjs.utc(comic.dates.unlimited);
}
