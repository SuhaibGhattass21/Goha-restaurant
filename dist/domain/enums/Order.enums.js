"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderPaymentMethod = exports.OrderType = exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["COMPLETED"] = "completed";
    OrderStatus["CANCELLED"] = "cancelled";
    OrderStatus["ACTIVE"] = "active";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var OrderType;
(function (OrderType) {
    OrderType["DINE_IN"] = "dine-in";
    OrderType["TAKEAWAY"] = "takeaway";
    OrderType["DELIVERY"] = "delivery";
})(OrderType || (exports.OrderType = OrderType = {}));
var OrderPaymentMethod;
(function (OrderPaymentMethod) {
    OrderPaymentMethod["CASH"] = "cash";
    OrderPaymentMethod["CARD"] = "card";
    OrderPaymentMethod["WALLET"] = "wallet";
})(OrderPaymentMethod || (exports.OrderPaymentMethod = OrderPaymentMethod = {}));
//# sourceMappingURL=Order.enums.js.map