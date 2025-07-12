import { UserPermission } from './userPermissions.model';
export declare class Permissions {
    id: string;
    name: string;
    description?: string;
    created_at: Date;
    userPermissions?: UserPermission[];
}
