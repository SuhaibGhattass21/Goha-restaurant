import type { Request, Response } from 'express';
import { plainToInstance } from "class-transformer";
import type { ShiftService } from '../../../../domain/services/Shift/Shift.service';
import { FilterShiftByStatusDto } from '../../../../application/dtos/Shift/Shift.dto';
import { ShiftType } from '../../../../domain/enums/Shift.enums';

export class ShiftController {
    constructor(private readonly shiftService: ShiftService) { }

    async openShift(req: Request, res: Response): Promise<void> {

        try {
            const shift = await this.shiftService.openShift(req.body);
            res.status(201).json({
                success: true,
                message: 'Shift opened successfully',
                data: shift,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message,
            });
        }
    }

    async updateShiftType(req: Request, res: Response): Promise<void> {

        try {
            const dto = { ...req.body, shift_id: req.params.id };
            const shift = await this.shiftService.updateType(dto);

            if (!shift) {
                res.status(404).json({
                    success: false,
                    message: 'Shift not found',
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Shift type updated',
                data: shift,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message,
            });
        }
    }

    async requestClose(req: Request, res: Response): Promise<void> {

        try {
            const dto = { ...req.body, shift_id: req.params.id };
            const shift = await this.shiftService.requestClose(dto);

            if (!shift) {
                res.status(404).json({
                    success: false,
                    message: 'Shift not found',
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Shift close requested',
                data: shift,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message,
            });
        }
    }

    async approveClose(req: Request, res: Response): Promise<void> {

        try {
            const dto = { ...req.body, shift_id: req.params.id };
            const shift = await this.shiftService.approveClose(dto);

            if (!shift) {
                res.status(404).json({
                    success: false,
                    message: 'Shift not found or not eligible for closing',
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Shift closed successfully',
                data: shift,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message,
            });
        }
    }

    async getShiftById(req: Request, res: Response): Promise<void> {
        try {
            const shift = await this.shiftService.getById(req.params.id);
            if (!shift) {
                res.status(404).json({
                    success: false,
                    message: 'Shift not found',
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: shift,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message,
            });
        }
    }

    async getShiftsByCashier(req: Request, res: Response): Promise<void> {
        try {
            const cashierId = req.params.cashierId;
            const shifts = await this.shiftService.getByCashierId(cashierId);

            res.status(200).json({
                success: true,
                data: shifts,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message,
            });
        }
    }

    async getShiftsByStatus(req: Request, res: Response): Promise<void> {
        try {
            const dto = plainToInstance(FilterShiftByStatusDto, { status: req.params.status });

            const shifts = await this.shiftService.getShiftsByStatus(dto);
            res.status(200).json(shifts);
        } catch (error) {
            console.error("Error fetching shifts by status:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getRequestedCloseShifts(req: Request, res: Response): Promise<void> {
        try {
            const shifts = await this.shiftService.getRequestedCloseShifts();
            res.status(200).json(shifts);
        } catch (error) {
            console.error("Error getting requested-close shifts:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getShiftsByType(req: Request, res: Response): Promise<void> {
        try {
            const type = req.params.type as ShiftType;
            const shifts = await this.shiftService.getShiftsByType(type);
            res.status(200).json(shifts);
        } catch (error) {
            console.error("Error fetching shifts by type:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getShiftsByDate(req: Request, res: Response): Promise<void> {
        try {
            const date = new Date(req.query.date as string);
            const shifts = await this.shiftService.getShiftsByDate(date);
            res.status(200).json(shifts);
        } catch (error) {
            console.error("Error fetching shifts by date:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }


    async getSummaryByShiftId(req: Request, res: Response): Promise<void> {
        try {
            const shiftId = req.params.shiftId;
            const summary = await this.shiftService.getSummaryByShiftId(shiftId);
            res.json(summary);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to fetch shift summary.' });
        }
    }

    async getSummaryByShiftTypeAndDate(req: Request, res: Response): Promise<void> {
        try {
            const { date, shift_type } = req.query;
            const summary = await this.shiftService.getSummaryByShiftTypeAndDate({
                date: new Date(date as string),
                shift_type: shift_type as any,
            });
            res.json(summary);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to fetch summary by type and date.' });
        }
    }

    // async getAllSummaries(req: Request, res: Response): Promise<void> {
    //     try {
    //         const summaries = await this.shiftService.getAllSummaries();
    //         res.status(200).json({
    //             success: true,
    //             data: summaries,
    //         });
    //     } catch (error: any) {
    //         res.status(500).json({
    //             success: false,
    //             message: 'Internal server error',
    //             error: error.message,
    //         });
    //     }
    // }
    async delete(req: Request, res: Response) {
        const success = await this.shiftService.delete(req.params.id);
        res.json({ success });
    }
}
