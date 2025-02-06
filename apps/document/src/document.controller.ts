import {
  Body,
  Controller,
  Delete,
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

@Controller('/api/document/')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get(':eventId')
  async getDocumentByEventId(@Param('eventId') eventId: string) {
    console.log('eventId::', eventId);
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
  
  @Delete(':documentIds')
  async deleteDocuments(@Param('documentIds') documentIds: string) {
    const documentIdsArray = documentIds.split(',');
    console.log('documentIds', documentIdsArray);
    const result = await this.documentService.deleteDocuments(documentIdsArray);
    return result;
  }
}
