import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { DocumentService } from './document.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

@Controller('/api/document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get(':eventId')
  async getDocumentByEventId(eventId: string) {
    return this.documentService.getDocumentsByEventId(eventId);
  }

  @Post(':eventId')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadDocument(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('eventId') eventId: string,
  ) {
    console.log('files', files);
    const result = await this.documentService.uploadDocument(files, eventId);
    return result;
  }
}
