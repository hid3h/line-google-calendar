import { Injectable } from "@nestjs/common";
import { OAuth2Client } from "google-auth-library";

// scopeに使える文字列をenumで定義しておく
export enum GoogleOAuth2Scope {
  CALNDER_EVENT_READONLY = "https://www.googleapis.com/auth/calendar.events.readonly",
}

@Injectable()
export class AuthService {
  private readonly oAuth2Client: OAuth2Client;

  constructor() {
    this.oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.BASE_URL}/auth/google/callback`,
    );
  }

  generateAuthUrl({ scope }: { scope: GoogleOAuth2Scope[] }) {
    return this.oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope,
    });
  }

  async saveRefreshToken(authCode: string) {
    const { tokens } = await this.oAuth2Client.getToken(authCode);

    console.log("tokens", tokens);

    // TODO: refresh tokenをDBに保存する
  }
}
