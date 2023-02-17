import { AuthHeader, HandleResponse } from "../_helpers";

export const CommentService = {
    getAllComments,
    deleteComment,
};

function getAllComments() {
    const requestOptions = { method: "GET", headers: AuthHeader() };
    return fetch(`${process.env.REACT_APP_API_ENDPOINT}comment`, requestOptions)
        .then(HandleResponse)
        .then((data) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log(data);
            return data;
        });
}

function deleteComment() {
    const requestOptions = { method: "DELETE", headers: AuthHeader() };
    return fetch(`${process.env.REACT_APP_API_ENDPOINT}comment`, requestOptions)
        .then(HandleResponse)
        .then((data) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log(data);
            return data;
        });
}
