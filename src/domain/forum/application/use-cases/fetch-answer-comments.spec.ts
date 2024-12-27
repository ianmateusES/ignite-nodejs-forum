import { UniqueEntityID } from '@/core/entities'

import { makeAnswerComment, makeStudent } from 'test/factories'
import {
  InMemoryAnswerCommentsRepository,
  InMemoryStudentsRepository,
} from 'test/repositories'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let fetchAnswerCommentsUseCase: FetchAnswerCommentsUseCase

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository(
      inMemoryStudentsRepository,
    )

    fetchAnswerCommentsUseCase = new FetchAnswerCommentsUseCase(
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be able to fetch answer comments', async () => {
    const student = makeStudent({ name: 'John Doe' })
    inMemoryStudentsRepository.items.push(student)
    const answerId = 'answer-1'
    const comment1 = makeAnswerComment({
      answerId: new UniqueEntityID(answerId),
      authorId: student.id,
    })
    const comment2 = makeAnswerComment({
      answerId: new UniqueEntityID(answerId),
      authorId: student.id,
    })
    const comment3 = makeAnswerComment({
      answerId: new UniqueEntityID(answerId),
      authorId: student.id,
    })
    await Promise.all([
      inMemoryAnswerCommentsRepository.create(comment1),
      inMemoryAnswerCommentsRepository.create(comment2),
      inMemoryAnswerCommentsRepository.create(comment3),
    ])

    const result = await fetchAnswerCommentsUseCase.execute({
      answerId,
      page: 1,
    })

    expect(result.value?.comments).toHaveLength(3)
    expect(result.value?.comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          author: 'John Doe',
          commentId: comment1.id,
        }),
        expect.objectContaining({
          author: 'John Doe',
          commentId: comment2.id,
        }),
        expect.objectContaining({
          author: 'John Doe',
          commentId: comment3.id,
        }),
      ]),
    )
  })

  it('should be able to fetch paginated answer comments', async () => {
    const student = makeStudent({ name: 'John Doe' })
    inMemoryStudentsRepository.items.push(student)
    const answerId = 'answer-1'
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityID(answerId),
          authorId: student.id,
        }),
      )
    }

    const result = await fetchAnswerCommentsUseCase.execute({
      answerId,
      page: 2,
    })

    expect(result.value?.comments).toHaveLength(2)
  })
})
