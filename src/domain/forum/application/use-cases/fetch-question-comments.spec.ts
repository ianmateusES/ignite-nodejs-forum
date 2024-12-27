import { UniqueEntityID } from '@/core/entities'

import { makeQuestionComment, makeStudent } from 'test/factories'
import {
  InMemoryStudentsRepository,
  InMemoryQuestionCommentsRepository,
} from 'test/repositories'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let fetchQuestionCommentsUseCase: FetchQuestionCommentsUseCase

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository(
      inMemoryStudentsRepository,
    )

    fetchQuestionCommentsUseCase = new FetchQuestionCommentsUseCase(
      inMemoryQuestionCommentsRepository,
    )
  })

  it('should be able to fetch question comments', async () => {
    const student = makeStudent({ name: 'John Doe' })
    inMemoryStudentsRepository.items.push(student)
    const questionId = 'question-1'
    const comment1 = makeQuestionComment({
      questionId: new UniqueEntityID(questionId),
      authorId: student.id,
    })

    const comment2 = makeQuestionComment({
      questionId: new UniqueEntityID(questionId),
      authorId: student.id,
    })

    const comment3 = makeQuestionComment({
      questionId: new UniqueEntityID(questionId),
      authorId: student.id,
    })

    await inMemoryQuestionCommentsRepository.create(comment1)
    await inMemoryQuestionCommentsRepository.create(comment2)
    await inMemoryQuestionCommentsRepository.create(comment3)

    const result = await fetchQuestionCommentsUseCase.execute({
      questionId,
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

  it('should be able to fetch paginated question comments', async () => {
    const student = makeStudent({ name: 'John Doe' })
    inMemoryStudentsRepository.items.push(student)
    const questionId = 'question-1'
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityID(questionId),
          authorId: student.id,
        }),
      )
    }

    const result = await fetchQuestionCommentsUseCase.execute({
      questionId,
      page: 2,
    })

    expect(result.value?.comments).toHaveLength(2)
  })
})