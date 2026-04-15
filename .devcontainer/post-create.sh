#!/usr/bin/env bash
set -euo pipefail

echo "🌐 Installing Chromium + Cyrillic fonts for Chrome DevTools MCP..."
sudo apt-get update
sudo apt-get install -y --no-install-recommends \
  chromium \
  fonts-liberation \
  fonts-noto-core \
  fonts-noto-ui-core \
  fonts-noto-cjk \
  fonts-noto-color-emoji \
  ca-certificates
sudo rm -rf /var/lib/apt/lists/*

echo "📦 Installing project dependencies..."
npm install

echo "🔧 Installing global tools..."
npm install -g @anthropic-ai/claude-code || true

echo ""
echo "✅ Post-create setup complete!"
echo "   - chromium: $(chromium --version 2>/dev/null || echo 'not found')"
echo "   - node:     $(node --version)"
echo "   - npm:      $(npm --version)"
