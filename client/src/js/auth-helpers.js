import { h, Component, render } from 'preact';
import Cookies from 'universal-cookie';
import { route } from 'preact-router';
import decode from 'jwt-decode';
import { Menu } from 'preact-material-components';
import {API_SERVER} from "../../config";
import axios from "axios/index";

const tokenCookie = 'token';

export const logout = () => {
	deleteTokenCookie();
	route('/',true);
}

export const deleteTokenCookie = () => {
	const cookies = new Cookies();
	cookies.remove(tokenCookie);
}

export const setTokenCookie = (val) => {
	const cookies = new Cookies();
	cookies.set(tokenCookie, val, { path: '/' });
}

export const get_sign_in_out = () => {
	if(isSignedIn()){
		return (<a href="" onClick={() => logout()}><Menu.Item>Sign Out</Menu.Item></a>);
	}else{
		return (<a href="/signin"><Menu.Item>Sign In</Menu.Item></a>);
	}
}

export const isSignedIn = () => {
	const cookies = new Cookies();
	const encodedToken = cookies.get('token');
	if(encodedToken === undefined) return false;

	const token = decode(encodedToken);
	const date = new Date(0);
	date.setUTCSeconds(token.exp);
	return date > new Date();
}

export const formDataForAxios = (form) => {
	let formData = {};
	for (var pair of new FormData(form).entries()) {
		formData[pair[0]] = pair[1];
	}
	return formData;
}

export const renderElement = (content, element_id) => {
	let element = document.getElementById(element_id);
	render(content, element, element.lastChild);
}

export const passwordsMatch = (formData) => {
	//If there is no confirm_password field (like signin page), return true
	 return formData.confirm_password === undefined || formData.password === formData.confirm_password;
}


export const handleSubmit = (event,path) => {
	event.preventDefault();
	let message_area = document.getElementById('message_area');
	let sign_in_out = document.getElementById('sign_in_out');

	const formData = formDataForAxios(event.target);
	const formDataClone = formData;
	if(!passwordsMatch(formDataClone)){
		renderElement('Passwords do not match', 'message_area');
		return;
	}

	axios.post(`${API_SERVER}${path}`, formData)
		.then(function (response) {
			setTokenCookie(response.data.token);
			render(get_sign_in_out(), sign_in_out, sign_in_out.lastChild);
			route('/profile', true);
		})
		.catch(function (error) {
			if(error.response === undefined) {
				render(error, message_area, message_area.lastChild);
				return;
			}
			if (error.response.status === 401) {
				deleteTokenCookie();
				render('Wrong password.', message_area, message_area.lastChild);
			} else {
				render(error.response.data, message_area, message_area.lastChild);
			}
		});
}

export const handleRegisterSubmit = (event) => {
	handleSubmit(event,'/users/register');
}

export const handleSigninSubmit = (event) => {
	handleSubmit(event,'/users/login');
}

