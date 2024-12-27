import { Module } from '@nestjs/common'

import {
  OnAnswerCreated,
  OnQuestionBestAnswerChosen,
} from '@/domain/notification/application/subscribers'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases'

import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [
    OnAnswerCreated,
    OnQuestionBestAnswerChosen,
    SendNotificationUseCase,
  ],
})
export class EventsModule {}
