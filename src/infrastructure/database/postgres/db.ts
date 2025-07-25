import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Category, CategoryExtra, CategorySize, ExternalReceipt, Order, OrderItem, OrderItemExtra, Product, ProductSizePrice, Shift, ShiftWorker, StockItem, StockTransaction, Supplier, SupplierInvoice, SupplierPayment, User, Permissions, UserPermission, Worker, CancelledOrder, Expense } from '../models';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL || '',
    synchronize: false,
    logging: false,
    // migrations: ['src/infrastructure/database/postgres/migrations/*.ts'],
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
        ShiftWorker,
        Supplier,
        SupplierInvoice,
        SupplierPayment,
        ExternalReceipt,
        User,
        Permissions,
        UserPermission,
        Worker,
        CancelledOrder,
        Expense
    ],
    subscribers: [],
});


