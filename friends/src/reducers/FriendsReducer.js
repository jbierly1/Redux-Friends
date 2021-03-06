import {
	FETCHING,
	FETCHED,
	ERROR,
	SAVING,
	SAVED,
	UPDATING,
	UPDATED,
	DELETING,
	DELETED
} from '../actions';
const initialState = {
	fetchingFriends: false,
	friendsFetched: false,
	friendsSaved: false,
	savingFriends: false,
	updatingFriend: false,
	friendUpdated: false,
	deletingFriend: false,
	friendDeleted: false,
	friends: [],
	error: null

	// Array characters, Boolean fetching, null error.
};

export const FriendsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCHING:
			return { ...state, fetchingFriends: true, friendsFetched: false };
		case FETCHED:
			return Object.assign({}, state, {
				friends: action.payload,
				fetchingFriends: false,
				friendsFetched: true,
				error: null
			});
		case ERROR:
			return { ...state, fetchingFriends: false, error: action.errorMessage };
		case SAVING:
			return { ...state, savingFriends: true };
		case SAVED:
			console.log(action.payload);
			return {
				...state,
				friends: action.payload,
				friendsSaved: true,
				savingFriends: false,
				error: null
			};
		case UPDATING:
			return { ...state, updatingFriend: true };
		case UPDATED:
			let newFriends = state.friends.slice();

			newFriends.map(friend => {
				if (friend.id === action.payload.id) {
					return action.payload;
				}
				return friend;
			});
			return {
				...state,
				friends: newFriends,
				friendUpdated: true,
				updatingFriend: false
			};

		case DELETING:
			return { ...state, deletingFriend: true };
		case DELETED:
			return {
				...state,
				friends: action.payload,
				friendDeleted: true,
				deletingFriend: false
			};

		default:
			return state;
	}
};
