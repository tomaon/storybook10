#!/usr/bin/env bash
set -euo pipefail

file_path="$(python3 -c 'import json,sys; print(json.load(sys.stdin).get("file_path") or "")')"

if [[ -z "$file_path" || ! -f "$file_path" ]]; then
  exit 0
fi

case "$file_path" in
  *.ts|*.tsx|*.css) ;;
  *) exit 0 ;;
esac

root="$(cd "$(dirname "$0")/../.." && pwd)"
biome="$root/node_modules/.bin/biome"

if [[ ! -x "$biome" ]]; then
  exit 0
fi

cd "$root"
"$biome" check --write -- "$file_path" >/dev/null 2>&1 || true
exit 0
