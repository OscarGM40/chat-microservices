import config from "config";
import got from "got";

const USERS_SERVICE_URI = <string>config.get("USERS_SERVICE_URI");

export interface User {
  id: string;
  username: string;
  createdAt: string;
}
export interface UserSession {
  createdAt: string;
  expiresAt: string;
  id: string;
  userId: string;
}

export default class UsersService {
  static async createUserSession({ password, username }: { password: string; username: string }) {
    const body = <UserSession>(
      await got.post(`${USERS_SERVICE_URI}/sessions`, { json: { username, password } }).json()
    );
    return body;
  }
  static async createUser({ password, username }: { password: string; username: string }) {
    const body = <UserSession>await got
      .post(`${USERS_SERVICE_URI}/users`, { json: { username, password } })
      .json();
    return body;
  }

  static async fetchUser({ userId }: { userId: string }): Promise<User | null> {
    const body = await got.get(`${USERS_SERVICE_URI}/users/${userId}`).json();
    if (!body) return null;
    return <User>body;
  }

  static async fetchUserSession({ sessionId }: { sessionId: string }): Promise<UserSession | null> {
    const body = await got.get(`${USERS_SERVICE_URI}/sessions/${sessionId}`).json();
    if (!body) return null;
    // probar esto en mi proyecto
    return <UserSession>body;
  }
}
