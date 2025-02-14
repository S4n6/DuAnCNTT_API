import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { DOCUMENTS_CONSTANTS } from './constants';
import FormData from 'form-data';
import { InjectModel } from '@nestjs/mongoose';
import { DocumentEvent } from './document.schema';
import { Model } from 'mongoose';
import { Readable } from 'stream';

@Injectable()
export class DocumentService {
  constructor(
    private readonly httpService: HttpService,

    @InjectModel(DocumentEvent.name)
    private documentModel: Model<DocumentEvent>,
  ) {}

  async getDocumentsByEventId(eventId: string) {
    try {
      const documents = await this.documentModel.find({ eventId });
      return {
        success: true,
        message: 'Documents found',
        data: documents,
      };
    } catch (error) {
      throw new Error(`Failed to get documents: ${error.message}`);
    }
  }

  async uploadDocument(files: Array<Express.Multer.File>, eventId: string) {
    const uploadedDocuments = [];
    try {
      const loginResponse = await lastValueFrom(
        this.httpService.post(
          'https://nha-trang-sea-food-be.vercel.app/users/login',
          {
            email: 'lehuynhphat2808@gmail.com',
            password: '123456',
          },
        ),
      );
      const keyApi = loginResponse.data.accessToken;
      for (const file of files) {
        console.log('keyApi', file);
        const formData = new FormData();
        const fileName = `${file.originalname}`;
        
        const bufferData = Buffer.isBuffer(file.buffer)
          ? file.buffer
          : Buffer.from(file.buffer);
        const stream = new Readable();
        stream.push(bufferData);
        stream.push(null); 

        formData.append('image', stream, {
          filename: fileName,
          contentType: file.mimetype,
        });

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

      return {
        success: true,
        message: 'Documents uploaded successfully',
        data: uploadedDocuments,
      };
    } catch (error) {
      throw new Error(`Failed to upload documents: ${error.message}`);
    }
  }

  async deleteDocuments(documentIds: string[]) {
    try {
      await this.documentModel.deleteMany({ _id: { $in: documentIds } });
      return {
        success: true,
        message: 'Documents deleted successfully',
        data: documentIds,
      };
    } catch (error) {
      throw new Error(`Failed to delete documents: ${error.message}`);
    }
  }
}
