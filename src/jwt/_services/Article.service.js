import { AuthHeader, HandleResponse } from "../_helpers";

export const ArticleService = {
	getAllArticles,
	deleteArticle,
	editArticle,
};

function getAllArticles() {
	const requestOptions = { method: "GET", headers: AuthHeader() };
	return fetch(
		`${process.env.REACT_APP_API_ENDPOINT}articles`,
		requestOptions
	)
		.then(HandleResponse)
		.then((data) => {
			// store user details and jwt token in local storage to keep user logged in between page refreshes
			console.log(data);
			return data;
		});
}

function deleteArticle(productId) {
	const requestOptions = { method: "DELETE", headers: AuthHeader() };
	return fetch(
		`${process.env.REACT_APP_API_ENDPOINT}articles/by-id/${productId}`,
		requestOptions
	)
		.then(HandleResponse)
		.then((data) => {
			// store user details and jwt token in local storage to keep user logged in between page refreshes
			console.log(data);
			return data;
		});
}
function editArticle(productId, body) {
	const requestOptions = {
		method: "PUT",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify(body),
	};
	return fetch(
		`${process.env.REACT_APP_API_ENDPOINT}articles/by-id/${productId}`,
		requestOptions
	)
		.then(HandleResponse)
		.then((data) => {
			// store user details and jwt token in local storage to keep user logged in between page refreshes
			console.log(data);
			return data;
		});
}
