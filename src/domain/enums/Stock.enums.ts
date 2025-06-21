export enum StockItemType {
    INGREDIENT = 'ingredient',
    EQUIPMENT = 'equipment',
    MATERIAL = 'material',
    VEGETABLE = 'vegetable',
    FRUIT = 'fruit',
    MEAT = 'meat',
    CHICKEN = 'chicken',
    FISH = 'fish',
    DRINK = 'drink',
    OTHER = 'other'
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