"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockTransactionType = exports.StockItemStatus = exports.StockItemType = void 0;
var StockItemType;
(function (StockItemType) {
    StockItemType["INGREDIENT"] = "\u0645\u0643\u0648\u0646\u0627\u062A";
    StockItemType["EQUIPMENT"] = "\u0627\u062F\u0648\u0627\u062A";
    StockItemType["VEGETABLE"] = "\u062E\u0636\u0631\u0627\u0648\u0627\u062A";
    StockItemType["FRUIT"] = "\u0641\u0627\u0643\u0647\u0629";
    StockItemType["MEAT"] = "\u0644\u062D\u0645";
    StockItemType["CHICKEN"] = "\u0641\u0631\u0627\u062E";
    StockItemType["FISH"] = "\u0633\u0645\u0643";
    StockItemType["DRINK"] = "\u0645\u0634\u0631\u0648\u0628\u0627\u062A";
    StockItemType["OTHER"] = "\u0627\u062E\u0631\u064A";
})(StockItemType || (exports.StockItemType = StockItemType = {}));
var StockItemStatus;
(function (StockItemStatus) {
    StockItemStatus["AVAILABLE"] = "available";
    StockItemStatus["LOWSTOCK"] = "lowstock";
    StockItemStatus["OUTOFSTOCK"] = "outofstock";
})(StockItemStatus || (exports.StockItemStatus = StockItemStatus = {}));
var StockTransactionType;
(function (StockTransactionType) {
    StockTransactionType["IN"] = "in";
    StockTransactionType["OUT"] = "out";
})(StockTransactionType || (exports.StockTransactionType = StockTransactionType = {}));
//# sourceMappingURL=Stock.enums.js.map