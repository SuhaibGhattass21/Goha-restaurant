export declare const swaggerSchemas: {
    CreateCategoryExtraDTO: {
        type: string;
        required: string[];
        properties: {
            name: {
                type: string;
                description: string;
            };
            price: {
                type: string;
                format: string;
                minimum: number;
                description: string;
            };
            category_id: {
                type: string;
                format: string;
                description: string;
            };
        };
    };
    UpdateCategoryExtraDTO: {
        type: string;
        properties: {
            name: {
                type: string;
                description: string;
            };
            price: {
                type: string;
                format: string;
                minimum: number;
                description: string;
            };
            category_id: {
                type: string;
                format: string;
                description: string;
            };
        };
    };
    CreateCategoryDTO: {
        type: string;
        required: string[];
        properties: {
            name: {
                type: string;
                description: string;
            };
            description: {
                type: string;
                description: string;
            };
        };
    };
    UpdateCategoryDTO: {
        type: string;
        properties: {
            name: {
                type: string;
                description: string;
            };
            description: {
                type: string;
                description: string;
            };
        };
    };
    CreateCategorySizeDTO: {
        type: string;
        required: string[];
        properties: {
            size_name: {
                type: string;
                description: string;
            };
            category_id: {
                type: string;
                format: string;
                description: string;
            };
        };
    };
    UpdateCategorySizeDTO: {
        type: string;
        properties: {
            size_name: {
                type: string;
                description: string;
            };
            category_id: {
                type: string;
                format: string;
                description: string;
            };
        };
    };
    CreateProductDTO: {
        type: string;
        required: string[];
        properties: {
            name: {
                type: string;
                description: string;
                example: string;
            };
            description: {
                type: string;
                description: string;
                example: string;
            };
            image_url: {
                type: string;
                description: string;
                example: string;
            };
            is_active: {
                type: string;
                description: string;
                example: boolean;
            };
            category_id: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
        };
    };
    UpdateProductDTO: {
        type: string;
        properties: {
            name: {
                type: string;
                description: string;
                example: string;
            };
            description: {
                type: string;
                description: string;
                example: string;
            };
            image_url: {
                type: string;
                description: string;
                example: string;
            };
            is_active: {
                type: string;
                description: string;
                example: boolean;
            };
            category_id: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
        };
    };
    CreateProductSizePriceDTO: {
        type: string;
        required: string[];
        properties: {
            product_id: {
                type: string;
                format: string;
                description: string;
            };
            size_id: {
                type: string;
                format: string;
                description: string;
            };
            price: {
                type: string;
                format: string;
                minimum: number;
                description: string;
            };
        };
    };
    UpdateProductSizePriceDTO: {
        type: string;
        properties: {
            product_id: {
                type: string;
                format: string;
                description: string;
            };
            size_id: {
                type: string;
                format: string;
                description: string;
            };
            price: {
                type: string;
                format: string;
                minimum: number;
                description: string;
            };
        };
    };
    CreateShiftDTO: {
        type: string;
        required: string[];
        properties: {
            opened_by: {
                type: string;
                format: string;
                description: string;
            };
            shift_type: {
                type: string;
                enum: string[];
                description: string;
            };
            workers: {
                type: string;
                items: {
                    $ref: string;
                };
                description: string;
            };
        };
    };
    UpdateShiftTypeDTO: {
        type: string;
        required: string[];
        properties: {
            shift_id: {
                type: string;
                format: string;
                description: string;
            };
            shift_type: {
                type: string;
                enum: string[];
                description: string;
            };
            admin_id: {
                type: string;
                format: string;
                description: string;
            };
        };
    };
    RequestCloseShiftDTO: {
        type: string;
        required: string[];
        properties: {
            shift_id: {
                type: string;
                format: string;
                description: string;
            };
            closed_by: {
                type: string;
                format: string;
                description: string;
            };
        };
    };
    ApproveCloseShiftDTO: {
        type: string;
        required: string[];
        properties: {
            shift_id: {
                type: string;
                format: string;
                description: string;
            };
            approved_by_admin_id: {
                type: string;
                format: string;
                description: string;
            };
        };
    };
    CreateUserDTO: {
        type: string;
        required: string[];
        properties: {
            username: {
                type: string;
                description: string;
                example: string;
            };
            fullName: {
                type: string;
                description: string;
                example: string;
            };
            hourRate: {
                type: string;
                description: string;
                example: number;
            };
            password: {
                type: string;
                description: string;
                example: string;
            };
            phone: {
                type: string;
                description: string;
                example: string;
            };
            userPermissions: {
                type: string;
                description: string;
                items: {
                    type: string;
                    format: string;
                };
                example: string[];
            };
        };
    };
    UpdateUserDTO: {
        type: string;
        properties: {
            fullName: {
                type: string;
                description: string;
                example: string;
            };
            hourRate: {
                type: string;
                description: string;
                example: number;
            };
            password: {
                type: string;
                description: string;
                example: string;
            };
            phone: {
                type: string;
                description: string;
                example: string;
            };
            isActive: {
                type: string;
                description: string;
                example: boolean;
            };
            userPermissions: {
                type: string;
                description: string;
                items: {
                    type: string;
                    format: string;
                };
                example: string[];
            };
        };
    };
    UserResponseDTO: {
        type: string;
        properties: {
            id: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
            username: {
                type: string;
                description: string;
                example: string;
            };
            fullName: {
                type: string;
                description: string;
                example: string;
            };
            hourRate: {
                type: string;
                description: string;
                example: number;
            };
            phone: {
                type: string;
                description: string;
                example: string;
            };
            createdAt: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
            isActive: {
                type: string;
                description: string;
                example: boolean;
            };
            userPermissions: {
                type: string;
                description: string;
                items: {
                    type: string;
                    format: string;
                };
                example: string[];
            };
            worker_id: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
        };
    };
    CreatePermissionDto: {
        type: string;
        required: string[];
        properties: {
            name: {
                type: string;
                description: string;
                example: string;
            };
            description: {
                type: string;
                description: string;
                example: string;
            };
        };
    };
    UpdatePermissionDto: {
        type: string;
        properties: {
            name: {
                type: string;
                description: string;
                example: string;
            };
            description: {
                type: string;
                description: string;
                example: string;
            };
        };
    };
    PermissionResponseDto: {
        type: string;
        properties: {
            id: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
            name: {
                type: string;
                description: string;
                example: string;
            };
            description: {
                type: string;
                description: string;
                example: string;
            };
            created_at: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
        };
    };
    AssignPermissionsDto: {
        type: string;
        required: string[];
        properties: {
            userId: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
            permissionIds: {
                type: string;
                description: string;
                items: {
                    type: string;
                    format: string;
                };
                example: string[];
            };
            granted_by: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
        };
    };
    BatchAssignPermissionDto: {
        type: string;
        required: string[];
        properties: {
            permissionId: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
            userIds: {
                type: string;
                description: string;
                items: {
                    type: string;
                    format: string;
                };
                example: string[];
            };
            granted_by: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
        };
    };
    RevokePermissionsDto: {
        type: string;
        required: string[];
        properties: {
            userId: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
            permissionIds: {
                type: string;
                description: string;
                items: {
                    type: string;
                    format: string;
                };
                example: string[];
            };
        };
    };
    CheckMultiplePermissionsDto: {
        type: string;
        required: string[];
        properties: {
            permissionNames: {
                type: string;
                description: string;
                items: {
                    type: string;
                };
                example: string[];
            };
        };
    };
    PermissionCheckResultDto: {
        type: string;
        properties: {
            hasAll: {
                type: string;
                description: string;
                example: boolean;
            };
            missing: {
                type: string;
                description: string;
                items: {
                    type: string;
                };
                example: string[];
            };
        };
    };
    UserPermissionDetailDto: {
        type: string;
        properties: {
            id: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
            name: {
                type: string;
                description: string;
                example: string;
            };
            description: {
                type: string;
                description: string;
                example: string;
            };
            granted_at: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
            granted_by_name: {
                type: string;
                description: string;
                example: string;
            };
            is_revoked: {
                type: string;
                description: string;
                example: boolean;
            };
        };
    };
    UserWithPermissionDto: {
        type: string;
        properties: {
            id: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
            username: {
                type: string;
                description: string;
                example: string;
            };
            email: {
                type: string;
                description: string;
                example: string;
            };
            fullName: {
                type: string;
                description: string;
                example: string;
            };
            granted_at: {
                type: string;
                format: string;
                description: string;
                example: string;
            };
            granted_by_name: {
                type: string;
                description: string;
                example: string;
            };
        };
    };
    SinglePermissionCheckDto: {
        type: string;
        properties: {
            hasPermission: {
                type: string;
                description: string;
                example: boolean;
            };
        };
    };
    PermissionAssignmentSuccessDto: {
        type: string;
        properties: {
            message: {
                type: string;
                description: string;
                example: string;
            };
            assignedCount: {
                type: string;
                description: string;
                example: number;
            };
        };
    };
    PermissionRevocationSuccessDto: {
        type: string;
        properties: {
            message: {
                type: string;
                description: string;
                example: string;
            };
            revokedCount: {
                type: string;
                description: string;
                example: number;
            };
        };
    };
    BatchPermissionAssignmentSuccessDto: {
        type: string;
        properties: {
            message: {
                type: string;
                description: string;
                example: string;
            };
            affectedUsers: {
                type: string;
                description: string;
                example: number;
            };
            permissionName: {
                type: string;
                description: string;
                example: string;
            };
        };
    };
    UserPermissionsResponseDto: {
        type: string;
        properties: {
            permissions: {
                type: string;
                description: string;
                items: {
                    type: string;
                };
                example: string[];
            };
        };
    };
    PermissionCheckResponseDto: {
        type: string;
        properties: {
            hasPermission: {
                type: string;
                description: string;
                example: boolean;
            };
        };
    };
    MultiplePermissionCheckResponseDto: {
        type: string;
        properties: {
            permissions: {
                type: string;
                description: string;
                additionalProperties: {
                    type: string;
                };
                example: {
                    "create:user": boolean;
                    "delete:user": boolean;
                    "update:user": boolean;
                };
            };
        };
    };
    OpenShiftDTO: {
        type: string;
        required: string[];
        properties: {
            opened_by: {
                type: string;
                format: string;
                description: string;
            };
            shift_type: {
                type: string;
                enum: string[];
                description: string;
            };
            workers: {
                type: string;
                items: {
                    $ref: string;
                };
                description: string;
            };
        };
    };
    CreateWorkerDto: {
        type: string;
        required: string[];
        properties: {
            full_name: {
                type: string;
                description: string;
            };
            status: {
                type: string;
                enum: string[];
                description: string;
            };
            base_hourly_rate: {
                type: string;
                format: string;
                minimum: number;
                description: string;
            };
            phone: {
                type: string;
                description: string;
            };
            user_id: {
                type: string;
                format: string;
                description: string;
            };
        };
    };
    UpdateWorkerDto: {
        type: string;
        properties: {
            full_name: {
                type: string;
                description: string;
            };
            status: {
                type: string;
                enum: string[];
                description: string;
            };
            base_hourly_rate: {
                type: string;
                format: string;
                minimum: number;
                description: string;
            };
            phone: {
                type: string;
                description: string;
            };
            is_active: {
                type: string;
                description: string;
            };
            user_id: {
                type: string;
                format: string;
                description: string;
            };
        };
    };
    WorkerResponseDto: {
        type: string;
        properties: {
            worker_id: {
                type: string;
                format: string;
                description: string;
            };
            full_name: {
                type: string;
                description: string;
            };
            status: {
                type: string;
                enum: string[];
                description: string;
            };
            base_hourly_rate: {
                type: string;
                format: string;
                description: string;
            };
            phone: {
                type: string;
                description: string;
            };
            is_active: {
                type: string;
                description: string;
            };
            joined_at: {
                type: string;
                format: string;
                description: string;
            };
            user_id: {
                type: string;
                format: string;
                description: string;
            };
        };
    };
    AddShiftWorkerDto: {
        type: string;
        required: string[];
        properties: {
            shift_id: {
                type: string;
                format: string;
                description: string;
            };
            worker_id: {
                type: string;
                format: string;
                description: string;
            };
            hourly_rate: {
                type: string;
                format: string;
                minimum: number;
                description: string;
            };
            start_time: {
                type: string;
                format: string;
                description: string;
            };
            end_time: {
                type: string;
                format: string;
                description: string;
            };
        };
    };
    UpdateShiftWorkerDto: {
        type: string;
        properties: {
            shift_id: {
                type: string;
                format: string;
                description: string;
            };
            worker_id: {
                type: string;
                format: string;
                description: string;
            };
            hourly_rate: {
                type: string;
                format: string;
                minimum: number;
                description: string;
            };
            start_time: {
                type: string;
                format: string;
                description: string;
            };
            end_time: {
                type: string;
                format: string;
                description: string;
            };
            calculated_salary: {
                type: string;
                format: string;
                minimum: number;
                description: string;
            };
        };
    };
    ShiftWorkerResponseDto: {
        type: string;
        properties: {
            shift_worker_id: {
                type: string;
                format: string;
                description: string;
            };
            shift_id: {
                type: string;
                format: string;
                description: string;
            };
            worker_id: {
                type: string;
                format: string;
                description: string;
            };
            hourly_rate: {
                type: string;
                format: string;
                description: string;
            };
            start_time: {
                type: string;
                format: string;
                description: string;
            };
            end_time: {
                type: string;
                format: string;
                description: string;
            };
            calculated_salary: {
                type: string;
                format: string;
                description: string;
            };
        };
    };
    CreateStockItemDto: {
        type: string;
        required: string[];
        properties: {
            name: {
                type: string;
            };
            type: {
                type: string;
                enum: string[];
            };
            unit: {
                type: string;
            };
            current_quantity: {
                type: string;
                format: string;
                minimum: number;
            };
            minimum_value: {
                type: string;
                format: string;
                minimum: number;
            };
            status: {
                type: string;
                enum: string[];
            };
        };
    };
    UpdateStockItemDto: {
        type: string;
        properties: {
            name: {
                type: string;
            };
            type: {
                type: string;
                enum: string[];
            };
            unit: {
                type: string;
            };
            current_quantity: {
                type: string;
                format: string;
                minimum: number;
            };
            minimum_value: {
                type: string;
                format: string;
                minimum: number;
            };
            status: {
                type: string;
                enum: string[];
            };
        };
    };
    StockItemResponseDto: {
        type: string;
        properties: {
            stock_item_id: {
                type: string;
                format: string;
            };
            name: {
                type: string;
            };
            type: {
                type: string;
                enum: string[];
            };
            unit: {
                type: string;
            };
            current_quantity: {
                type: string;
                format: string;
            };
            minimum_value: {
                type: string;
                format: string;
            };
            status: {
                type: string;
                enum: string[];
            };
            last_updated_at: {
                type: string;
                format: string;
            };
            transactions: {
                type: string;
                items: {
                    $ref: string;
                };
            };
        };
    };
    StockItemListResponseDto: {
        type: string;
        properties: {
            stockItems: {
                type: string;
                items: {
                    $ref: string;
                };
            };
            total: {
                type: string;
                minimum: number;
            };
            page: {
                type: string;
                minimum: number;
            };
            limit: {
                type: string;
                minimum: number;
            };
        };
    };
    LowStockItemDto: {
        type: string;
        properties: {
            stock_item_id: {
                type: string;
                format: string;
            };
            name: {
                type: string;
            };
            current_quantity: {
                type: string;
                format: string;
            };
            minimum_value: {
                type: string;
                format: string;
            };
            unit: {
                type: string;
            };
        };
    };
    StockTransactionDto: {
        type: string;
        properties: {
            transaction_id: {
                type: string;
                format: string;
            };
            type: {
                type: string;
                enum: string[];
            };
            quantity: {
                type: string;
                format: string;
            };
            timestamp: {
                type: string;
                format: string;
            };
        };
    };
    CreateStockTransactionDto: {
        type: string;
        required: string[];
        properties: {
            stock_item_id: {
                type: string;
                format: string;
            };
            type: {
                type: string;
                enum: string[];
            };
            quantity: {
                type: string;
                format: string;
                minimum: number;
            };
            user_id: {
                type: string;
                format: string;
            };
            shift_id: {
                type: string;
                format: string;
            };
        };
    };
    UpdateStockTransactionDto: {
        type: string;
        properties: {
            stock_item_id: {
                type: string;
                format: string;
            };
            type: {
                type: string;
                enum: string[];
            };
            quantity: {
                type: string;
                format: string;
                minimum: number;
            };
            user_id: {
                type: string;
                format: string;
            };
            shift_id: {
                type: string;
                format: string;
            };
        };
    };
    StockTransactionResponseDto: {
        type: string;
        properties: {
            transaction_id: {
                type: string;
                format: string;
            };
            stock_item_id: {
                type: string;
                format: string;
            };
            stock_item_name: {
                type: string;
            };
            type: {
                type: string;
                enum: string[];
            };
            quantity: {
                type: string;
                format: string;
            };
            user_id: {
                type: string;
                format: string;
            };
            user_name: {
                type: string;
            };
            shift_id: {
                type: string;
                format: string;
            };
            timestamp: {
                type: string;
                format: string;
            };
        };
    };
    StockTransactionListResponseDto: {
        type: string;
        properties: {
            transactions: {
                type: string;
                items: {
                    $ref: string;
                };
            };
            total: {
                type: string;
                minimum: number;
            };
            page: {
                type: string;
                minimum: number;
            };
            limit: {
                type: string;
                minimum: number;
            };
        };
    };
    StockTransactionStatsDto: {
        type: string;
        properties: {
            stock_item_id: {
                type: string;
                format: string;
            };
            stock_item_name: {
                type: string;
            };
            total_in: {
                type: string;
                format: string;
            };
            total_out: {
                type: string;
                format: string;
            };
            net_change: {
                type: string;
                format: string;
            };
            transaction_count: {
                type: string;
            };
        };
    };
    ShiftTransactionSummaryDto: {
        type: string;
        properties: {
            shift_id: {
                type: string;
                format: string;
            };
            total_transactions: {
                type: string;
            };
            total_in_quantity: {
                type: string;
                format: string;
            };
            total_out_quantity: {
                type: string;
                format: string;
            };
            transactions: {
                type: string;
                items: {
                    $ref: string;
                };
            };
        };
    };
    CreateOrderDto: {
        type: string;
        required: string[];
        properties: {
            cashier_id: {
                type: string;
                format: string;
            };
            shift_id: {
                type: string;
                format: string;
            };
            table_number: {
                type: string;
            };
            order_type: {
                type: string;
                enum: string[];
            };
            customer_name: {
                type: string;
            };
            customer_phone: {
                type: string;
            };
            items: {
                type: string;
                items: {
                    $ref: string;
                };
            };
        };
    };
    UpdateOrderDto: {
        type: string;
        properties: {
            table_number: {
                type: string;
            };
            order_type: {
                type: string;
                enum: string[];
            };
            status: {
                type: string;
                enum: string[];
            };
            customer_name: {
                type: string;
            };
            customer_phone: {
                type: string;
            };
        };
    };
    OrderResponseDto: {
        type: string;
        properties: {
            order_id: {
                type: string;
                format: string;
            };
            cashier: {
                $ref: string;
            };
            shift: {
                $ref: string;
            };
            table_number: {
                type: string;
            };
            order_type: {
                type: string;
                enum: string[];
            };
            status: {
                type: string;
                enum: string[];
            };
            total_price: {
                type: string;
                format: string;
            };
            customer_name: {
                type: string;
            };
            customer_phone: {
                type: string;
            };
            created_at: {
                type: string;
                format: string;
            };
            items: {
                type: string;
                items: {
                    $ref: string;
                };
            };
            items_count: {
                type: string;
                minimum: number;
            };
        };
    };
    CashierInfoDto: {
        type: string;
        properties: {
            id: {
                type: string;
                format: string;
            };
            username: {
                type: string;
            };
            fullName: {
                type: string;
            };
        };
    };
    ShiftInfoDto: {
        type: string;
        properties: {
            shift_id: {
                type: string;
                format: string;
            };
            shift_type: {
                type: string;
            };
            start_time: {
                type: string;
                format: string;
            };
            status: {
                type: string;
            };
        };
    };
    OrderSummaryDto: {
        type: string;
        properties: {
            order_id: {
                type: string;
                format: string;
            };
            table_number: {
                type: string;
            };
            order_type: {
                type: string;
            };
            status: {
                type: string;
            };
            total_price: {
                type: string;
                format: string;
            };
            customer_name: {
                type: string;
            };
            created_at: {
                type: string;
                format: string;
            };
            items_count: {
                type: string;
            };
        };
    };
    OrderStatsDto: {
        type: string;
        properties: {
            total_orders: {
                type: string;
                minimum: number;
            };
            active_orders: {
                type: string;
                minimum: number;
            };
            completed_orders: {
                type: string;
                minimum: number;
            };
            cancelled_orders: {
                type: string;
                minimum: number;
            };
            total_revenue: {
                type: string;
                format: string;
            };
            average_order_value: {
                type: string;
                format: string;
            };
        };
    };
    CreateOrderItemDto: {
        type: string;
        required: string[];
        properties: {
            order_id: {
                type: string;
                format: string;
            };
            product_size_id: {
                type: string;
                format: string;
            };
            quantity: {
                type: string;
                minimum: number;
            };
            unit_price: {
                type: string;
                format: string;
                minimum: number;
            };
            special_instructions: {
                type: string;
            };
            extras: {
                type: string;
                items: {
                    $ref: string;
                };
            };
        };
    };
    OrderItemResponseDto: {
        type: string;
        properties: {
            order_item_id: {
                type: string;
                format: string;
            };
            order_id: {
                type: string;
                format: string;
            };
            product_size: {
                $ref: string;
            };
            quantity: {
                type: string;
                minimum: number;
            };
            category_id: {
                type: string;
                format: string;
            };
            category_name: {
                type: string;
            };
            unit_price: {
                type: string;
                format: string;
            };
            special_instructions: {
                type: string;
            };
            extras: {
                type: string;
                items: {
                    $ref: string;
                };
            };
            total_price: {
                type: string;
                format: string;
            };
        };
    };
    ProductSizeInfoDto: {
        type: string;
        properties: {
            product_size_id: {
                type: string;
                format: string;
            };
            product_name: {
                type: string;
            };
            size_name: {
                type: string;
            };
            price: {
                type: string;
                format: string;
            };
            category_name: {
                type: string;
            };
            product_description: {
                type: string;
            };
            category_description: {
                type: string;
            };
        };
    };
    CreateOrderItemExtraDto: {
        type: string;
        required: string[];
        properties: {
            extra_id: {
                type: string;
                format: string;
            };
            price: {
                type: string;
                format: string;
            };
        };
    };
    OrderItemExtraResponseDto: {
        type: string;
        properties: {
            order_item_extra_id: {
                type: string;
                format: string;
            };
            order_item_id: {
                type: string;
                format: string;
            };
            extra: {
                $ref: string;
            };
            price: {
                type: string;
                format: string;
            };
        };
    };
    CategoryExtraInfoDto: {
        type: string;
        properties: {
            extra_id: {
                type: string;
                format: string;
            };
            name: {
                type: string;
            };
            price: {
                type: string;
                format: string;
            };
            category_name: {
                type: string;
            };
        };
    };
    CreateCancelledOrderDto: {
        type: string;
        required: string[];
        properties: {
            order_id: {
                type: string;
                format: string;
            };
            cancelled_by: {
                type: string;
                format: string;
            };
            shift_id: {
                type: string;
                format: string;
            };
            reason: {
                type: string;
            };
        };
    };
    CancelledOrderResponseDto: {
        type: string;
        properties: {
            cancelled_order_id: {
                type: string;
                format: string;
            };
            order: {
                $ref: string;
            };
            cancelled_by: {
                $ref: string;
            };
            shift: {
                $ref: string;
            };
            reason: {
                type: string;
            };
            cancelled_at: {
                type: string;
                format: string;
            };
        };
    };
    CancelledOrderListResponseDto: {
        type: string;
        properties: {
            cancelled_orders: {
                type: string;
                items: {
                    $ref: string;
                };
            };
            total: {
                type: string;
                minimum: number;
            };
            page: {
                type: string;
                minimum: number;
            };
            limit: {
                type: string;
                minimum: number;
            };
        };
    };
    ExternalReceiptDto: {
        type: string;
        properties: {
            receipt_id: {
                type: string;
                format: string;
            };
            order_id: {
                type: string;
                format: string;
            };
            shift_id: {
                type: string;
                format: string;
            };
            cashier_id: {
                type: string;
                format: string;
            };
            total_amount: {
                type: string;
                format: string;
            };
            payment_method: {
                type: string;
                enum: string[];
            };
            image_url: {
                type: string;
            };
            is_printed: {
                type: string;
            };
            notes: {
                type: string;
            };
            created_at: {
                type: string;
                format: string;
            };
        };
    };
    CreateExternalReceiptDto: {
        type: string;
        required: string[];
        properties: {
            order_id: {
                type: string;
                format: string;
            };
            shift_id: {
                type: string;
                format: string;
            };
            cashier_id: {
                type: string;
                format: string;
            };
            total_amount: {
                type: string;
                format: string;
            };
            payment_method: {
                type: string;
                enum: string[];
            };
            image_url: {
                type: string;
            };
            is_printed: {
                type: string;
            };
            notes: {
                type: string;
            };
        };
    };
    CreateExpenseDTO: {
        type: string;
        required: string[];
        properties: {
            title: {
                type: string;
                description: string;
            };
            amount: {
                type: string;
                format: string;
                description: string;
            };
            created_by: {
                type: string;
                format: string;
                description: string;
            };
            shift_id: {
                type: string;
                format: string;
                description: string;
            };
        };
    };
    UpdateExpenseDTO: {
        type: string;
        properties: {
            title: {
                type: string;
                description: string;
            };
            amount: {
                type: string;
                format: string;
                description: string;
            };
        };
    };
    ExpenseResponseDTO: {
        type: string;
        properties: {
            expense_id: {
                type: string;
                format: string;
            };
            title: {
                type: string;
            };
            amount: {
                type: string;
                format: string;
            };
            created_by: {
                type: string;
                format: string;
            };
            shift_id: {
                type: string;
                format: string;
            };
            created_at: {
                type: string;
                format: string;
            };
        };
    };
};
