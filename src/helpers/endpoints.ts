export function getArweaveBalanceEndpoint(walletAddress: string) {
	return `https://arweave.net/wallet/${walletAddress}/balance`;
}
