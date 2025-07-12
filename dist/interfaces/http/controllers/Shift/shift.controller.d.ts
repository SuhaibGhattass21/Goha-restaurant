import type { Request, Response } from 'express';
import type { ShiftService } from '../../../../domain/services/Shift/Shift.service';
export declare class ShiftController {
    private readonly shiftService;
    constructor(shiftService: ShiftService);
    openShift(req: Request, res: Response): Promise<void>;
    updateShiftType(req: Request, res: Response): Promise<void>;
    requestClose(req: Request, res: Response): Promise<void>;
    approveClose(req: Request, res: Response): Promise<void>;
    getShiftById(req: Request, res: Response): Promise<void>;
    getShiftsByCashier(req: Request, res: Response): Promise<void>;
    getShiftsByStatus(req: Request, res: Response): Promise<void>;
    getRequestedCloseShifts(req: Request, res: Response): Promise<void>;
    getShiftsByType(req: Request, res: Response): Promise<void>;
    getShiftsByDate(req: Request, res: Response): Promise<void>;
    getShiftSummary(req: Request, res: Response): Promise<void>;
    getAllSummaries(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}
