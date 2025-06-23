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
        required: ["name", "price", "category_id"],
        properties: {
            name: {
                type: "string",
                description: "Name of the product",
            },
            price: {
                type: "number",
                format: "decimal",
                minimum: 0,
                description: "Price of the product",
            },
            category_id: {
                type: "string",
                format: "uuid",
                description: "ID of the category to which the product belongs",
            },
        },
    },
    UpdateProductDTO: {
        type: "object",
        properties: {
            name: {
                type: "string",
                description: "Updated name of the product",
            },
            price: {
                type: "number",
                format: "decimal",
                minimum: 0,
                description: "Updated price of the product",
            },
            category_id: {
                type: "string",
                format: "uuid",
                description: "Updated ID of the category to which the product belongs",
            },
        },
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
        required: ["username", "email", "password"],
        properties: {
            username: {
                type: "string",
                description: "Username of the user",
            },
            email: {
                type: "string",
                format: "email",
                description: "Email of the user",
            },
            password: {
                type: "string",
                description: "Password of the user",
            },
        },
    },
    UpdateUserDTO: {
        type: "object",
        properties: {
            username: {
                type: "string",
                description: "Updated username of the user",
            },
            email: {
                type: "string",
                format: "email",
                description: "Updated email of the user",
            },
            password: {
                type: "string",
                description: "Updated password of the user",
            },
        },
    },
    CreatePermissionDTO: {
        type: "object",
        required: ["name", "description"],
        properties: {
            name: {
                type: "string",
                description: "Name of the permission",
            },
            description: {
                type: "string",
                description: "Description of the permission",
            },
        },
    },
    UpdatePermissionDTO: {
        type: "object",
        properties: {
            name: {
                type: "string",
                description: "Updated name of the permission",
            },
            description: {
                type: "string",
                description: "Updated description of the permission",
            },
        },
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
    CreatePermissionDto: {
        type: "object",
        required: ["name", "description"],
        properties: {
            name: {
                type: "string",
                description: "Name of the permission",
            },
            description: {
                type: "string",
                description: "Description of the permission",
            },
        },
    },
    UpdatePermissionDto: {
        type: "object",
        properties: {
            name: {
                type: "string",
                description: "Updated name of the permission",
            },
            description: {
                type: "string",
                description: "Updated description of the permission",
            },
        },
    },
    CreateWorkerDTO: {
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

    UpdateWorkerDTO: {
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

    WorkerResponseDTO: {
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

};