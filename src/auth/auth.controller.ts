import { Controller, Get, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService, GoogleOAuth2Scope } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("google")
  login(@Res() res: Response) {
    const scope = [
      GoogleOAuth2Scope.CALNDAR_EVENT_READONLY,
      GoogleOAuth2Scope.CALENDAR_READONLY,
    ];
    const authorizeUrl = this.authService.generateAuthUrl({ scope });

    res.redirect(authorizeUrl);
  }

  @Get("google/callback")
  async callback(@Req() req: Request) {
    const authCode = req.query.code as string;
    this.authService.saveRefreshToken(authCode);

    // TODO: リダイレクト
  }
}
