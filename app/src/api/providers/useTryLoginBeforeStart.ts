// import { useQuery } from '@tanstack/react-query';
// import api from '@api/index';
// import IdentityProvider from '@model/IdentityProvider';
// import { getCookie } from 'tiny-cookie';
// import axios from 'axios';
//
// async function tryLogin(tenant: string, config: IdentityProvider) {
// 	return new Promise<void>(resolve => {
// 		const ifrm = document.createElement('iframe');
// 		ifrm.setAttribute(
// 			'src',
// 			`https://localhost:8443/realms/cosmo/protocol/openid-connect/login-status-iframe.html`
// 		);
// 		ifrm.style.width = '640px';
// 		ifrm.style.height = '480px';
// 		ifrm.onload = function () {
// 			console.log(document.cookie);
// 			console.log('load');
// 			console.log(getCookie('KEYCLOAK_SESSION'), getCookie('KEYCLOAK_SESSION_LEGACY'));
// 			const cookies = ifrm.contentDocument.cookie.split(';');
//
// 			for (let i = 0; i < cookies.length; i++) {
// 				const cookie = cookies[i];
// 				const eqPos = cookie.indexOf('=');
// 				const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
// 				ifrm.contentDocument.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
// 			}
// 			// ifrm.contentWindow?.postMessage('spring-boot-client ', 'https://localhost:8443/');
// 		};
// 		document.body.appendChild(ifrm);
// 		const messageCallback = function (event) {
// 			console.log(event);
// 		};
// 		window.addEventListener('message', messageCallback, false);
// 		resolve('ciao');
// 	});
// }
//
// export default (tenant: string, config: IdentityProvider) =>
// 	useQuery(['login', 'providers', 'test', tenant], () => tryLogin(tenant, config), {
// 		suspense: false,
// 		enabled: !!config
// 	});

export default {};
