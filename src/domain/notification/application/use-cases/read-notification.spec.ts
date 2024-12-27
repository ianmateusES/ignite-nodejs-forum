import { UniqueEntityID } from '@/core/entities'
import { NotAllowedError } from '@/core/errors/errors'

import { makeNotification } from 'test/factories'
import { InMemoryNotificationsRepository } from 'test/repositories'
import { ReadNotificationUseCase } from './read-notification'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let readNotificationUseCase: ReadNotificationUseCase

describe('Send Notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    readNotificationUseCase = new ReadNotificationUseCase(
      inMemoryNotificationsRepository,
    )
  })

  it('should be able to read a notification', async () => {
    const notification = makeNotification()
    inMemoryNotificationsRepository.create(notification)

    const result = await readNotificationUseCase.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to read a notification from another user', async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityID('recipient-1'),
    })
    inMemoryNotificationsRepository.create(notification)

    const result = await readNotificationUseCase.execute({
      notificationId: notification.id.toString(),
      recipientId: 'recipient-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
