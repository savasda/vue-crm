import firebase, { registerVersion } from 'firebase/app';

export default {
	actions: {

		async login({dispatch, commit}, {email, password}) {
			try {
				await firebase.auth().signInWithEmailAndPassword(email, password)
			} catch (err){
				commit('setError', err);
				throw Error(err);
			}
		},

		async logout({dispatch, commit}) {
			try {
				await firebase.auth().signOut();
				await commit('cleaInfo')
			} catch (e){
				commit('setError', e);
				throw Error(e);
			}
		},

		async register({dispatch, commit}, {email, password, name}) {
			try {
				await firebase.auth().createUserWithEmailAndPassword(email, password)
				const uid = await dispatch('getUid');
				await firebase.database().ref(`/users/${uid}/info`).set({
					bill: 10000,
					name
				});
			} catch (e){
				commit('setError', e);
				throw Error(e);
			}
		},

		getUid() {
			const user = firebase.auth().currentUser;
			return user ? user.uid : null
		}



	}
}