import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'

import { DeleteAnswerCommentUseCase } from '@/domain/forum/application/use-cases'

import { CurrentUser, UserPayload } from '../../auth'

@Controller('/answers/comments/:id')
export class DeleteAnswerCommentController {
  constructor(
    private readonly deleteAnswerComment: DeleteAnswerCommentUseCase,
  ) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('id') answerCommentId: string,
  ) {
    const userId = user.sub

    const result = await this.deleteAnswerComment.execute({
      answerCommentId,
      authorId: userId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
