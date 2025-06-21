CREATE OR REPLACE VIEW order_receipt_view AS
SELECT
    o.order_id,
    o.created_at,
    u.username AS cashier,
    p.name AS product_name,
    cs.size_name,
    oi.quantity,
    oi.unit_price,
    COALESCE(
        array_agg(ce.name || ' (' || oie.price || ')') FILTER (WHERE ce.name IS NOT NULL),
        '{}'
    ) AS extras
FROM orders o
JOIN users u ON o.cashier_id = u.user_id
JOIN order_items oi ON o.order_id = oi.order_id
JOIN product_size_prices psp ON oi.product_size_id = psp.product_size_id
JOIN products p ON psp.product_id = p.product_id
JOIN category_sizes cs ON psp.size_id = cs.size_id
LEFT JOIN order_item_extras oie ON oi.order_item_id = oie.order_item_id
LEFT JOIN category_extras ce ON oie.extra_id = ce.extra_id
GROUP BY o.order_id, o.created_at, u.username, p.name, cs.size_name, oi.quantity, oi.unit_price;
