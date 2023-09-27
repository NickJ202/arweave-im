import { DateType, GroupReduxType, ProfileType } from './types';

export function formatAddress(address: string | null, wrap: boolean) {
	if (!address) return '';
	if (!checkAddress(address))return address;
	const formattedAddress = address.substring(0, 5) + '...' + address.substring(36, address.length - 1);
	return wrap ? `(${formattedAddress})` : formattedAddress;
}

export const checkAddress = (addr: string) => /[a-z0-9_-]{43}/i.test(addr);

function formatTime(time: number): string {
	return time < 10 ? `0${time.toString()}` : time.toString();
}

function getHours(hours: number) {
	if (hours > 12) return hours - 12;
	else return hours;
}

function getHourFormat(hours: number) {
	if (hours >= 12 && hours <= 23) {
		return `PM`;
	} else {
		return `AM`;
	}
}

export function formatDate(dateArg: string | number | null, dateType: DateType, useShortDate: boolean) {
	if (!dateArg) return null;

	let date: Date | null = null;

	switch (dateType) {
		case 'iso':
			date = new Date(dateArg);
			break;
		case 'epoch':
			date = new Date(Number(dateArg));
			break;
		default:
			date = new Date(dateArg);
			break;
	}

	return `${useShortDate ? '' : `${date.toLocaleString('default', {
		month: 'long',
	})} ${date.getDate()}, ${date.getUTCFullYear()} · `}${getHours(date.getHours())}:${formatTime(
		date.getMinutes()
	)} ${useShortDate ? '' : getHourFormat(date.getHours())}`;
}

export function formatChannelName(channelName: string) {
	return `# ${channelName}`;
}

export function getOwner(groupReducer: GroupReduxType, owner: string | null) {
	if (groupReducer && owner) {
		return groupReducer.data.profiles.find((profile: ProfileType) => profile.walletAddress === owner);
	}
	else return null;
}