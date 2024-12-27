import { AttachmentsRepository } from '@/domain/forum/application/repositories'
import { Attachment } from '@/domain/forum/enterprise/entities'

export class InMemoryAttachmentsRepository implements AttachmentsRepository {
  public items: Attachment[] = []

  async create(attachment: Attachment) {
    this.items.push(attachment)
  }
}
