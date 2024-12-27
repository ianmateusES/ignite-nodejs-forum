import { Injectable } from '@nestjs/common'

import { StudentsRepository } from '@/domain/forum/application/repositories'
import { Student } from '@/domain/forum/enterprise/entities'

import { PrismaService } from '../prisma.service'
import { PrismaStudentMapper } from '../mappers'

@Injectable()
export class PrismaStudentsRepository implements StudentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Student | null> {
    const student = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!student) {
      return null
    }

    return PrismaStudentMapper.toDomain(student)
  }

  async create(student: Student): Promise<void> {
    const data = PrismaStudentMapper.toPrisma(student)

    await this.prisma.user.create({
      data,
    })
  }
}