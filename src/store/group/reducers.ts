import { GroupReduxType, ReduxActionType } from 'helpers/types';

import { SET_ACTIVE_CHANNEL_ID, SET_GROUP, UPDATE_GROUP_STATE } from './constants';

export function groupReducer(state: GroupReduxType | null = null, action: ReduxActionType) {
	switch (action.type) {
		case SET_GROUP:
			return action.payload ? Object.assign({}, state, action.payload) : null;
		case SET_ACTIVE_CHANNEL_ID:
			return Object.assign({}, state, {
				data: state.data,
				groupId: state.groupId,
				activeChannelId: action.payload,
			});
		case UPDATE_GROUP_STATE:
			return Object.assign({}, state, {
				data: action.payload,
				groupId: state.groupId,
				activeChannelId: state.activeChannelId,
			});
		default:
			return state;
	}
}
