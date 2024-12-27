import { UniqueEntityID } from '@/core/entities'
import { DomainEvent } from '@/core/events'

import { Answer } from '../entities'

export class AnswerCreatedEvent implements DomainEvent {
  public occurredAt: Date
  public answer: Answer

  constructor(answer: Answer) {
    this.answer = answer
    this.occurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.answer.id
  }
}
