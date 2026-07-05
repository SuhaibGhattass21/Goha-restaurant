Place your TLS certificate files in this directory for the `proxy` service.

Expected default filenames:
- `fullchain.pem`
- `privkey.pem`

If you use different filenames, update `TLS_CERT_PATH` and `TLS_KEY_PATH` in your `.env`.

If you do not have certificates yet, set `TLS_MODE=auto` or `TLS_MODE=off` and the proxy will start in HTTP-only mode on port `80`.
