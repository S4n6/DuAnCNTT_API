import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';
import { Readable } from 'stream';
import { DOCUMENTS_CONSTANTS } from './constants';

@Injectable()
export class GoogleDriveService {
  private driveClient;

  constructor() {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: DOCUMENTS_CONSTANTS.GOOGLE_CLIENT_EMAIL,
        private_key: DOCUMENTS_CONSTANTS.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    this.driveClient = google.drive({
      version: 'v3',
      auth,
    });
  }

  async uploadFile(
    fileBuffer: Buffer,
    fileName: string,
    mimeType: string,
  ): Promise<any> {
    const folderId = 'Database_DuAnCntt';
    const fileMetadata = {
      name: fileName,
      parents: [folderId],
    };

    const media = {
      mimeType,
      body: Readable.from(fileBuffer),
    };

    const response = await this.driveClient.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, name, parents',
    });

    return response.data;
  }
}
