import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { DOCUMENTS_CONSTANTS } from './constants';
import FormData from 'form-data';

@Injectable()
export class DocumentService {
  constructor(private readonly httpService: HttpService) {}

  async getDocumentsByEventId(eventId: string) {
    return {
      id: 1,
      name: 'Document 1',
      eventId: eventId,
    };
  }

  async uploadDocument(files: Express.Multer.File[], eventId: string) {
    try {
      const formData = new FormData();
      for (const file of files) {
        const fileName = `${file.originalname}-${Date.now()}-${eventId}`;
        formData.append('images', file.buffer, fileName);
      }

      const response = await lastValueFrom(
        this.httpService.post(
          DOCUMENTS_CONSTANTS.URL_SERVICE_UPLOAD,
          formData,
          {
            headers: {
              ...formData.getHeaders(),
            },
          },
        ),
      );

      return response.data;
    } catch (error) {
      throw new Error(`Failed to upload documents: ${error.message}`);
    }
  }
}
