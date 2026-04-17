#!/usr/bin/env bash
set -euo pipefail

echo "Installing Chromium + Cyrillic fonts for Chrome DevTools MCP..."
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

echo "Installing project dependencies..."
npm ci

echo "Installing global AI CLI tools..."
npm install -g @anthropic-ai/claude-code @openai/codex @google/gemini-cli || true

echo "Validating build..."
npm run build

# --- Bash history persistence ---
echo "Configuring persistent bash history..."
sudo mkdir -p /commandhistory
sudo chown node:node /commandhistory
touch /commandhistory/.bash_history

cat >> ~/.bashrc << 'HIST'

# Persistent bash history across container rebuilds
export HISTFILE=/commandhistory/.bash_history
export HISTSIZE=10000
export HISTFILESIZE=20000
export PROMPT_COMMAND="history -a; ${PROMPT_COMMAND:-}"
shopt -s histappend
HIST

echo ""
echo "Post-create setup complete!"
echo "  - chromium: $(chromium --version 2>/dev/null || echo 'not found')"
echo "  - node:     $(node --version)"
echo "  - npm:      $(npm --version)"
echo "  - claude:   $(claude --version 2>/dev/null || echo 'not found')"
echo "  - codex:    $(codex --version 2>/dev/null || echo 'not found')"
echo "  - gemini:   $(gemini --version 2>/dev/null || echo 'not found')"
