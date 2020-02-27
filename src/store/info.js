import firebase from 'firebase/app';

export default {
	state: {
		info: {}
	},
	mutations: {
		setInfo(state, info) {
			state.info = info;
		},
		cleaInfo(state) {
			state.info = {};
		}
	},
	actions: {
		async fetchInfo({dispatch, commit}) {
			try {
				const uid = await dispatch('getUid');
				const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();
				commit('setInfo', info);
			} catch (error) {
				
			}
		}
	},
	getters: {
		info: s => s.info
	}
}