export function getArweaveBalanceEndpoint(walletAddress: string) {
	return `https://arweave.net/wallet/${walletAddress}/balance`;
}

export function getTxEndpoint(txId: string) {
	return `https://arweave.net/${txId}`;
}
