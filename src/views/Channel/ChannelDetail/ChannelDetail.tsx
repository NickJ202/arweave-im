import { Message } from 'components/organisms/Message';
import { MessageCreate } from 'components/organisms/MessageCreate';

import * as S from './styles';

export default function ChannelDetail() {
	return (
		<S.Wrapper>
			<S.MWrapper>
				{messages.map((message: any, index: number) => {
					return <Message key={index} message={message} />;
				})}
			</S.MWrapper>
			<S.CWrapper>
				<MessageCreate />
			</S.CWrapper>
		</S.Wrapper>
	);
}

const messages = [
	{
		author: 'nickj202',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus mollis nisl. Ut ac pretium mauris.',
	},
	{
		author: 'vjj',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus mollis nisl. Ut ac pretium mauris. Nunc in tincidunt lorem. Fusce luctus urna non arcu iaculis, a pellentesque dui sollicitudin. Sed convallis, metus quis vehicula luctus, diam eros pulvinar est, et fermentum nunc massa non dolor. Nullam id convallis erat, ut pellentesque eros.',
	},
	{
		author: 'tom',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus mollis nisl. Ut ac pretium mauris. Nunc in tincidunt lorem. Fusce luctus urna non arcu iaculis, a pellentesque dui sollicitudin. Sed convallis, metus quis vehicula luctus, diam eros pulvinar est, et fermentum nunc massa non dolor. Nullam id convallis erat, ut pellentesque eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc cursus ligula vitae est gravida faucibus. Curabitur pellentesque tristique dignissim. Quisque sit amet eros at sem auctor commodo. Praesent id feugiat mi. Maecenas non justo neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque auctor libero at semper cursus. Cras varius, ex in aliquet semper, ex purus convallis arcu, in pulvinar diam lorem quis purus.',
	},
	{
		author: 'jshaw',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus mollis nisl. Ut ac pretium mauris. Nunc in tincidunt lorem. Fusce luctus urna non arcu iaculis, a pellentesque dui sollicitudin. Sed convallis, metus quis vehicula luctus, diam eros pulvinar est, et fermentum nunc massa non dolor. Nullam id convallis erat, ut pellentesque eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc cursus ligula vitae est gravida faucibus. Curabitur pellentesque tristique dignissim. Quisque sit amet eros at sem auctor commodo. Praesent id feugiat mi. Maecenas non justo neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque auctor libero at semper cursus. Cras varius, ex in aliquet semper, ex purus convallis arcu, in pulvinar diam lorem quis purus.',
	},
	{
		author: 'vjj',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus mollis nisl. Ut ac pretium mauris. Nunc in tincidunt lorem. Fusce luctus urna non arcu iaculis, a pellentesque dui sollicitudin. Sed convallis, metus quis vehicula luctus, diam eros pulvinar est, et fermentum nunc massa non dolor. Nullam id convallis erat, ut pellentesque eros.',
	},
	{
		author: 'tom',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus mollis nisl. Ut ac pretium mauris. Nunc in tincidunt lorem. Fusce luctus urna non arcu iaculis, a pellentesque dui sollicitudin. Sed convallis, metus quis vehicula luctus, diam eros pulvinar est, et fermentum nunc massa non dolor. Nullam id convallis erat, ut pellentesque eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc cursus ligula vitae est gravida faucibus. Curabitur pellentesque tristique dignissim. Quisque sit amet eros at sem auctor commodo. Praesent id feugiat mi. Maecenas non justo neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque auctor libero at semper cursus. Cras varius, ex in aliquet semper, ex purus convallis arcu, in pulvinar diam lorem quis purus.',
	},
	{
		author: 'jshaw',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus mollis nisl. Ut ac pretium mauris. Nunc in tincidunt lorem. Fusce luctus urna non arcu iaculis, a pellentesque dui sollicitudin. Sed convallis, metus quis vehicula luctus, diam eros pulvinar est, et fermentum nunc massa non dolor. Nullam id convallis erat, ut pellentesque eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc cursus ligula vitae est gravida faucibus. Curabitur pellentesque tristique dignissim. Quisque sit amet eros at sem auctor commodo. Praesent id feugiat mi. Maecenas non justo neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque auctor libero at semper cursus. Cras varius, ex in aliquet semper, ex purus convallis arcu, in pulvinar diam lorem quis purus.',
	},
	{
		author: 'nickj202',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus mollis nisl. Ut ac pretium mauris.',
	},
	{
		author: 'vjj',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus mollis nisl. Ut ac pretium mauris. Nunc in tincidunt lorem. Fusce luctus urna non arcu iaculis, a pellentesque dui sollicitudin. Sed convallis, metus quis vehicula luctus, diam eros pulvinar est, et fermentum nunc massa non dolor. Nullam id convallis erat, ut pellentesque eros.',
	},
	{
		author: 'tom',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus mollis nisl. Ut ac pretium mauris. Nunc in tincidunt lorem. Fusce luctus urna non arcu iaculis, a pellentesque dui sollicitudin. Sed convallis, metus quis vehicula luctus, diam eros pulvinar est, et fermentum nunc massa non dolor. Nullam id convallis erat, ut pellentesque eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc cursus ligula vitae est gravida faucibus. Curabitur pellentesque tristique dignissim. Quisque sit amet eros at sem auctor commodo. Praesent id feugiat mi. Maecenas non justo neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque auctor libero at semper cursus. Cras varius, ex in aliquet semper, ex purus convallis arcu, in pulvinar diam lorem quis purus.',
	},
	{
		author: 'jshaw',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus mollis nisl. Ut ac pretium mauris. Nunc in tincidunt lorem. Fusce luctus urna non arcu iaculis, a pellentesque dui sollicitudin. Sed convallis, metus quis vehicula luctus, diam eros pulvinar est, et fermentum nunc massa non dolor. Nullam id convallis erat, ut pellentesque eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc cursus ligula vitae est gravida faucibus. Curabitur pellentesque tristique dignissim. Quisque sit amet eros at sem auctor commodo. Praesent id feugiat mi. Maecenas non justo neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque auctor libero at semper cursus. Cras varius, ex in aliquet semper, ex purus convallis arcu, in pulvinar diam lorem quis purus.',
	},
	{
		author: 'vjj',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus mollis nisl. Ut ac pretium mauris. Nunc in tincidunt lorem. Fusce luctus urna non arcu iaculis, a pellentesque dui sollicitudin. Sed convallis, metus quis vehicula luctus, diam eros pulvinar est, et fermentum nunc massa non dolor. Nullam id convallis erat, ut pellentesque eros.',
	},
	{
		author: 'tom',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus mollis nisl. Ut ac pretium mauris. Nunc in tincidunt lorem. Fusce luctus urna non arcu iaculis, a pellentesque dui sollicitudin. Sed convallis, metus quis vehicula luctus, diam eros pulvinar est, et fermentum nunc massa non dolor. Nullam id convallis erat, ut pellentesque eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc cursus ligula vitae est gravida faucibus. Curabitur pellentesque tristique dignissim. Quisque sit amet eros at sem auctor commodo. Praesent id feugiat mi. Maecenas non justo neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque auctor libero at semper cursus. Cras varius, ex in aliquet semper, ex purus convallis arcu, in pulvinar diam lorem quis purus.',
	},
	{
		author: 'jshaw',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus mollis nisl. Ut ac pretium mauris. Nunc in tincidunt lorem. Fusce luctus urna non arcu iaculis, a pellentesque dui sollicitudin. Sed convallis, metus quis vehicula luctus, diam eros pulvinar est, et fermentum nunc massa non dolor. Nullam id convallis erat, ut pellentesque eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc cursus ligula vitae est gravida faucibus. Curabitur pellentesque tristique dignissim. Quisque sit amet eros at sem auctor commodo. Praesent id feugiat mi. Maecenas non justo neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque auctor libero at semper cursus. Cras varius, ex in aliquet semper, ex purus convallis arcu, in pulvinar diam lorem quis purus.',
	},
	{
		author: 'nickj202',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus mollis nisl. Ut ac pretium mauris.',
	},
	{
		author: 'vjj',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus mollis nisl. Ut ac pretium mauris. Nunc in tincidunt lorem. Fusce luctus urna non arcu iaculis, a pellentesque dui sollicitudin. Sed convallis, metus quis vehicula luctus, diam eros pulvinar est, et fermentum nunc massa non dolor. Nullam id convallis erat, ut pellentesque eros.',
	},
	{
		author: 'tom',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus mollis nisl. Ut ac pretium mauris. Nunc in tincidunt lorem. Fusce luctus urna non arcu iaculis, a pellentesque dui sollicitudin. Sed convallis, metus quis vehicula luctus, diam eros pulvinar est, et fermentum nunc massa non dolor. Nullam id convallis erat, ut pellentesque eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc cursus ligula vitae est gravida faucibus. Curabitur pellentesque tristique dignissim. Quisque sit amet eros at sem auctor commodo. Praesent id feugiat mi. Maecenas non justo neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque auctor libero at semper cursus. Cras varius, ex in aliquet semper, ex purus convallis arcu, in pulvinar diam lorem quis purus.',
	},
	{
		author: 'jshaw',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus mollis nisl. Ut ac pretium mauris. Nunc in tincidunt lorem. Fusce luctus urna non arcu iaculis, a pellentesque dui sollicitudin. Sed convallis, metus quis vehicula luctus, diam eros pulvinar est, et fermentum nunc massa non dolor. Nullam id convallis erat, ut pellentesque eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc cursus ligula vitae est gravida faucibus. Curabitur pellentesque tristique dignissim. Quisque sit amet eros at sem auctor commodo. Praesent id feugiat mi. Maecenas non justo neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque auctor libero at semper cursus. Cras varius, ex in aliquet semper, ex purus convallis arcu, in pulvinar diam lorem quis purus.',
	},
	{
		author: 'vjj',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus mollis nisl. Ut ac pretium mauris. Nunc in tincidunt lorem. Fusce luctus urna non arcu iaculis, a pellentesque dui sollicitudin. Sed convallis, metus quis vehicula luctus, diam eros pulvinar est, et fermentum nunc massa non dolor. Nullam id convallis erat, ut pellentesque eros.',
	},
	{
		author: 'tom',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus mollis nisl. Ut ac pretium mauris. Nunc in tincidunt lorem. Fusce luctus urna non arcu iaculis, a pellentesque dui sollicitudin. Sed convallis, metus quis vehicula luctus, diam eros pulvinar est, et fermentum nunc massa non dolor. Nullam id convallis erat, ut pellentesque eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc cursus ligula vitae est gravida faucibus. Curabitur pellentesque tristique dignissim. Quisque sit amet eros at sem auctor commodo. Praesent id feugiat mi. Maecenas non justo neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque auctor libero at semper cursus. Cras varius, ex in aliquet semper, ex purus convallis arcu, in pulvinar diam lorem quis purus.',
	},
	{
		author: 'jshaw',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus mollis nisl. Ut ac pretium mauris. Nunc in tincidunt lorem. Fusce luctus urna non arcu iaculis, a pellentesque dui sollicitudin. Sed convallis, metus quis vehicula luctus, diam eros pulvinar est, et fermentum nunc massa non dolor. Nullam id convallis erat, ut pellentesque eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc cursus ligula vitae est gravida faucibus. Curabitur pellentesque tristique dignissim. Quisque sit amet eros at sem auctor commodo. Praesent id feugiat mi. Maecenas non justo neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque auctor libero at semper cursus. Cras varius, ex in aliquet semper, ex purus convallis arcu, in pulvinar diam lorem quis purus.',
	},
	{
		author: 'nickj202',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus mollis nisl. Ut ac pretium mauris.',
	},
];
