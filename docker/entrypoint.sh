#!/bin/sh
set -eu

require_value() {
  variable_name="$1"
  variable_value="$(printenv "$variable_name" || true)"

  if [ -z "$variable_value" ]; then
    echo "Configuration error: $variable_name is required." >&2
    exit 1
  fi

  case "$variable_value" in
    *CHANGE_ME*|*REPLACE_ME*|*YOUR_SECRET_HERE*)
      echo "Configuration error: $variable_name still contains a placeholder." >&2
      exit 1
      ;;
  esac
}

require_secret() {
  variable_name="$1"
  require_value "$variable_name"
  variable_value="$(printenv "$variable_name")"
  variable_length="$(printf %s "$variable_value" | wc -c | tr -d ' ')"

  if [ "$variable_length" -lt 32 ]; then
    echo "Configuration error: $variable_name must contain at least 32 characters." >&2
    exit 1
  fi
}

require_value DATABASE_URL
require_secret PAYLOAD_SECRET
require_secret CRON_SECRET
require_secret PREVIEW_SECRET
require_value NEXT_PUBLIC_SERVER_URL

case "$(printenv NEXT_PUBLIC_SERVER_URL)" in
  http://*|https://*) ;;
  *)
    echo "Configuration error: NEXT_PUBLIC_SERVER_URL must start with http:// or https://." >&2
    exit 1
    ;;
esac

exec "$@"
