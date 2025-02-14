import {
  Controller,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DocumentService } from './document.service';

@Controller()
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @MessagePattern({ cmd: 'getDocumentByEventId' })
  async getDocumentByEventId(@Payload() data: { eventId: string }) {
    const { eventId } = data;
    console.log('eventId::', eventId);
    return this.documentService.getDocumentsByEventId(eventId);
  }

  @MessagePattern({ cmd: 'uploadDocument' })
  async uploadDocument(@Payload() data: { files: Array<Express.Multer.File>, eventId: string }) {
    const { files, eventId } = data;
    console.log('files', files);
    const result = await this.documentService.uploadDocument(files, eventId);
    return result;
  }
  
  @MessagePattern({ cmd: 'deleteDocuments' })
  async deleteDocuments(@Payload() data: { documentIds: string }) {
    const { documentIds } = data;
    const documentIdsArray = documentIds.split(',');
    console.log('documentIds', documentIdsArray);
    const result = await this.documentService.deleteDocuments(documentIdsArray);
    return result;
  }
}
