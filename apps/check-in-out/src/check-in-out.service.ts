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
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CheckInOutService {
  constructor(
    @InjectModel('CheckInOut')
    private readonly checkInOutModel: Model<CheckInOut>,
    private readonly httpService: HttpService,
  ) {}

  async checkInOutByQrCode(payload: {
    eventId: string;
    userId: string;
    ownerId: string;
  }): Promise<ICheckInOutResponse> {
    try {
      const existingCheckInOut = await this.checkInOutModel.findOne({
        eventId: payload.eventId,
        userId: payload.userId,
        isCheckIn: true,
      });

      if (existingCheckInOut) {
        await this.checkInOutModel.updateOne(
          { eventId: payload.eventId, userId: payload.userId },
          { checkOutTime: new Date(), isCheckIn: false },
        );
        return new CheckInOutResponse(true, 'Checked out successfully', null);
      } else {
        const checkInOut = new this.checkInOutModel({
          eventId: payload.eventId,
          userId: payload.userId,
          isCheckIn: true,
          checkInTime: new Date(),
        });

        await checkInOut.save();
        return new CheckInOutResponse(true, 'Checked in successfully', null);
      }
    } catch (err) {
      return new CheckInOutResponse(false, err.message, null);
    }
  }

  async getParticipantsCount(eventId: string): Promise<object> {
    const participants = await this.checkInOutModel.find({ eventId });
    const numberCheckIn = participants.filter(
      (p) => !p.checkOutTime && p.isCheckIn,
    ).length;
    const numberCheckOut = participants.filter((p) => p.checkOutTime).length;
    return {
      checkIn: numberCheckIn,
      checkOut: numberCheckOut,
    };
  }

  async checkInByQRCode(
    eventId: string,
    userId: string,
  ): Promise<ICheckInOutResponse> {
    try {
      const checkInOut = new this.checkInOutModel({
        eventId,
        userId,
        isCheckIn: true,
        checkInTime: new Date(),
      });
      await checkInOut.save();
      return new CheckInOutResponse(true, 'Check in successfully', null);
    } catch (err) {
      return new CheckInOutResponse(false, err.message, null);
    }
  }

  async checkOutByQRCode(
    eventId: string,
    userId: string,
  ): Promise<ICheckInOutResponse> {
    try {
      await this.checkInOutModel.updateOne(
        { eventId, userId },
        { checkOutTime: new Date() },
      );
      return new CheckInOutResponse(true, 'Check out successfully', null);
    } catch (err) {
      return new CheckInOutResponse(false, err.message, null);
    }
  }

  async checkIn(payload: {
    email: string;
    eventId: string;
  }): Promise<ICheckInOutResponse> {
    try {
      const userInfoResponse = await this.httpService
        .get(`http://localhost:3001/api/users/email/${payload.email}`)
        .toPromise();

      if (!userInfoResponse?.data.success) {
        return new CheckInOutResponse(false, 'User not found', null);
      }
      const userId = userInfoResponse?.data?.data?._id;

      const isCheckIn = await this.checkInOutModel.findOne({
        eventId: payload.eventId,
        userId,
        isCheckIn: true,
      });

      console.log('isCheckIn', isCheckIn);
      if (isCheckIn) {
        return new CheckInOutResponse(false, 'User already checked in', null);
      }
      console.log('userId', userInfoResponse?.data);

      const checkInOut = new this.checkInOutModel({
        eventId: payload.eventId,
        userId: userId,
        isCheckIn: true,
        checkInTime: new Date(),
      });
      await checkInOut.save();
      return new CheckInOutResponse(true, 'Check in successfully', null);
    } catch (err) {
      return new CheckInOutResponse(false, err.message, null);
    }
  }

  async checkOut(payload: {
    email: string;
    eventId: string;
  }): Promise<ICheckInOutResponse> {
    try {
      const userInfoResponse = await this.httpService
        .get(`http://localhost:3001/api/users/email/${payload.email}`)
        .toPromise();
      if (!userInfoResponse?.data.success) {
        return new CheckInOutResponse(false, 'User not found', null);
      }
      const userId = userInfoResponse?.data?.data._id;
      await this.checkInOutModel.updateOne(
        { eventId: payload.eventId, userId },
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
