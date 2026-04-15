#!/usr/bin/env bash
set -euo pipefail

echo "📦 Installing project dependencies..."
npm install

echo "🔧 Installing global tools..."
npm install -g @anthropic-ai/claude-code || true

echo "✅ Post-create setup complete!"
