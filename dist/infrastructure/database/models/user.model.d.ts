import { Worker } from './Worker.model';
import { UserPermission } from './userPermissions.model';
export declare class User {
    id: string;
    username: string;
    fullName: string;
    hourRate: number;
    password: string;
    phone?: string;
    createdAt: Date;
    isActive: boolean;
    userPermissions?: UserPermission[];
    workerProfile?: Worker;
}
