import { FakeHasher, FakeEncrypter } from 'test/cryptography'
import { makeStudent } from 'test/factories'
import { InMemoryStudentsRepository } from 'test/repositories'
import { AuthenticateStudentUseCase } from './authenticate-student'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher
let encrypter: FakeEncrypter
let authenticateStudentUseCase: AuthenticateStudentUseCase

describe('Authenticate Student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()
    encrypter = new FakeEncrypter()

    authenticateStudentUseCase = new AuthenticateStudentUseCase(
      inMemoryStudentsRepository,
      fakeHasher,
      encrypter,
    )
  })

  it('should be able to authenticate a student', async () => {
    const email = 'johndoe@example.com'
    const password = '123456'
    const student = makeStudent({
      email,
      password: await fakeHasher.hash(password),
    })
    inMemoryStudentsRepository.items.push(student)

    const result = await authenticateStudentUseCase.execute({
      email,
      password,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
