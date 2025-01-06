import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { DocumentService } from './document.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/api/document/')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get(':eventId')
  async getDocumentByEventId(eventId: string) {
    return this.documentService.getDocumentsByEventId(eventId);
  }

  @Post(':eventId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    @UploadedFile() files: Express.Multer.File[],
    @Param('eventId') eventId: string,
  ) {
    const result = await this.documentService.uploadDocument(files, eventId);
    return result;
  }
}
