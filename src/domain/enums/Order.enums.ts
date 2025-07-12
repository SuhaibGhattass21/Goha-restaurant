export enum OrderStatus {
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
    ACTIVE = 'active'
}

export enum OrderType {
    DINE_IN = 'dine-in',
    TAKEAWAY = 'takeaway',
    DELIVERY = 'delivery',
    CAFE = 'cafe'
}

export enum OrderPaymentMethod {
    CASH = 'cash',
    CARD = 'card',
    WALLET = 'wallet',
}