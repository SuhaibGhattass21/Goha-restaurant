import { User } from './user.model';
import { Permissions } from './permissions.model';
export declare class UserPermission {
    id: string;
    user: User;
    permission: Permissions;
    granted_by: User;
    granted_at: Date;
    is_revoked: boolean;
}
