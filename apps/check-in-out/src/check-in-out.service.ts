import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';
import {
  CheckInOutResponse,
  ICheckInOutResponse,
} from './check-in-out.response';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CheckInOut } from './check-in-out.schema';
import { CheckInOutRequest } from './check-in-out.request';

@Injectable()
export class CheckInOutService {
  constructor(
    @InjectModel('CheckInOut')
    private readonly checkInOutModel: Model<CheckInOut>,
  ) {}

  async generateQRCode(
    type: string,
    event: object,
  ): Promise<ICheckInOutResponse> {
    try {
      const urlCheckIn = 'http://127.0.0.1:5500/UI/checkIn.html';
      const urlCheckOut = 'http://127.0.0.1:5500/UI/checkOut.html';
      const url = type === 'check-in' ? urlCheckIn : urlCheckOut;
      const qrCode = await QRCode.toDataURL(
        url + '?eventId=' + event['eventId'],
      );
      return new CheckInOutResponse(true, 'QR Code generated', qrCode);
    } catch (err) {
      return new CheckInOutResponse(false, err.message, null);
    }
  }

  async getParticipantsCount(eventId: string): Promise<number> {
    const participants = await this.checkInOutModel.find({ eventId });
    return participants.length;
  }

  async checkIn(
    participantInfo: CheckInOutRequest,
  ): Promise<ICheckInOutResponse> {
    try {
      const checkInOut = new this.checkInOutModel({
        eventId: participantInfo.eventId,
        userId: participantInfo?.userId, // Gọi validateUserInfo(participantInfo) để lấy userId
        isCheckIn: true,
        checkInTime: new Date(),
      });
      await checkInOut.save();
      return new CheckInOutResponse(true, 'Check in successfully', null);
    } catch (err) {
      return new CheckInOutResponse(false, err.message, null);
    }
  }

  async checkOut(
    participantInfo: CheckInOutRequest,
  ): Promise<ICheckInOutResponse> {
    try {
      await this.checkInOutModel.updateOne(
        // { eventId: participantInfo.eventId, userId: participantInfo.userId },
        { eventId: participantInfo.eventId },
        { checkOutTime: new Date() },
      );
      return new CheckInOutResponse(true, 'Check out successfully', null);
    } catch (err) {
      return new CheckInOutResponse(false, err.message, null);
    }
  }

  async validateUserInfo(participantInfo: CheckInOutRequest): Promise<boolean> {
    // Thực hiện call API (registration service) để kiểm tra thông tin người tham gia
    return false;
  }
}
