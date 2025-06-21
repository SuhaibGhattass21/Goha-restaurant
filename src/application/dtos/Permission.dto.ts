import { IsUUID } from 'class-validator';

export class PermissionGrantDto {
    @IsUUID()
    shift_id!: string;

    @IsUUID()
    admin_id!: string;

    @IsUUID()
    permission_id!: string;

    @IsUUID()
    granted_by!: string;
}
