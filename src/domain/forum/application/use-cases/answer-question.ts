import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities'
import { Either, right } from '@/core/either'

import {
  Answer,
  AnswerAttachment,
  AnswerAttachmentList,
} from '../../enterprise/entities'
import { AnswersRepository } from '../repositories'

export interface AnswerQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
  attachmentsIds: string[]
}

type AnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer
  }
>

@Injectable()
export class AnswerQuestionUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    questionId,
    content,
    attachmentsIds,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
    })
    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answer.id,
      })
    })

    Object.assign(answer, {
      attachments: new AnswerAttachmentList(answerAttachments),
    })

    await this.answersRepository.create(answer)

    return right({
      answer,
    })
  }
}
