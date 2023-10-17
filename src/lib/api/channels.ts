import { getGQLData } from '../gql';
import { AGQLResponseType, ChannelHeaderResponseType, getTagValue, TAGS } from '../helpers';

export async function getChannelById(args: { channelId: string }): Promise<ChannelHeaderResponseType | null> {
	const gqlData: AGQLResponseType = await getGQLData({
		ids: [args.channelId],
		tagFilters: null,
		owners: null,
		cursor: null,
		reduxCursor: null,
		cursorObject: null,
		useBundlrGateway: true,
		useArweaveNet: false,
	});

	if (gqlData && gqlData.data.length) {
		const element = gqlData.data[0];
		return {
			id: element.node.id,
			groupId: getTagValue(element.node.tags, TAGS.keys.groupId),
			groupChannel: getTagValue(element.node.tags, TAGS.keys.groupChannel),
			messageGroupVersion: getTagValue(element.node.tags, TAGS.keys.messageGroupVersion),
			dateCreated: Number(getTagValue(element.node.tags, TAGS.keys.dateCreated)),
			initialOwner: getTagValue(element.node.tags, TAGS.keys.initialOwner),
		};
		return null;
	} else return null;
}
