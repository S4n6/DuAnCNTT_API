"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const event_request_1 = require("../../../../event/src/event.request");
let EventController = class EventController {
    constructor(eventServiceClient) {
        this.eventServiceClient = eventServiceClient;
    }
    getAllEvents() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
            return this.eventServiceClient
                .send({ cmd: 'get_all_events' }, { page, limit })
                .toPromise();
        });
    }
    searchEvents(res, name, startDate, endDate, locationId, typeId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('searchEvents::', name, startDate, endDate, locationId, typeId);
            const response = yield this.eventServiceClient
                .send({ cmd: 'search_events' }, { name, startDate, endDate, locationId, typeId })
                .toPromise();
            if (response.data.events === null) {
                return res.status(404).send(response);
            }
            return res.status(200).send(response);
        });
    }
    getOwnEvents(userId_1) {
        return __awaiter(this, arguments, void 0, function* (userId, page = 1, limit = 10) {
            return this.eventServiceClient
                .send({ cmd: 'get_own_events' }, { userId, page, limit })
                .toPromise();
        });
    }
    getEventById(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.eventServiceClient
                .send({ cmd: 'get_event_by_id' }, payload)
                .toPromise();
        });
    }
    getEventsByIds(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('getEventsByIds::', payload.ids);
            return this.eventServiceClient
                .send({ cmd: 'get_events_by_ids' }, payload)
                .toPromise();
        });
    }
    createEvent(createEventDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.eventServiceClient
                .send({ cmd: 'create_event' }, createEventDto)
                .toPromise();
        });
    }
    updateEvent(id, updateEventDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.eventServiceClient
                .send({ cmd: 'update_event' }, { id, updateEventDto })
                .toPromise();
        });
    }
    deleteEvent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.eventServiceClient
                .send({ cmd: 'delete_event' }, { id })
                .toPromise();
        });
    }
};
exports.EventController = EventController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getAllEvents", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Response)()),
    __param(1, (0, common_1.Query)('name')),
    __param(2, (0, common_1.Query)('startDate')),
    __param(3, (0, common_1.Query)('endDate')),
    __param(4, (0, common_1.Query)('locationId')),
    __param(5, (0, common_1.Query)('typeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Date,
        Date, String, String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "searchEvents", null);
__decorate([
    (0, common_1.Get)('own/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getOwnEvents", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getEventById", null);
__decorate([
    (0, common_1.Post)('ids'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "getEventsByIds", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_request_1.RequestCreateEventDto]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "createEvent", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, event_request_1.RequestCreateEventDto]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "updateEvent", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "deleteEvent", null);
exports.EventController = EventController = __decorate([
    (0, common_1.Controller)('/api/events/'),
    __param(0, (0, common_1.Inject)('EVENT_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], EventController);
//# sourceMappingURL=event.controller.js.map