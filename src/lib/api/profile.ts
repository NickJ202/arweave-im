import { getGQLData } from '../gql';
import { AGQLResponseType, CursorEnum, getTxEndpoint, GQLNodeResponseType, PAGINATOR, ProfileType, TAGS } from '../helpers';

export async function getProfiles(args: {
	addresses: string[]
}): Promise<ProfileType[]> {
	const profiles: ProfileType[] = [];
	let gqlData: GQLNodeResponseType[] = [];

	for (let i = 0; i < args.addresses.length; i += PAGINATOR) {
		const gqlResponse: AGQLResponseType = await getGQLData({
			ids: null,
			tagFilters: [
				{
					name: TAGS.keys.protocolName,
					values: [TAGS.values.profileVersions['0.2'], TAGS.values.profileVersions['0.3']],
				},
			],
			owners: args.addresses.slice(i, i + PAGINATOR),
			cursor: null,
			reduxCursor: null,
			cursorObject: CursorEnum.GQL,
			useArweaveNet: true
		});

		gqlData = [...gqlData, ...gqlResponse.data];
	}

	for (let i = 0; i < args.addresses.length; i++) {
		let finalProfile: ProfileType | null = null;

		const gqlProfile = gqlData.find((data: GQLNodeResponseType) => data.node.owner.address === args.addresses[i]);
		const existingProfile = profiles.find((profile: ProfileType) => profile.walletAddress === args.addresses[i]);

		if (gqlProfile) {
			if (existingProfile) finalProfile = existingProfile;
			else {
				const txResponse = await fetch(getTxEndpoint(gqlProfile.node.id));
				if (txResponse.status === 200) {
					let fetchedProfile: any = await txResponse.text();
					fetchedProfile = JSON.parse(fetchedProfile);
					finalProfile = {
						handle: fetchedProfile.handle ? fetchedProfile.handle : null,
						avatar: fetchedProfile.avatar
							? fetchedProfile.avatar.includes('ar://')
								? fetchedProfile.avatar.substring(5)
								: fetchedProfile.avatar
							: null,
						twitter: fetchedProfile.links.twitter ? fetchedProfile.links.twitter : null,
						discord: fetchedProfile.links.discord ? fetchedProfile.links.discord : null,
						walletAddress: args.addresses[i],
					};
				}
			}
		}
		else {
			finalProfile = {
				handle: null,
				avatar: null,
				twitter: null,
				discord: null,
				walletAddress: args.addresses[i],
			};
		}

		profiles.push(finalProfile)
	}

	return profiles;
}