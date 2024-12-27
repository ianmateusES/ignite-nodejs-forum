import { UniqueEntityID } from '@/core/entities'
import { NotAllowedError } from '@/core/errors/errors'

import { makeAnswer, makeAnswerAttachment } from 'test/factories'
import {
  InMemoryAnswerAttachmentsRepository,
  InMemoryAnswersRepository,
} from 'test/repositories'
import { DeleteAnswerUseCase } from './delete-answer'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let deleteAnswerUseCase: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )

    deleteAnswerUseCase = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete a answer', async () => {
    const authorId = 'author-1'
    const answerId = 'answer-1'
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID(authorId),
      },
      new UniqueEntityID(answerId),
    )
    await inMemoryAnswersRepository.create(newAnswer)
    for (let i = 1; i < 3; i++) {
      inMemoryAnswerAttachmentsRepository.items.push(
        makeAnswerAttachment({
          answerId: newAnswer.id,
          attachmentId: new UniqueEntityID(i.toString()),
        }),
      )
    }

    await deleteAnswerUseCase.execute({
      answerId,
      authorId,
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
    expect(inMemoryAnswerAttachmentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer from another user', async () => {
    const answerId = 'answer-1'
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID(answerId),
    )
    await inMemoryAnswersRepository.create(newAnswer)

    const result = await deleteAnswerUseCase.execute({
      answerId,
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
