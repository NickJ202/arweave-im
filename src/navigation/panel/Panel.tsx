import * as S from './styles';

export default function Panel() {
	function handleChannelChange() {
		console.log('handle channel');
	}

	function getTitle() {
		return 'Group Title';
	}

	function getChannels() {
		return (
			<>
				{channels.map((channel: any, index: number) => {
					return (
						<S.Channel key={index} active={channel.active}>
							<button onClick={handleChannelChange}>
								<span>{`# ${channel.title}`}</span>
							</button>
						</S.Channel>
					);
				})}
			</>
		);
	}

	return (
		<S.Wrapper>
			<S.Group>
				<span>{getTitle()}</span>
			</S.Group>
			<S.Channels>{getChannels()}</S.Channels>
		</S.Wrapper>
	);
}

const channels = [
	{ title: 'Channel', active: false },
	{ title: 'Channel', active: false },
	{ title: 'Channel', active: false },
	{ title: 'Channel', active: false },
	{ title: 'Channel', active: true },
	{ title: 'Channel', active: false },
	{ title: 'Channel', active: false },
	{ title: 'Channel', active: false },
	{ title: 'Channel', active: false },
	{ title: 'Channel', active: false },
];
