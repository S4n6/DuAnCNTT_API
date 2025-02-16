import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Query,
  Inject,
  Param,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'lib/common/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('/api/document/')
export class DocumentController {
  constructor(
    @Inject('DOCUMENT_SERVICE')
    private readonly documentServiceClient: ClientProxy,
  ) {}

  @Get(':eventId')
  async getDocumentByEventId(@Param('eventId') eventId: string) {
    return this.documentServiceClient
      .send({ cmd: 'getDocumentByEventId' }, { eventId })
      .toPromise();
  }

  @Post(':eventId')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadDocument(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('eventId') eventId: string,
  ) {
    console.log('files', files);
    return this.documentServiceClient
      .send({ cmd: 'uploadDocument' }, { files, eventId })
      .toPromise();
  }

  @Delete()
  async deleteDocuments(@Body() data: { documentIds: string }) {
    return this.documentServiceClient
      .send({ cmd: 'deleteDocuments' }, data)
      .toPromise();
  }
}
