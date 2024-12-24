import { Injectable } from '@nestjs/common';
import { GoogleDriveService } from './googleDrive.service';

@Injectable()
export class DocumentService {
  constructor(private readonly googleDriveService: GoogleDriveService) {}

  async getDocumentByEventId(eventId: string) {
    return {
      id: 1,
      name: 'Document 1',
      eventId: eventId,
    };
  }

  async uploadDocument(file: Express.Multer.File, eventId: string) {
    try {
      const fileName = file.originalname + '-' + Date.now() + '-' + eventId;
      const fileBuffer = file.buffer;
      return this.googleDriveService.uploadFile(
        fileBuffer,
        fileName,
        file.mimetype,
      );
    } catch (error) {
      return error;
    }
  }
}
