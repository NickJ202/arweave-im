import { NotificationReduxType, ReduxActionType } from 'helpers/types';

import { CLEAR_NOTIFICATIONS, SET_NOTIFICATIONS } from './constants';

export function notificationsReducer(state: NotificationReduxType[] | null = [], action: ReduxActionType) {
    switch (action.type) {
        case SET_NOTIFICATIONS:
            return getUpdatedNotifications(state, action.payload);
        case CLEAR_NOTIFICATIONS:
            return getClearedNotifications(state, action.payload);
        default:
            return state;
    }
}

function getClearedNotifications(state: NotificationReduxType[] | null, payload: string | null) {
    if (!payload || !state) return null;
    return state.filter((notificationObject: NotificationReduxType) => notificationObject.channelId !== payload);
}

function getUpdatedNotifications(state: NotificationReduxType[] | null, payload: NotificationReduxType[] | null) {
    const updatedState = state ? [...state] : [];
    if (payload) {
        payload.forEach((notificationObject: NotificationReduxType) => {
            const stateIndex = state
                ? state.findIndex(
                    (stateObject: NotificationReduxType) => stateObject.channelId === notificationObject.channelId
                )
                : undefined;
            if (stateIndex !== undefined && stateIndex !== -1)
                updatedState[stateIndex] = {
                    channelId: state[stateIndex].channelId,
                    count: state[stateIndex].count + notificationObject.count,
                };
            else updatedState.push({ channelId: notificationObject.channelId, count: notificationObject.count });
        });
    }
    return updatedState;
}
