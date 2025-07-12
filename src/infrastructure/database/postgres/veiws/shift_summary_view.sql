CREATE OR REPLACE VIEW shift_summary_view AS
SELECT
    s.shift_id,
    s.start_time,
    s.end_time,
    s.shift_type,
    COUNT(DISTINCT o.order_id) AS total_orders,
    COALESCE(SUM(CASE WHEN o.type != 'cafe' THEN o.total_price ELSE 0 END), 0) AS total_revenue,
    COALESCE(SUM(CASE WHEN o.type = 'cafe' THEN o.total_price ELSE 0 END), 0) AS cafe_revenue,
    COALESCE((SELECT SUM(e.amount) FROM expenses e WHERE e.shift_id = s.shift_id), 0) AS total_expenses,
    COALESCE(SUM(sw.calculated_salary), 0) AS total_salaries,
    COALESCE(
        COALESCE(SUM(CASE WHEN o.type != 'cafe' THEN o.total_price ELSE 0 END), 0)
        - COALESCE((SELECT SUM(e.amount) FROM expenses e WHERE e.shift_id = s.shift_id), 0)
        - COALESCE(SUM(sw.calculated_salary), 0),
        0
    ) AS final_number,
    ARRAY_AGG(DISTINCT u.username) AS cashiers
FROM shifts s
LEFT JOIN orders o ON o.shift_id = s.shift_id
LEFT JOIN shift_workers sw ON sw.shift_id = s.shift_id
LEFT JOIN users u ON o.cashier_id = u.user_id
GROUP BY s.shift_id;
