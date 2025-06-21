CREATE OR REPLACE VIEW admin_permissions_view AS
SELECT
    sap.shift_id,
    u.username AS admin_name,
    p.name AS permission_name,
    sap.granted_at,
    sap.is_revoked
FROM shift_admin_permissions sap
JOIN users u ON sap.admin_id = u.user_id
JOIN permissions p ON sap.permission_id = p.permission_id;
