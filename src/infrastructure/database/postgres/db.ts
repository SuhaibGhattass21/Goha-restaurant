import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Category, CategoryExtra, CategorySize, ExternalReceipt, Order, OrderItem, OrderItemExtra, Permission, Product, ProductSizePrice, Shift, ShiftAdminPermission, ShiftWorker, StockItem, StockTransaction, Supplier, SupplierInvoice, SupplierPayment, User } from '../models';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL || '',
    synchronize: true,
    logging: false,
    entities: [
        User,
        Product,
        Category,
        CategorySize,
        ProductSizePrice,
        CategoryExtra,
        Order,
        OrderItem,
        Shift,
        StockItem,
        StockTransaction,
        OrderItemExtra,
        Permission,
        ShiftAdminPermission,
        ShiftWorker,
        Supplier,
        SupplierInvoice,
        SupplierPayment,
        ExternalReceipt,
        User,
        Permission
    ],
    migrations: [],
    subscribers: [],
});


