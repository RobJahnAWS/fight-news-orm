import { AuthenticationService } from "../_services";

export function AuthHeader() {
  // return authorization header with jwt token
  const currentUser = AuthenticationService.currentUserValue;
  if (currentUser && currentUser.token) {
    return { Authorization: `Bearer ${currentUser.token}`, "ngrok-skip-browser-warning": "any" };
  } else {
    return {
      "ngrok-skip-browser-warning": "any"
    }
  }
}
