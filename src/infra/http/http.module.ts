import { Module } from '@nestjs/common'

import {
  CreateQuestionUseCase,
  FetchRecentQuestionsUseCase,
  RegisterStudentUseCase,
  AuthenticateStudentUseCase,
  GetQuestionBySlugUseCase,
  EditQuestionUseCase,
  DeleteQuestionUseCase,
  AnswerQuestionUseCase,
  EditAnswerUseCase,
  DeleteAnswerUseCase,
  FetchQuestionAnswersUseCase,
  ChooseQuestionBestAnswerUseCase,
  CommentOnQuestionUseCase,
  DeleteQuestionCommentUseCase,
  CommentOnAnswerUseCase,
  DeleteAnswerCommentUseCase,
  FetchQuestionCommentsUseCase,
  FetchAnswerCommentsUseCase,
  UploadAndCreateAttachmentUseCase,
} from '@/domain/forum/application/use-cases'
import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases'

import {
  CreateAccountController,
  AuthenticateController,
  CreateQuestionController,
  FetchRecentQuestionsController,
  GetQuestionBySlugController,
  EditQuestionController,
  DeleteQuestionController,
  AnswerQuestionController,
  EditAnswerController,
  DeleteAnswerController,
  FetchQuestionAnswersController,
  ChooseQuestionBestAnswerController,
  CommentOnQuestionController,
  DeleteQuestionCommentController,
  CommentOnAnswerController,
  DeleteAnswerCommentController,
  FetchQuestionCommentsController,
  FetchAnswerCommentsController,
  UploadAttachmentController,
  ReadNotificationController,
} from './controllers'
import { CryptographyModule } from '../cryptography'
import { DatabaseModule } from '../database'
import { StorageModule } from '../storage'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
    EditAnswerController,
    DeleteAnswerController,
    FetchQuestionAnswersController,
    ChooseQuestionBestAnswerController,
    CommentOnQuestionController,
    DeleteQuestionCommentController,
    CommentOnAnswerController,
    DeleteAnswerCommentController,
    FetchQuestionCommentsController,
    FetchAnswerCommentsController,
    UploadAttachmentController,
    ReadNotificationController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    AnswerQuestionUseCase,
    EditAnswerUseCase,
    DeleteAnswerUseCase,
    FetchQuestionAnswersUseCase,
    ChooseQuestionBestAnswerUseCase,
    CommentOnQuestionUseCase,
    DeleteQuestionCommentUseCase,
    CommentOnAnswerUseCase,
    DeleteAnswerCommentUseCase,
    FetchQuestionCommentsUseCase,
    FetchAnswerCommentsUseCase,
    UploadAndCreateAttachmentUseCase,
    ReadNotificationUseCase,
  ],
})
export class HttpModule {}
