import { Injectable } from "@nestjs/common";
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
@Injectable()
export class CalendarService {
  async fetchCalendars() {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
      access_token: accessToken,
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const res = await calendar.calendarList.list();
    return res.data.items;
  }
}
