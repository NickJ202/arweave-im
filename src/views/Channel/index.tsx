import { useParams } from 'react-router-dom';

import { ChannelDetail } from './ChannelDetail';
import { ChannelHeader } from './ChannelHeader';

// TODO: fetch messages by channel id
export default function Channel() {
	const { groupId, channelId } = useParams();

	return (
		<>
			<ChannelHeader />
			<ChannelDetail channelId={channelId} groupId={groupId} />
		</>
	);
}
