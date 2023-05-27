import { Injectable } from "@nestjs/common";
import { OAuth2Client } from "google-auth-library";

// scopeに使える文字列をenumで定義しておく
export enum GoogleOAuth2Scope {
  CALNDAR_EVENT_READONLY = "https://www.googleapis.com/auth/calendar.events.readonly",
  CALENDAR_READONLY = "https://www.googleapis.com/auth/calendar.readonly",
}

@Injectable()
export class AuthService {
  private readonly oauth2Client: OAuth2Client;

  constructor() {
    this.oauth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.BASE_URL}/auth/google/callback`,
    );
  }

  generateAuthUrl({ scope }: { scope: GoogleOAuth2Scope[] }) {
    return this.oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope,
    });
  }

  async saveRefreshToken(authCode: string) {
    const { tokens } = await this.oauth2Client.getToken(authCode);

    console.log("tokens", tokens);

    // TODO: refresh tokenをDBに保存する
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    this.oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });

    const { credentials } = await this.oauth2Client.refreshAccessToken();
    console.log("credentials", credentials);
    return credentials.access_token;
  }
}
