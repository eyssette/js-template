#!/usr/bin/env bash

# Ce script crée un brouillon de release à partir de l'ancien tag et du nouveau tag.

set -euo pipefail

APP_NAME="${1:-}"
VERSION="${2:-}"
RELEASE_DATE="${3:-}"
CHANGELOG_URL="${4:-}"
ISSUES_URL="${5:-}"
TAG_OLD="${6:-}"
TAG_NEW="${7:-}"
EXTRA="${11:-}"

if [[ ${8+x} ]]; then
  WHAT_NEW="$8"
else
  WHAT_NEW='<!-- Indiquer ici les nouveautés et améliorations -->'
fi

if [[ ${9+x} ]]; then
  BUG_FIXES_AND_MINOR_CHANGES="$9"
else
  BUG_FIXES_AND_MINOR_CHANGES='<!-- Indiquer ici les corrections de bugs et changements mineurs -->'
fi

if [[ ${10+x} ]]; then
  BREAKING_CHANGES="${10}"
else
  BREAKING_CHANGES='<!-- Indiquer ici les changements majeurs -->'
fi

if [[ -z "$TAG_OLD" || -z "$TAG_NEW" || -n "$EXTRA" ]]; then
  echo "❌ Usage: task release-draft -- <old_tag> <new_tag>"
  exit 1
fi

# On interprète un sous-ensemble de Liquid suffisant pour ce template :
# - les variables {{ NAME }}
# - les blocs conditionnels {% if NAME %}...{% endif %}
# Si WHAT_NEW n'existe pas, on met un commentaire pour indiquer à l'utilisateur de le remplir.
# Si WHAT_NEW existe mais est vide, il reste vide pour ne pas afficher le bloc conditionnel.
# Même logique pour BUG_FIXES_AND_MINOR_CHANGES et BREAKING_CHANGES.
APP_NAME="$APP_NAME" \
VERSION="$VERSION" \
RELEASE_DATE="$RELEASE_DATE" \
WHAT_NEW="$WHAT_NEW" \
BUG_FIXES_AND_MINOR_CHANGES="$BUG_FIXES_AND_MINOR_CHANGES" \
BREAKING_CHANGES="$BREAKING_CHANGES" \
CHANGELOG_URL="$CHANGELOG_URL" \
ISSUES_URL="$ISSUES_URL" \
node <<'EOF'
const fs = require('node:fs');

const data = {
  APP_NAME: process.env.APP_NAME ?? '',
  VERSION: process.env.VERSION ?? '',
  RELEASE_DATE: process.env.RELEASE_DATE ?? '',
  WHAT_NEW: process.env.WHAT_NEW ?? '',
  BUG_FIXES_AND_MINOR_CHANGES: process.env.BUG_FIXES_AND_MINOR_CHANGES ?? '',
  BREAKING_CHANGES: process.env.BREAKING_CHANGES ?? '',
  CHANGELOG_URL: process.env.CHANGELOG_URL ?? '',
  ISSUES_URL: process.env.ISSUES_URL ?? '',
};

let template = fs.readFileSync('scripts/release/release-template.md', 'utf8');

template = template.replace(/\{%\s*if\s+([A-Z_][A-Z0-9_]*)\s*%\}([\s\S]*?)\{%\s*endif\s*%\}/g, (_match, key, block) => {
  return data[key]?.trim() ? block : '';
});

template = template.replace(/\{\{\s*([A-Z_][A-Z0-9_]*)\s*\}\}/g, (_match, key) => {
  return data[key] ?? '';
});

process.stdout.write(template);
EOF