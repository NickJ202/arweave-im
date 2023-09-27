import { Dispatch } from 'redux';

import { GroupReduxType } from 'helpers/types';

import { SET_ACTIVE_CHANNEL_ID, SET_GROUP, UPDATE_GROUP_STATE } from './constants';

export function setGroup(payload: GroupReduxType | null) {
	return (dispatch: Dispatch) => {
		dispatch({
			type: SET_GROUP,
			payload: payload,
		});
	};
}

export function setActiveChannelId(payload: string) {
	return (dispatch: Dispatch) => {
		dispatch({
			type: SET_ACTIVE_CHANNEL_ID,
			payload: payload,
		});
	};
}

export function updateGroupState(payload: GroupReduxType) {
	return (dispatch: Dispatch) => {
		dispatch({
			type: UPDATE_GROUP_STATE,
			payload: payload,
		});
	};
}