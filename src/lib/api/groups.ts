import { CONTENT_TYPES, GROUP_CONTRACT, logValue,TAGS  } from 'lib/helpers';

import { DEFAULT_LOGO } from 'helpers/config';

import { getGQLData, getGQLResponseObject } from '../gql';
import {
    AGQLResponseType,
    CreateGroupClientArgs,
    CursorEnum,
    GQLResponseType,
    TagType
} from '../helpers/types';

import { createContract, createTransaction } from '.';

export async function getGroupsByUser(args: {
    walletAddress: string,
    arClient: any
}): Promise<GQLResponseType> {
    const gqlData: AGQLResponseType = await getGQLData({
        ids: null,
        tagFilters: [
            { name: TAGS.keys.initialOwner, values: [args.walletAddress] },
            { name: TAGS.keys.messageGroupVersion, values: Object.keys(TAGS.values.messageGroupVersions).map((version: string) => TAGS.values.messageGroupVersions[version]) },
        ],
        uploader: null,
        cursor: null,
        reduxCursor: null,
        cursorObject: CursorEnum.GQL,
        arClient: args.arClient,
    });

    return getGQLResponseObject(gqlData);
}

export async function createGroup(args: CreateGroupClientArgs): Promise<string | null> {
    let logoId = DEFAULT_LOGO;
    if (args.logo.src) {
        const mimeType = args.logo.src.split(";")[0].split(":")[1];
        logoId = await createTransaction({
            arClient: args.arClient,
            tags: [{ name: TAGS.keys.contentType, value: mimeType }],
            content: args.logo.buffer,
            contentType: mimeType
        });

    }

    const assetId = await createTransaction({
		arClient: args.arClient,
		tags: createGroupTags({
            owner: args.owner,
            title: args.title,
            logo: logoId
        }),
        content: TAGS.values.messageGroupVersions['0.1'],
        contentType: CONTENT_TYPES.textPlain
	});
	const contractId = await createContract({ arClient: args.arClient, assetId: assetId });
	if (contractId) {
		logValue(`Deployed Contract`, contractId, 0);
		return contractId;
	} else {
		return null;
	}
}

function createGroupTags(args: {
    owner: string,
    title: string,
    logo: string
}): TagType[] {
    const dateTime = new Date().getTime().toString();

    let initStateJson: any = {
        balances: {
            [args.owner]: 1,
        },
        title: args.title,
        members: [args.owner],
        channels: [],
        dateCreated: dateTime,
    };

    initStateJson = JSON.stringify(initStateJson);

    const tags: TagType[] = [
        { name: TAGS.keys.contractSrc, value: GROUP_CONTRACT.src },
        { name: TAGS.keys.smartweaveAppName, value: TAGS.values.smartweaveAppName },
        { name: TAGS.keys.smartweaveAppVersion, value: TAGS.values.smartweaveAppVersion },
        { name: TAGS.keys.contentType, value: CONTENT_TYPES.textPlain },
        { name: TAGS.keys.initState, value: initStateJson },
        { name: TAGS.keys.initialOwner, value: args.owner },
        { name: TAGS.keys.ans110.title, value: args.title },
        { name: TAGS.keys.logo, value: args.logo },
        { name: TAGS.keys.dateCreated, value: dateTime },
        { name: TAGS.keys.messageGroupVersion, value: TAGS.values.messageGroupVersions['0.1'] }
    ];

    return tags;
}