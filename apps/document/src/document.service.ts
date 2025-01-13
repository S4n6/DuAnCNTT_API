import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { DOCUMENTS_CONSTANTS } from './constants';
import FormData from 'form-data';
import { InjectModel } from '@nestjs/mongoose';
import { DocumentEvent } from './document.schema';
import { Model } from 'mongoose';

@Injectable()
export class DocumentService {
  constructor(
    private readonly httpService: HttpService,

    @InjectModel(DocumentEvent.name)
    private documentModel: Model<DocumentEvent>,
  ) {}

  async getDocumentsByEventId(eventId: string) {
    return {
      id: 1,
      name: 'Document 1',
      eventId: eventId,
    };
  }

  async uploadDocument(files: Array<Express.Multer.File>, eventId: string) {
    const uploadedDocuments = [];
    const keyApi =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJaTVQ1cU1UOFdxMHZhaXVSTDVwbCIsImVtYWlsIjoibGVodXluaHBoYXQyODA4QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczNjc4ODQzNCwiZXhwIjoxNzM2NzkyMDM0fQ.Lmle1NkZX-ePQ4k0Be1hQj8FpjgON3u5Ae9ECZXvdRc';
    try {
      for (const file of files) {
        const formData = new FormData();
        const fileName = `${file.originalname}`;
        formData.append('image', file.buffer, fileName);

        const response = await lastValueFrom(
          this.httpService.post(
            DOCUMENTS_CONSTANTS.URL_SERVICE_UPLOAD,
            formData,
            {
              headers: {
                ...formData.getHeaders(),
                Authorization: `Bearer ${keyApi}`,
              },
            },
          ),
        );
        console.log('response', response.data);
        const newDocument = new this.documentModel({
          name: file.originalname,
          url: response.data.imageUrl,
          eventId,
        });
        const savedDocument = await newDocument.save();
        uploadedDocuments.push(savedDocument);
      }

      return uploadedDocuments;
    } catch (error) {
      throw new Error(`Failed to upload documents: ${error.message}`);
    }
  }
}
