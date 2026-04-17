#!/usr/bin/env bash
set -euo pipefail

echo "=== Webspirio DevContainer Ready ==="
echo ""
echo "  node:     $(node --version)"
echo "  npm:      $(npm --version)"
echo "  chromium: $(chromium --version 2>/dev/null || echo 'not found')"
echo ""

# Verify chromium is available for Chrome DevTools MCP
if command -v chromium &>/dev/null; then
  echo "  Chrome DevTools MCP: chromium available"
else
  echo "  WARNING: chromium not found — Chrome DevTools MCP will not work"
fi

echo ""
echo "  Run 'npm run dev' to start the dev server on port 5173"
echo ""
