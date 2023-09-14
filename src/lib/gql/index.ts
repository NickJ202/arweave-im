import { BUNDLR_CONFIG, CURSORS, PAGINATOR, STORAGE, TAGS } from '../helpers/config';
import {
	AGQLResponseType,
	CursorEnum,
	CursorObjectKeyType,
	GQLNodeResponseType,
	GQLResponseType,
	TagFilterType,
} from '../helpers/types';
import { getTagValue, unquoteJsonKeys } from '../helpers/utils';

export async function getGQLData(args: {
	ids: string[] | null;
	tagFilters: TagFilterType[] | null;
	owners: string[] | null;
	cursor: string | null;
	reduxCursor: string | null;
	cursorObject: CursorObjectKeyType;
	minBlock?: number;
	useArweaveNet?: boolean;
	useBundlrGateway?: boolean;
}): Promise<AGQLResponseType> {
	const data: GQLNodeResponseType[] = [];
	let nextCursor: string | null = null;

	if (args.ids && args.ids.length <= 0) {
		return { data: data, nextCursor: nextCursor };
	}

	let ids = args.ids ? JSON.stringify(args.ids) : null;
	let tags = args.tagFilters ? unquoteJsonKeys(args.tagFilters) : null;
	let owners = args.owners ? JSON.stringify(args.owners) : null;
	let cursor = args.cursor ? `"${args.cursor}"` : null;

	const block = args.minBlock
		? `block: {
			min: ${args.minBlock}
		}`
		: '';

	const response = await getResponse({
		useBundlrGateway: args.useBundlrGateway ? args.useBundlrGateway : false,
		useArweaveNet: args.useArweaveNet ? args.useArweaveNet : false,
		ids: ids,
		tags: tags,
		owners: owners,
		cursor: cursor,
		after: cursor,
		block: block,
	});

	if (response.data.data) {
		const responseData = args.useBundlrGateway
			? response.data.data.transactions.edges.reverse()
			: response.data.data.transactions.edges;
		if (responseData.length > 0) {
			data.push(...responseData);
			if (args.cursorObject && args.cursorObject === CursorEnum.GQL) {
				if (responseData.length < PAGINATOR) {
					nextCursor = CURSORS.end;
				} else {
					nextCursor = responseData[responseData.length - 1].cursor;
				}
			}
		}
	}

	return { data: data, nextCursor: nextCursor };
}

async function getResponse(args: {
	useBundlrGateway: boolean;
	useArweaveNet: boolean;
	ids: any;
	tags: any;
	owners: any;
	cursor: any;
	after: any;
	block: any;
}): Promise<{ data: any }> {
	const { useBundlrGateway, useArweaveNet, ids, tags, owners, cursor, after, block } = args;

	const query = getQuery({
		useBundlrGateway: args.useBundlrGateway,
		ids,
		tags,
		owners,
		cursor,
		after,
		block,
	});

	const endpoints = [
		{
			enabled: useBundlrGateway,
			execute: async () => {
				return await runQuery({ endpoint: `${BUNDLR_CONFIG.node}/graphql`, query: query });
			},
		},
		{
			enabled: useArweaveNet,
			execute: async () => {
				return await runQuery({ endpoint: `https://arweave.net/graphql`, query: query });
			},
		},
		{
			enabled: true,
			execute: async () => {
				return await runQuery({ endpoint: `https://arweave-search.goldsky.com`, query: query });
			},
		},
	];

	for (const endpoint of endpoints) {
		if (endpoint.enabled) {
			try {
				return await endpoint.execute();
			} catch (error: any) {
				console.error(error);
				return { data: [] };
			}
		}
	}

	console.error('All endpoints failed');
	return { data: [] };
}

async function runQuery(args: { endpoint: string; query: any }): Promise<{ data: any }> {
	const response = await fetch(args.endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(args.query),
	});
	return { data: await response.json() };
}

function getQuery(args: {
	ids: any;
	tags: any;
	owners: any;
	cursor: any;
	after: any;
	block: any;
	useBundlrGateway: boolean;
}) {
	const nodeFields = args.useBundlrGateway
		? `address timestamp`
		: `data {
				size
				type
			}
			owner {
				address
			}
			block {
				height
				timestamp
			}`;
	const order = args.useBundlrGateway ? `order: DESC` : '';
	const pageInfo = args.useBundlrGateway
		? `pageInfo {
		hasNextPage
		endCursor
	}`
		: '';

	const query = {
		query: `
                query {
                    transactions(
                        ids: ${args.ids},
                        tags: ${args.tags},
						first: ${PAGINATOR}
                        owners: ${args.owners},
                        after: ${args.cursor},
						${order},
						${args.block}
                    ){
                    edges {
                        cursor
                        node {
                            id
                            tags {
                                name 
                                value 
                            }
							${nodeFields}
                        }
                    }
					${pageInfo}
                }
            }
        `,
	};

	return query;
}

export function getGQLResponseObject(gqlResponse: AGQLResponseType): GQLResponseType {
	const nodes = gqlResponse.data.filter((element: GQLNodeResponseType) => {
		return getTagValue(element.node.tags, TAGS.keys.uploaderTxId) === STORAGE.none;
	});

	return {
		nextCursor: gqlResponse.nextCursor,
		previousCursor: null,
		nodes: nodes,
	};
}
