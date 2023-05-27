import { Controller, Get, Res } from "@nestjs/common";
import { CalendarService } from "./calendar.service";

@Controller("calendars")
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get()
  index() {
    console.log("index");
    this.calendarService.fetchCalendars();
  }
}
