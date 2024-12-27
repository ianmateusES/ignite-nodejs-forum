import { UniqueEntityID } from '@/core/entities'

import { makeAnswer } from 'test/factories'
import {
  InMemoryAnswerAttachmentsRepository,
  InMemoryAnswersRepository,
} from 'test/repositories'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let fetchQuestionAnswersUseCase: FetchQuestionAnswersUseCase

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )

    fetchQuestionAnswersUseCase = new FetchQuestionAnswersUseCase(
      inMemoryAnswersRepository,
    )
  })

  it('should be able to fetch question answers', async () => {
    const questionId = 'question-1'
    for (let i = 1; i <= 3; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityID(questionId),
        }),
      )
    }

    const result = await fetchQuestionAnswersUseCase.execute({
      questionId,
      page: 1,
    })

    expect(result.value?.answers).toHaveLength(3)
  })

  it('should be able to fetch paginated question answers', async () => {
    const questionId = 'question-1'
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityID(questionId),
        }),
      )
    }

    const result = await fetchQuestionAnswersUseCase.execute({
      questionId,
      page: 2,
    })

    expect(result.value?.answers).toHaveLength(2)
  })
})
