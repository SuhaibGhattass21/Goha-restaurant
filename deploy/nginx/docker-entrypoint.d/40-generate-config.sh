#!/bin/sh
set -eu

TLS_MODE_VALUE="${TLS_MODE:-auto}"
CERT_PATH="${TLS_CERT_PATH:-/etc/nginx/certs/fullchain.pem}"
KEY_PATH="${TLS_KEY_PATH:-/etc/nginx/certs/privkey.pem}"
HTTP_TEMPLATE="/opt/goha-nginx/http-only.conf.template"
HTTPS_TEMPLATE="/opt/goha-nginx/https.conf.template"
TARGET_CONFIG="/etc/nginx/conf.d/default.conf"

case "$TLS_MODE_VALUE" in
  auto)
    if [ -f "$CERT_PATH" ] && [ -f "$KEY_PATH" ]; then
      TEMPLATE="$HTTPS_TEMPLATE"
      echo "TLS_MODE=auto: certificates found, enabling HTTPS proxy configuration."
    else
      TEMPLATE="$HTTP_TEMPLATE"
      echo "TLS_MODE=auto: certificates not found, starting proxy in HTTP-only mode."
    fi
    ;;
  on)
    TEMPLATE="$HTTPS_TEMPLATE"
    echo "TLS_MODE=on: HTTPS proxy configuration requested."
    ;;
  off)
    TEMPLATE="$HTTP_TEMPLATE"
    echo "TLS_MODE=off: using HTTP-only proxy configuration."
    ;;
  *)
    echo "Unsupported TLS_MODE: $TLS_MODE_VALUE"
    exit 1
    ;;
esac

envsubst '${SERVER_NAME} ${TLS_CERT_PATH} ${TLS_KEY_PATH}' < "$TEMPLATE" > "$TARGET_CONFIG"
