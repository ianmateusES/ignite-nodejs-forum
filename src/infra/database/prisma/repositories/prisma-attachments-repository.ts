import { Injectable } from '@nestjs/common'

import { AttachmentsRepository } from '@/domain/forum/application/repositories'
import { Attachment } from '@/domain/forum/enterprise/entities'

import { PrismaAttachmentMapper } from '../mappers'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaAttachmentsRepository implements AttachmentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(attachment: Attachment): Promise<void> {
    const data = PrismaAttachmentMapper.toPrisma(attachment)

    await this.prisma.attachment.create({
      data,
    })
  }
}
