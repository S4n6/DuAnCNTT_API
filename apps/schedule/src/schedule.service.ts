import { Injectable } from '@nestjs/common';

@Injectable()
export class ScheduleService {
  async getSchedule(eventId: string) {
    return {
      eventId,
      schedule: [
        {
          time: '09:00',
          title: 'Registration',
        },
        {
          time: '10:00',
          title: 'Opening Keynote',
        },
        {
          time: '11:00',
          title: 'Panel Discussion',
        },
        {
          time: '12:00',
          title: 'Lunch',
        },
        {
          time: '13:00',
          title: 'Breakout Sessions',
        },
        {
          time: '14:00',
          title: 'Closing Keynote',
        },
      ],
    };
  }
}
