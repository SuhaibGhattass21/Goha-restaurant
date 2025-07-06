export enum StockItemType {
    INGREDIENT = 'مكونات',
    EQUIPMENT = 'ادوات',
    VEGETABLE = 'خضراوات',
    FRUIT = 'فاكهة',
    MEAT = 'لحم',
    CHICKEN = 'فراخ',
    FISH = 'سمك',
    DRINK = 'مشروبات',
    OTHER = 'اخري'
}

export enum StockItemStatus {
    AVAILABLE = 'available',
    LOWSTOCK = 'lowstock',
    OUTOFSTOCK = 'outofstock'
}

export enum StockTransactionType {
    IN = 'in',
    OUT = 'out',
}