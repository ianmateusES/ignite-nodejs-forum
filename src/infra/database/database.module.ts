import { Module } from '@nestjs/common'

import {
  StudentsRepository,
  AttachmentsRepository,
  QuestionsRepository,
  AnswerAttachmentsRepository,
  AnswerCommentsRepository,
  AnswersRepository,
  QuestionAttachmentsRepository,
  QuestionCommentsRepository,
} from '@/domain/forum/application/repositories'
import { NotificationsRepository } from '@/domain/notification/application/repositories'

import {
  PrismaQuestionsRepository,
  PrismaStudentsRepository,
  PrismaQuestionCommentsRepository,
  PrismaQuestionAttachmentsRepository,
  PrismaAnswersRepository,
  PrismaAnswerCommentsRepository,
  PrismaAnswerAttachmentsRepository,
  PrismaAttachmentsRepository,
  PrismaNotificationsRepository,
} from './prisma/repositories'
import { PrismaService } from './prisma/prisma.service'
import { CacheModule } from '../cache'

@Module({
  imports: [CacheModule],
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    {
      provide: QuestionCommentsRepository,
      useClass: PrismaQuestionCommentsRepository,
    },
    {
      provide: QuestionAttachmentsRepository,
      useClass: PrismaQuestionAttachmentsRepository,
    },
    {
      provide: AnswersRepository,
      useClass: PrismaAnswersRepository,
    },
    {
      provide: AnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRepository,
    },
    {
      provide: AnswerAttachmentsRepository,
      useClass: PrismaAnswerAttachmentsRepository,
    },
    {
      provide: AttachmentsRepository,
      useClass: PrismaAttachmentsRepository,
    },
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    StudentsRepository,
    QuestionCommentsRepository,
    QuestionAttachmentsRepository,
    AnswersRepository,
    AnswerCommentsRepository,
    AnswerAttachmentsRepository,
    AttachmentsRepository,
    NotificationsRepository,
  ],
})
export class DatabaseModule {}
