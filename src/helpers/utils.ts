export function formatAddress(address: string | null, wrap: boolean) {
	if (!address) {
		return '';
	}
	const formattedAddress = address.substring(0, 5) + '...' + address.substring(36, address.length - 1);
	return wrap ? `(${formattedAddress})` : formattedAddress;
}