import type { Request, Response } from 'express';
import type { ShiftService } from '@domain/services/Shift.service';

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
            const shift = await this.shiftService.updateShiftType(dto);

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
            const shift = await this.shiftService.requestCloseShift(dto);

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
            const shift = await this.shiftService.approveCloseShift(dto);

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
            const shift = await this.shiftService.getShiftById(req.params.id);
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
            const shifts = await this.shiftService.getShiftsByCashier(cashierId);

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

    async getShiftSummary(req: Request, res: Response): Promise<void> {
        try {
            const summary = await this.shiftService.getShiftSummary(req.params.id);
            res.status(200).json({
                success: true,
                data: summary,
            });
        } catch (error: any) {
            res.status(404).json({
                success: false,
                message: error.message || 'Summary not found',
            });
        }
    }

    async getAllSummaries(req: Request, res: Response): Promise<void> {
        try {
            const summaries = await this.shiftService.getAllSummaries();
            res.status(200).json({
                success: true,
                data: summaries,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error.message,
            });
        }
    }
}
