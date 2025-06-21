CREATE OR REPLACE VIEW inventory_usage_view AS
SELECT
    s.shift_id,
    si.stock_item_id,
    si.name AS stock_item_name,
  SUM(psl.quantity_per_unit * oi.quantity) AS total_used,
    si.unit
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
JOIN product_size_prices psp ON oi.product_size_id = psp.product_size_id
JOIN products p ON psp.product_id = p.product_id
JOIN product_stock_links psl ON p.product_id = psl.product_id
JOIN stock_items si ON psl.stock_item_id = si.stock_item_id
JOIN shifts s ON o.shift_id = s.shift_id
GROUP BY s.shift_id, si.stock_item_id, si.name, si.unit;
