import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {
	AUTH_TOKEN,
	SIGNIN,
	SIGNOUT,
	IS_LOGIN,
} from '../constants/Auth';
import {
	showAuthMessage,
	authenticated,
	isUserLogin,
	signOutSuccess,
} from "../actions/Auth";

import AuthService from 'services/AuthService';

export function* signInWithFBEmail() {
	yield takeEvery(SIGNIN, function* ({ payload }) {
		const { email, password } = payload;
		try {
			const params = {
				username: email,
				password
			}
			const user = yield call(AuthService.login, params);
			if (user.status === 0) {
				yield put(showAuthMessage(user.msg));
			} else {
				localStorage.setItem(AUTH_TOKEN, user.token);
				yield put(authenticated(user.token));
			}
		} catch (err) {
			yield put(showAuthMessage(err));
		}
	});
}

export function* checkIsLogin() {
	yield takeEvery(IS_LOGIN, function* () {
		try {
			const resp = yield call(AuthService.isLogin);
			if (resp.status === 0) {
				localStorage.removeItem(AUTH_TOKEN);
				yield put(signOutSuccess(undefined))
			} else {
				yield put(isUserLogin(resp));
				localStorage.setItem(AUTH_TOKEN, resp.token);
				yield put(authenticated(resp.token));
			}
		} catch (err) {
			localStorage.removeItem(AUTH_TOKEN);
			yield put(signOutSuccess())
		}
	});
}

export function* signOut() {
	yield takeEvery(SIGNOUT, function* () {
		try {
			localStorage.removeItem(AUTH_TOKEN);
			yield put(signOutSuccess())
		} catch (err) {
			yield put(showAuthMessage(err));
		}
	});
}


export default function* rootSaga() {
	yield all([
		fork(signInWithFBEmail),
		fork(checkIsLogin),
		fork(signOut),
	]);
}
