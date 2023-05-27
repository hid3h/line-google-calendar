import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";
import { AuthService, GoogleOAuth2Scope } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("google")
  login(@Res() res: Response) {
    const scope = [GoogleOAuth2Scope.CALNDER_EVENT_READONLY];
    const authorizeUrl = this.authService.generateAuthUrl({ scope });

    res.redirect(authorizeUrl);
  }

  @Get("google/callback")
  async callback(@Res() res: Response) {
    const authCode = res.req.query.code as string;
    this.authService.saveRefreshToken(authCode);

    // TODO: リダイレクト
  }
}
