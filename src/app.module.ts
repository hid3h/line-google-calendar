import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { CalendarModule } from './calendar/calendar.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, CalendarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
