CREATE OR REPLACE VIEW shift_summary_view AS
SELECT
    s.shift_id,
    s.start_time,
    s.end_time,
    s.shift_type,
    COUNT(DISTINCT o.order_id) AS total_orders,
    SUM(o.total_price) AS total_revenue,
    SUM(sw.calculated_salary) AS total_salaries,
    ARRAY_AGG(DISTINCT u.username) AS cashiers
FROM shifts s
LEFT JOIN orders o ON o.shift_id = s.shift_id
LEFT JOIN shift_workers sw ON sw.shift_id = s.shift_id
LEFT JOIN users u ON o.cashier_id = u.user_id
GROUP BY s.shift_id;
