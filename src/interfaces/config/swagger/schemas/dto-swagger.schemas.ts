export const swaggerSchemas = {
    CreateCategoryExtraDTO: {
        type: "object",
        required: ["name", "price", "category_id"],
        properties: {
            name: {
                type: "string",
                description: "Name of the category extra",
            },
            price: {
                type: "number",
                format: "decimal",
                minimum: 0,
                description: "Price of the category extra",
            },
            category_id: {
                type: "string",
                format: "uuid",
                description: "ID of the category to which the extra belongs",
            },
        },
    },
    UpdateCategoryExtraDTO: {
        type: "object",
        properties: {
            name: {
                type: "string",
                description: "Updated name of the category extra",
            },
            price: {
                type: "number",
                format: "decimal",
                minimum: 0,
                description: "Updated price of the category extra",
            },
            category_id: {
                type: "string",
                format: "uuid",
                description: "Updated ID of the category to which the extra belongs",
            },
        },
    },
    CreateCategoryDTO: {
        type: "object",
        required: ["name", "description"],
        properties: {
            name: {
                type: "string",
                description: "Name of the category",
            },
            description: {
                type: "string",
                description: "Description of the category",
            },
        },
    },
    UpdateCategoryDTO: {
        type: "object",
        properties: {
            name: {
                type: "string",
                description: "Updated name of the category",
            },
            description: {
                type: "string",
                description: "Updated description of the category",
            },
        },
    },
    CreateCategorySizeDTO: {
        type: "object",
        required: ["name", "category_id"],
        properties: {
            name: {
                type: "string",
                description: "Name of the category size",
            },
            category_id: {
                type: "string",
                format: "uuid",
                description: "ID of the category to which the size belongs",
            },
        },
    },
    UpdateCategorySizeDTO: {
        type: "object",
        properties: {
            name: {
                type: "string",
                description: "Updated name of the category size",
            },
            category_id: {
                type: "string",
                format: "uuid",
                description: "Updated ID of the category to which the size belongs",
            },
        },
    },
    CreateProductDTO: {
        type: "object",
        required: ["name", "category_id"],
        properties: {
            name: {
                type: "string",
                description: "Name of the product",
                example: "Nike Running Shoes"
            },
            description: {
                type: "string",
                description: "Detailed description of the product",
                example: "Lightweight and breathable running shoes"
            },
            image_url: {
                type: "string",
                description: "URL of the product image",
                example: "https://example.com/images/product1.jpg"
            },
            is_active: {
                type: "boolean",
                description: "Whether the product is active or visible",
                example: true
            },
            category_id: {
                type: "string",
                format: "uuid",
                description: "UUID of the product category",
                example: "9f1b4d8b-8b3a-4a38-bb3c-5e1e0eabb36f"
            }
        }
    },
    UpdateProductDTO: {
        type: "object",
        properties: {
            name: {
                type: "string",
                description: "Updated name of the product",
                example: "Adidas Sports Shoes"
            },
            description: {
                type: "string",
                description: "Updated description of the product",
                example: "New collection with enhanced sole grip"
            },
            image_url: {
                type: "string",
                description: "Updated image URL",
                example: "https://example.com/images/product2.jpg"
            },
            is_active: {
                type: "boolean",
                description: "Updated active status of the product",
                example: false
            },
            category_id: {
                type: "string",
                format: "uuid",
                description: "Updated category UUID",
                example: "a5d2c1d3-f781-4b3a-9eaa-6bcfbb33df60"
            }
        }
    },

    CreateProductSizePriceDTO: {
        type: "object",
        required: ["product_id", "size_id", "price"],
        properties: {
            product_id: {
                type: "string",
                format: "uuid",
                description: "ID of the product",
            },
            size_id: {
                type: "string",
                format: "uuid",
                description: "ID of the size",
            },
            price: {
                type: "number",
                format: "decimal",
                minimum: 0,
                description: "Price for the product size",
            },
        },
    },
    UpdateProductSizePriceDTO: {
        type: "object",
        properties: {
            product_id: {
                type: "string",
                format: "uuid",
                description: "Updated ID of the product",
            },
            size_id: {
                type: "string",
                format: "uuid",
                description: "Updated ID of the size",
            },
            price: {
                type: "number",
                format: "decimal",
                minimum: 0,
                description: "Updated price for the product size",
            },
        },
    },
    CreateShiftDTO: {
        type: "object",
        required: ["opened_by", "shift_type"],
        properties: {
            opened_by: {
                type: "string",
                format: "uuid",
                description: "User ID of the cashier opening the shift",
            },
            shift_type: {
                type: "string",
                enum: ["morning", "night"],
                description: "Type of shift",
            },
            workers: {
                type: "array",
                items: {
                    $ref: "#/components/schemas/AddShiftWorkerDTO",
                },
                description: "List of workers assigned to the shift",
            },
        },
    },
    UpdateShiftTypeDTO: {
        type: "object",
        required: ["shift_id", "shift_type", "admin_id"],
        properties: {
            shift_id: {
                type: "string",
                format: "uuid",
                description: "ID of the shift",
            },
            shift_type: {
                type: "string",
                enum: ["morning", "night"],
                description: "Updated type of shift",
            },
            admin_id: {
                type: "string",
                format: "uuid",
                description: "ID of the admin approving the update",
            },
        },
    },
    RequestCloseShiftDTO: {
        type: "object",
        required: ["shift_id", "closed_by"],
        properties: {
            shift_id: {
                type: "string",
                format: "uuid",
                description: "ID of the shift",
            },
            closed_by: {
                type: "string",
                format: "uuid",
                description: "ID of the user requesting the close",
            },
        },
    },
    ApproveCloseShiftDTO: {
        type: "object",
        required: ["shift_id", "approved_by_admin_id"],
        properties: {
            shift_id: {
                type: "string",
                format: "uuid",
                description: "ID of the shift",
            },
            approved_by_admin_id: {
                type: "string",
                format: "uuid",
                description: "ID of the admin approving the close",
            },
        },
    },
    CreateUserDTO: {
        type: "object",
        required: ["username", "fullName", "password"],
        properties: {
            username: {
                type: "string",
                description: "Username of the user",
                example: "suhaib"
            },
            fullName: {
                type: "string",
                description: "Full name of the user",
                example: "Suhaib Tharwat"
            },
            hourRate: {
                type: "number",
                description: "Hourly rate for the user",
                example: 50
            },
            password: {
                type: "string",
                description: "Password of the user",
                example: "P@ssw0rd123"
            },
            phone: {
                type: "string",
                description: "Phone number of the user in international format",
                example: "+201234567890"
            },
            userPermissions: {
                type: "array",
                description: "List of user permission UUIDs",
                items: {
                    type: "string",
                    format: "uuid"
                },
                example: [
                    "550e8400-e29b-41d4-a716-446655440000",
                    "123e4567-e89b-12d3-a456-426614174000"
                ]
            }
        }
    },

    UpdateUserDTO: {
        type: "object",
        properties: {
            fullName: {
                type: "string",
                description: "Updated full name of the user",
                example: "Anas Tharwat"
            },
            hourRate: {
                type: "number",
                description: "Updated hourly rate",
                example: 60
            },
            password: {
                type: "string",
                description: "Updated password",
                example: "NewP@ss123"
            },
            phone: {
                type: "string",
                description: "Updated phone number in international format",
                example: "+201234567891"
            },
            isActive: {
                type: "boolean",
                description: "Whether the user is active",
                example: true
            },
            userPermissions: {
                type: "array",
                description: "Updated list of user permission UUIDs",
                items: {
                    type: "string",
                    format: "uuid"
                },
                example: [
                    "550e8400-e29b-41d4-a716-446655440000"
                ]
            }
        }
    },

    UserResponseDTO: {
        type: "object",
        properties: {
            id: {
                type: "string",
                format: "uuid",
                description: "Unique identifier of the user",
                example: "bcb59477-5f41-43e2-810f-8b80b5b7cf43"
            },
            username: {
                type: "string",
                description: "Username of the user",
                example: "suhaib"
            },
            fullName: {
                type: "string",
                description: "Full name of the user",
                example: "Suhaib Tharwat"
            },
            hourRate: {
                type: "number",
                description: "Hourly rate of the user",
                example: 50
            },
            phone: {
                type: "string",
                description: "Phone number of the user",
                example: "+201234567890"
            },
            createdAt: {
                type: "string",
                format: "date-time",
                description: "User creation timestamp",
                example: "2025-06-30T10:30:00.000Z"
            },
            isActive: {
                type: "boolean",
                description: "Whether the user is active",
                example: true
            },
            userPermissions: {
                type: "array",
                description: "List of user permission UUIDs",
                items: {
                    type: "string",
                    format: "uuid"
                },
                example: [
                    "550e8400-e29b-41d4-a716-446655440000",
                    "123e4567-e89b-12d3-a456-426614174000"
                ]
            },
            worker_id: {
                type: "string",
                format: "uuid",
                description: "Associated worker ID (optional)",
                example: "c8c19f57-e99a-4f62-a0fd-d93f2b2036de"
            }
        }
    },
    CreatePermissionDto: {
        type: "object",
        required: ["name"],
        properties: {
            name: {
                type: "string",
                description: "Name of the permission",
                example: "create:user"
            },
            description: {
                type: "string",
                description: "Description of the permission",
                example: "Allows user to create new users in the system"
            }
        }
    },

    UpdatePermissionDto: {
        type: "object",
        properties: {
            name: {
                type: "string",
                description: "Updated name of the permission",
                example: "update:user"
            },
            description: {
                type: "string",
                description: "Updated description of the permission",
                example: "Allows user to update existing users in the system"
            }
        }
    },

    PermissionResponseDto: {
        type: "object",
        properties: {
            id: {
                type: "string",
                format: "uuid",
                description: "Unique identifier of the permission",
                example: "bcb59477-5f41-43e2-810f-8b80b5b7cf43"
            },
            name: {
                type: "string",
                description: "Name of the permission",
                example: "create:user"
            },
            description: {
                type: "string",
                description: "Description of the permission",
                example: "Allows user to create new users in the system"
            },
            created_at: {
                type: "string",
                format: "date-time",
                description: "Permission creation timestamp",
                example: "2025-06-30T10:30:00.000Z"
            }
        }
    },

    AssignPermissionsDto: {
        type: "object",
        required: ["userId", "permissionIds", "granted_by"],
        properties: {
            userId: {
                type: "string",
                format: "uuid",
                description: "ID of the user to assign permissions to",
                example: "bcb59477-5f41-43e2-810f-8b80b5b7cf43"
            },
            permissionIds: {
                type: "array",
                description: "Array of permission IDs to assign",
                items: {
                    type: "string",
                    format: "uuid"
                },
                example: [
                    "550e8400-e29b-41d4-a716-446655440000",
                    "123e4567-e89b-12d3-a456-426614174000"
                ]
            },
            granted_by: {
                type: "string",
                format: "uuid",
                description: "ID of the user granting the permissions",
                example: "550e8400-e29b-41d4-a716-446655440000"
            }
        }
    },

    BatchAssignPermissionDto: {
        type: "object",
        required: ["permissionId", "userIds", "granted_by"],
        properties: {
            permissionId: {
                type: "string",
                format: "uuid",
                description: "ID of the permission to assign",
                example: "550e8400-e29b-41d4-a716-446655440000"
            },
            userIds: {
                type: "array",
                description: "Array of user IDs to assign the permission to",
                items: {
                    type: "string",
                    format: "uuid"
                },
                example: [
                    "bcb59477-5f41-43e2-810f-8b80b5b7cf43",
                    "c8c19f57-e99a-4f62-a0fd-d93f2b2036de"
                ]
            },
            granted_by: {
                type: "string",
                format: "uuid",
                description: "ID of the user granting the permission",
                example: "550e8400-e29b-41d4-a716-446655440000"
            }
        }
    },

    RevokePermissionsDto: {
        type: "object",
        required: ["userId", "permissionIds"],
        properties: {
            userId: {
                type: "string",
                format: "uuid",
                description: "ID of the user to revoke permissions from",
                example: "bcb59477-5f41-43e2-810f-8b80b5b7cf43"
            },
            permissionIds: {
                type: "array",
                description: "Array of permission IDs to revoke",
                items: {
                    type: "string",
                    format: "uuid"
                },
                example: [
                    "550e8400-e29b-41d4-a716-446655440000",
                    "123e4567-e89b-12d3-a456-426614174000"
                ]
            }
        }
    },

    CheckMultiplePermissionsDto: {
        type: "object",
        required: ["permissionNames"],
        properties: {
            permissionNames: {
                type: "array",
                description: "Array of permission names to check",
                items: {
                    type: "string"
                },
                example: [
                    "create:user",
                    "update:user",
                    "delete:user"
                ]
            }
        }
    },

    PermissionCheckResultDto: {
        type: "object",
        properties: {
            hasAll: {
                type: "boolean",
                description: "Whether the user has all the checked permissions",
                example: false
            },
            missing: {
                type: "array",
                description: "List of missing permission names",
                items: {
                    type: "string"
                },
                example: [
                    "delete:user"
                ]
            }
        }
    },

    UserPermissionDetailDto: {
        type: "object",
        properties: {
            id: {
                type: "string",
                format: "uuid",
                description: "Permission ID",
                example: "550e8400-e29b-41d4-a716-446655440000"
            },
            name: {
                type: "string",
                description: "Permission name",
                example: "create:user"
            },
            description: {
                type: "string",
                description: "Permission description",
                example: "Allows user to create new users"
            },
            granted_at: {
                type: "string",
                format: "date-time",
                description: "When the permission was granted to the user",
                example: "2025-06-30T10:30:00.000Z"
            },
            granted_by_name: {
                type: "string",
                description: "Name of the user who granted the permission",
                example: "System Administrator"
            },
            is_revoked: {
                type: "boolean",
                description: "Whether the permission is revoked",
                example: false
            }
        }
    },

    UserWithPermissionDto: {
        type: "object",
        properties: {
            id: {
                type: "string",
                format: "uuid",
                description: "User ID",
                example: "bcb59477-5f41-43e2-810f-8b80b5b7cf43"
            },
            username: {
                type: "string",
                description: "Username",
                example: "johndoe"
            },
            email: {
                type: "string",
                description: "User email",
                example: "john.doe@example.com"
            },
            fullName: {
                type: "string",
                description: "Full name of the user",
                example: "John Doe"
            },
            granted_at: {
                type: "string",
                format: "date-time",
                description: "When the permission was granted",
                example: "2025-06-30T10:30:00.000Z"
            },
            granted_by_name: {
                type: "string",
                description: "Name of the user who granted the permission",
                example: "System Administrator"
            }
        }
    },

    SinglePermissionCheckDto: {
        type: "object",
        properties: {
            hasPermission: {
                type: "boolean",
                description: "Whether the user has the specified permission",
                example: true
            }
        }
    },

    PermissionAssignmentSuccessDto: {
        type: "object",
        properties: {
            message: {
                type: "string",
                description: "Success message",
                example: "Permissions assigned successfully"
            },
            assignedCount: {
                type: "integer",
                description: "Number of permissions assigned",
                example: 3
            }
        }
    },

    PermissionRevocationSuccessDto: {
        type: "object",
        properties: {
            message: {
                type: "string",
                description: "Success message",
                example: "Permissions revoked successfully"
            },
            revokedCount: {
                type: "integer",
                description: "Number of permissions revoked",
                example: 2
            }
        }
    },

    BatchPermissionAssignmentSuccessDto: {
        type: "object",
        properties: {
            message: {
                type: "string",
                description: "Success message",
                example: "Permission assigned to users successfully"
            },
            affectedUsers: {
                type: "integer",
                description: "Number of users affected",
                example: 5
            },
            permissionName: {
                type: "string",
                description: "Name of the assigned permission",
                example: "view:reports"
            }
        }
    },

    UserPermissionsResponseDto: {
        type: "object",
        properties: {
            permissions: {
                type: "array",
                description: "Array of permission names",
                items: {
                    type: "string"
                },
                example: [
                    "create:user",
                    "update:user",
                    "view:reports"
                ]
            }
        }
    },

    PermissionCheckResponseDto: {
        type: "object",
        properties: {
            hasPermission: {
                type: "boolean",
                description: "Whether the user has the specified permission",
                example: true
            }
        }
    },

    MultiplePermissionCheckResponseDto: {
        type: "object",
        properties: {
            permissions: {
                type: "object",
                description: "Object mapping permission names to boolean values",
                additionalProperties: {
                    type: "boolean"
                },
                example: {
                    "create:user": true,
                    "delete:user": false,
                    "update:user": true
                }
            }
        }
    },

    OpenShiftDTO: {
        type: "object",
        required: ["opened_by", "shift_type", "workers"],
        properties: {
            opened_by: {
                type: "string",
                format: "uuid",
                description: "User ID of the cashier opening the shift",
            },
            shift_type: {
                type: "string",
                enum: ["morning", "night"],
                description: "Type of shift",
            },
            workers: {
                type: "array",
                items: {
                    $ref: "#/components/schemas/AddShiftWorkerDTO",
                },
                description: "List of workers assigned to the shift",
            },
        },
    },
    CreateWorkerDto: {
        type: "object",
        required: ["full_name", "status", "base_hourly_rate"],
        properties: {
            full_name: {
                type: "string",
                description: "Full name of the worker",
            },
            status: {
                type: "string",
                enum: [
                    "admin",
                    "cashier",
                    "chef",
                    "waiter",
                    "delivery",
                    "kitchen",
                    "steawer",
                    "kitchen_assistant"
                ],
                description: "Worker status role",
            },
            base_hourly_rate: {
                type: "number",
                format: "decimal",
                minimum: 0,
                description: "Base hourly rate for the worker",
            },
            phone: {
                type: "string",
                description: "Optional phone number of the worker",
            },
            user_id: {
                type: "string",
                format: "uuid",
                description: "Optional user account ID if the worker has login access",
            },
        },
    },

    UpdateWorkerDto: {
        type: "object",
        properties: {
            full_name: {
                type: "string",
                description: "Updated full name of the worker",
            },
            status: {
                type: "string",
                enum: [
                    "admin",
                    "cashier",
                    "chef",
                    "waiter",
                    "delivery",
                    "kitchen",
                    "steawer",
                    "kitchen_assistant"
                ],
                description: "Updated status of the worker",
            },
            base_hourly_rate: {
                type: "number",
                format: "decimal",
                minimum: 0,
                description: "Updated hourly rate",
            },
            phone: {
                type: "string",
                description: "Updated phone number",
            },
            is_active: {
                type: "boolean",
                description: "Indicates whether the worker is active",
            },
            user_id: {
                type: "string",
                format: "uuid",
                description: "User ID if worker is linked to a user",
            },
        },
    },

    WorkerResponseDto: {
        type: "object",
        properties: {
            worker_id: {
                type: "string",
                format: "uuid",
                description: "ID of the worker",
            },
            full_name: {
                type: "string",
                description: "Full name of the worker",
            },
            status: {
                type: "string",
                enum: [
                    "admin",
                    "cashier",
                    "chef",
                    "waiter",
                    "delivery",
                    "kitchen",
                    "steawer",
                    "kitchen_assistant"
                ],
                description: "Status/role of the worker",
            },
            base_hourly_rate: {
                type: "number",
                format: "decimal",
                description: "Base hourly wage",
            },
            phone: {
                type: "string",
                description: "Phone number (if available)",
            },
            is_active: {
                type: "boolean",
                description: "Is the worker currently active",
            },
            joined_at: {
                type: "string",
                format: "date-time",
                description: "Join date of the worker",
            },
            user_id: {
                type: "string",
                format: "uuid",
                description: "Linked user account ID, if applicable",
            },
        },
    },
    AddShiftWorkerDto: {
        type: "object",
        required: ["shift_id", "worker_id", "hourly_rate", "start_time"],
        properties: {
            shift_id: {
                type: "string",
                format: "uuid",
                description: "ID of the shift the worker is assigned to",
            },
            worker_id: {
                type: "string",
                format: "uuid",
                description: "ID of the worker",
            },
            hourly_rate: {
                type: "number",
                format: "decimal",
                minimum: 0,
                description: "Hourly wage for the worker in this shift",
            },
            start_time: {
                type: "string",
                format: "date-time",
                description: "Start time of the worker's shift assignment",
            },
            end_time: {
                type: "string",
                format: "date-time",
                description: "Optional end time of the worker's shift assignment",
            },
        },
    },

    UpdateShiftWorkerDto: {
        type: "object",
        properties: {
            shift_id: {
                type: "string",
                format: "uuid",
                description: "Updated shift ID (optional)",
            },
            worker_id: {
                type: "string",
                format: "uuid",
                description: "Updated worker ID (optional)",
            },
            hourly_rate: {
                type: "number",
                format: "decimal",
                minimum: 0,
                description: "Updated hourly rate",
            },
            start_time: {
                type: "string",
                format: "date-time",
                description: "Updated start time of shift",
            },
            end_time: {
                type: "string",
                format: "date-time",
                description: "Updated end time of shift",
            },
            calculated_salary: {
                type: "number",
                format: "decimal",
                minimum: 0,
                description: "Calculated salary based on shift duration and hourly rate",
            },
        },
    },

    ShiftWorkerResponseDto: {
        type: "object",
        properties: {
            shift_worker_id: {
                type: "string",
                format: "uuid",
                description: "Unique ID of the shift worker assignment",
            },
            shift_id: {
                type: "string",
                format: "uuid",
                description: "ID of the assigned shift",
            },
            worker_id: {
                type: "string",
                format: "uuid",
                description: "ID of the worker",
            },
            hourly_rate: {
                type: "number",
                format: "decimal",
                description: "Hourly wage during the shift",
            },
            start_time: {
                type: "string",
                format: "date-time",
                description: "Start timestamp of the shift work",
            },
            end_time: {
                type: "string",
                format: "date-time",
                description: "End timestamp of the shift work (if ended)",
            },
            calculated_salary: {
                type: "number",
                format: "decimal",
                description: "Total salary earned in this shift segment",
            },
        },
    },
    CreateStockItemDto: {
        type: "object",
        required: ["name", "type", "unit", "current_quantity", "minimum_value", "status"],
        properties: {
            name: { type: "string" },
            type: { type: "string", enum: ["ingredient", "product", "supply"] }, // adjust enum values as needed
            unit: { type: "string" },
            current_quantity: { type: "number", format: "decimal", minimum: 0 },
            minimum_value: { type: "number", format: "decimal", minimum: 0 },
            status: { type: "string", enum: ["active", "inactive"] } // adjust enum values as needed
        }
    },

    UpdateStockItemDto: {
        type: "object",
        properties: {
            name: { type: "string" },
            type: { type: "string", enum: ["ingredient", "product", "supply"] },
            unit: { type: "string" },
            current_quantity: { type: "number", format: "decimal", minimum: 0 },
            minimum_value: { type: "number", format: "decimal", minimum: 0 },
            status: { type: "string", enum: ["active", "inactive"] }
        }
    },

    StockItemResponseDto: {
        type: "object",
        properties: {
            stock_item_id: { type: "string", format: "uuid" },
            name: { type: "string" },
            type: { type: "string", enum: ["ingredient", "product", "supply"] },
            unit: { type: "string" },
            current_quantity: { type: "number", format: "decimal" },
            minimum_value: { type: "number", format: "decimal" },
            status: { type: "string", enum: ["active", "inactive"] },
            last_updated_at: { type: "string", format: "date-time" },
            transactions: {
                type: "array",
                items: { $ref: "#/components/schemas/StockTransactionDto" }
            }
        }
    },

    StockItemListResponseDto: {
        type: "object",
        properties: {
            stockItems: {
                type: "array",
                items: { $ref: "#/components/schemas/StockItemResponseDto" }
            },
            total: { type: "integer", minimum: 0 },
            page: { type: "integer", minimum: 1 },
            limit: { type: "integer", minimum: 1 }
        }
    },

    LowStockItemDto: {
        type: "object",
        properties: {
            stock_item_id: { type: "string", format: "uuid" },
            name: { type: "string" },
            current_quantity: { type: "number", format: "decimal" },
            minimum_value: { type: "number", format: "decimal" },
            unit: { type: "string" }
        }
    },

    StockTransactionDto: {
        type: "object",
        properties: {
            transaction_id: { type: "string", format: "uuid" },
            type: { type: "string", enum: ["in", "out"] },
            quantity: { type: "number", format: "decimal" },
            timestamp: { type: "string", format: "date-time" }
        }
    },

    CreateStockTransactionDto: {
        type: "object",
        required: ["stock_item_id", "type", "quantity", "user_id", "shift_id"],
        properties: {
            stock_item_id: { type: "string", format: "uuid" },
            type: { type: "string", enum: ["in", "out"] },
            quantity: { type: "number", format: "decimal", minimum: 0 },
            user_id: { type: "string", format: "uuid" },
            shift_id: { type: "string", format: "uuid" }
        }
    },

    UpdateStockTransactionDto: {
        type: "object",
        properties: {
            stock_item_id: { type: "string", format: "uuid" },
            type: { type: "string", enum: ["in", "out"] },
            quantity: { type: "number", format: "decimal", minimum: 0 },
            user_id: { type: "string", format: "uuid" },
            shift_id: { type: "string", format: "uuid" }
        }
    },

    StockTransactionResponseDto: {
        type: "object",
        properties: {
            transaction_id: { type: "string", format: "uuid" },
            stock_item_id: { type: "string", format: "uuid" },
            stock_item_name: { type: "string" },
            type: { type: "string", enum: ["in", "out"] },
            quantity: { type: "number", format: "decimal" },
            user_id: { type: "string", format: "uuid" },
            user_name: { type: "string" },
            shift_id: { type: "string", format: "uuid" },
            timestamp: { type: "string", format: "date-time" }
        }
    },

    StockTransactionListResponseDto: {
        type: "object",
        properties: {
            transactions: {
                type: "array",
                items: { $ref: "#/components/schemas/StockTransactionResponseDto" }
            },
            total: { type: "integer", minimum: 0 },
            page: { type: "integer", minimum: 1 },
            limit: { type: "integer", minimum: 1 }
        }
    },

    StockTransactionStatsDto: {
        type: "object",
        properties: {
            stock_item_id: { type: "string", format: "uuid" },
            stock_item_name: { type: "string" },
            total_in: { type: "number", format: "decimal" },
            total_out: { type: "number", format: "decimal" },
            net_change: { type: "number", format: "decimal" },
            transaction_count: { type: "integer" }
        }
    },

    ShiftTransactionSummaryDto: {
        type: "object",
        properties: {
            shift_id: { type: "string", format: "uuid" },
            total_transactions: { type: "integer" },
            total_in_quantity: { type: "number", format: "decimal" },
            total_out_quantity: { type: "number", format: "decimal" },
            transactions: {
                type: "array",
                items: { $ref: "#/components/schemas/StockTransactionResponseDto" }
            }
        }
    },
    CreateOrderDto: {
        type: "object",
        required: ["cashier_id", "shift_id", "order_type", "items"],
        properties: {
            cashier_id: { type: "string", format: "uuid" },
            shift_id: { type: "string", format: "uuid" },
            table_number: { type: "string" },
            order_type: { type: "string", enum: ["dine_in", "takeaway", "delivery"] },
            customer_name: { type: "string" },
            customer_phone: { type: "string" },
            items: {
                type: "array",
                items: { $ref: "#/components/schemas/CreateOrderItemDto" },
            },
        },
    },

    UpdateOrderDto: {
        type: "object",
        properties: {
            table_number: { type: "string" },
            order_type: { type: "string", enum: ["dine_in", "takeaway", "delivery"] },
            status: { type: "string", enum: ["pending", "completed", "cancelled"] },
            customer_name: { type: "string" },
            customer_phone: { type: "string" },
        },
    },

    OrderResponseDto: {
        type: "object",
        properties: {
            order_id: { type: "string", format: "uuid" },
            cashier: { $ref: "#/components/schemas/CashierInfoDto" },
            shift: { $ref: "#/components/schemas/ShiftInfoDto" },
            table_number: { type: "string" },
            order_type: { type: "string", enum: ["dine_in", "takeaway", "delivery"] },
            status: { type: "string", enum: ["pending", "completed", "cancelled"] },
            total_price: { type: "number", format: "decimal" },
            customer_name: { type: "string" },
            customer_phone: { type: "string" },
            created_at: { type: "string", format: "date-time" },
            items: {
                type: "array",
                items: { $ref: "#/components/schemas/OrderItemResponseDto" },
            },
            items_count: { type: "integer", minimum: 0 },
        },
    },

    CashierInfoDto: {
        type: "object",
        properties: {
            id: { type: "string", format: "uuid" },
            username: { type: "string" },
            fullName: { type: "string" },
        },
    },

    ShiftInfoDto: {
        type: "object",
        properties: {
            shift_id: { type: "string", format: "uuid" },
            shift_type: { type: "string" },
            start_time: { type: "string", format: "date-time" },
            status: { type: "string" },
        },
    },

    OrderSummaryDto: {
        type: "object",
        properties: {
            order_id: { type: "string", format: "uuid" },
            table_number: { type: "string" },
            order_type: { type: "string" },
            status: { type: "string" },
            total_price: { type: "number", format: "decimal" },
            customer_name: { type: "string" },
            created_at: { type: "string", format: "date-time" },
            items_count: { type: "integer" },
        },
    },

    OrderStatsDto: {
        type: "object",
        properties: {
            total_orders: { type: "integer", minimum: 0 },
            active_orders: { type: "integer", minimum: 0 },
            completed_orders: { type: "integer", minimum: 0 },
            cancelled_orders: { type: "integer", minimum: 0 },
            total_revenue: { type: "number", format: "decimal" },
            average_order_value: { type: "number", format: "decimal" },
        },
    },
    CreateOrderItemDto: {
        type: "object",
        required: ["order_id", "product_size_id", "quantity", "unit_price"],
        properties: {
            order_id: { type: "string", format: "uuid" },
            product_size_id: { type: "string", format: "uuid" },
            quantity: { type: "integer", minimum: 1 },
            unit_price: { type: "number", format: "decimal", minimum: 0 },
            special_instructions: { type: "string" },
            extras: {
                type: "array",
                items: { $ref: "#/components/schemas/CreateOrderItemExtraDto" },
            },
        },
    },

    OrderItemResponseDto: {
        type: "object",
        properties: {
            order_item_id: { type: "string", format: "uuid" },
            order_id: { type: "string", format: "uuid" },
            product_size: { $ref: "#/components/schemas/ProductSizeInfoDto" },
            quantity: { type: "integer", minimum: 1 },
            category_id: { type: "string", format: "uuid" },
            category_name: { type: "string" },
            unit_price: { type: "number", format: "decimal" },
            special_instructions: { type: "string" },
            extras: {
                type: "array",
                items: { $ref: "#/components/schemas/OrderItemExtraResponseDto" },
            },
            total_price: { type: "number", format: "decimal" },
        },
    },

    ProductSizeInfoDto: {
        type: "object",
        properties: {
            product_size_id: { type: "string", format: "uuid" },
            product_name: { type: "string" },
            size_name: { type: "string" },
            price: { type: "number", format: "decimal" },
            category_name: { type: "string" },
            product_description: { type: "string" },
            category_description: { type: "string" },
        },
    },

    CreateOrderItemExtraDto: {
        type: "object",
        required: ["extra_id", "price"],
        properties: {
            extra_id: { type: "string", format: "uuid" },
            price: { type: "number", format: "decimal" },
        },
    },

    OrderItemExtraResponseDto: {
        type: "object",
        properties: {
            order_item_extra_id: { type: "string", format: "uuid" },
            order_item_id: { type: "string", format: "uuid" },
            extra: { $ref: "#/components/schemas/CategoryExtraInfoDto" },
            price: { type: "number", format: "decimal" },
        },
    },

    CategoryExtraInfoDto: {
        type: "object",
        properties: {
            extra_id: { type: "string", format: "uuid" },
            name: { type: "string" },
            price: { type: "number", format: "decimal" },
            category_name: { type: "string" },
        },
    },
    CreateCancelledOrderDto: {
        type: "object",
        required: ["order_id", "cancelled_by", "shift_id"],
        properties: {
            order_id: { type: "string", format: "uuid" },
            cancelled_by: { type: "string", format: "uuid" },
            shift_id: { type: "string", format: "uuid" },
            reason: { type: "string" },
        },
    },

    CancelledOrderResponseDto: {
        type: "object",
        properties: {
            cancelled_order_id: { type: "string", format: "uuid" },
            order: { $ref: "#/components/schemas/OrderResponseDto" },
            cancelled_by: { $ref: "#/components/schemas/CashierInfoDto" },
            shift: { $ref: "#/components/schemas/ShiftInfoDto" },
            reason: { type: "string" },
            cancelled_at: { type: "string", format: "date-time" },
        },
    },

    CancelledOrderListResponseDto: {
        type: "object",
        properties: {
            cancelled_orders: {
                type: "array",
                items: { $ref: "#/components/schemas/CancelledOrderResponseDto" },
            },
            total: { type: "integer", minimum: 0 },
            page: { type: "integer", minimum: 1 },
            limit: { type: "integer", minimum: 1 },
        },
    },
    ExternalReceiptDto: {
        type: "object",
        properties: {
            receipt_id: { type: "string", format: "uuid" },
            order_id: { type: "string", format: "uuid" },
            shift_id: { type: "string", format: "uuid" },
            cashier_id: { type: "string", format: "uuid" },
            total_amount: { type: "number", format: "decimal" },
            payment_method: {
                type: "string",
                enum: ["cash", "card", "wallet"],
            },
            image_url: { type: "string" },
            is_printed: { type: "boolean" },
            notes: { type: "string" },
            created_at: { type: "string", format: "date-time" },
        },
    },

    CreateExternalReceiptDto: {
        type: "object",
        required: ["order_id", "shift_id", "cashier_id", "total_amount", "payment_method"],
        properties: {
            order_id: { type: "string", format: "uuid" },
            shift_id: { type: "string", format: "uuid" },
            cashier_id: { type: "string", format: "uuid" },
            total_amount: { type: "number", format: "decimal" },
            payment_method: {
                type: "string",
                enum: ["cash", "card", "wallet"],
            },
            image_url: { type: "string" },
            is_printed: { type: "boolean" },
            notes: { type: "string" },
        },
    },

    CreateExpenseDTO: {
        type: "object",
        required: ["title", "amount", "created_by", "shift_id"],
        properties: {
            title: {
                type: "string",
                description: "Title or description of the expense"
            },
            amount: {
                type: "number",
                format: "decimal",
                description: "Amount spent"
            },
            created_by: {
                type: "string",
                format: "uuid",
                description: "ID of the user (admin) who recorded the expense"
            },
            shift_id: {
                type: "string",
                format: "uuid",
                description: "Associated shift ID"
            }
        }
    },

    UpdateExpenseDTO: {
        type: "object",
        properties: {
            title: {
                type: "string",
                description: "Updated title of the expense"
            },
            amount: {
                type: "number",
                format: "decimal",
                description: "Updated amount"
            }
        }
    },

    ExpenseResponseDTO: {
        type: "object",
        properties: {
            expense_id: { type: "string", format: "uuid" },
            title: { type: "string" },
            amount: { type: "number", format: "decimal" },
            created_by: { type: "string", format: "uuid" },
            shift_id: { type: "string", format: "uuid" },
            created_at: { type: "string", format: "date-time" }
        }
    }

};
