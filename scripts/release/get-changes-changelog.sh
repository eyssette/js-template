#!/usr/bin/env bash

set -euo pipefail

TAG_SOURCE="${1:-}"
TAG_TARGET="${2:-}"
EXTRA="${3:-}"

if [[ -z "$TAG_SOURCE" || -n "$EXTRA" ]]; then
  echo "❌ Usage: task get-changes:changelog -- <tag_source> [tag_cible]"
  exit 1
fi

if [[ -z "$TAG_TARGET" ]]; then
  TAG_TARGET=$(sed -nE 's/^##[[:space:]]+([^[:space:]]+).*/\1/p' CHANGELOG.md | head -n 1)
  if [[ -z "$TAG_TARGET" ]]; then
    echo "❌ Impossible de déterminer le tag cible depuis CHANGELOG.md"
    exit 1
  fi
fi

if [[ "$TAG_SOURCE" == "$TAG_TARGET" ]]; then
  echo "❌ Le tag source et le tag cible doivent être différents"
  exit 1
fi

CHANGELOG_AT_TARGET=$(git show "$TAG_TARGET:CHANGELOG.md" 2>/dev/null || true)
if [[ -z "$CHANGELOG_AT_TARGET" ]]; then
  echo "❌ Impossible de lire CHANGELOG.md au tag cible \"$TAG_TARGET\""
  exit 1
fi

SECTION=$(printf "%s\n" "$CHANGELOG_AT_TARGET" | awk -v source="$TAG_SOURCE" -v target="$TAG_TARGET" '
  BEGIN {
    capture = 0
    found_target = 0
    found_source = 0
  }
  $1 == "##" {
    version = $2
    if (version == target) {
      capture = 1
      found_target = 1
    } else if (version == source && capture == 1) {
      found_source = 1
      exit
    }
  }
  capture == 1 {
    print
  }
  END {
    if (found_target == 0) {
      exit 2
    }
    if (found_source == 0) {
      exit 3
    }
  }
')
AWK_STATUS=$?

if [[ "$AWK_STATUS" -eq 2 ]]; then
  echo "❌ Le tag cible \"$TAG_TARGET\" est introuvable dans CHANGELOG.md"
  exit 1
fi

if [[ "$AWK_STATUS" -eq 3 ]]; then
  echo "❌ Le tag source \"$TAG_SOURCE\" est introuvable dans CHANGELOG.md du tag cible \"$TAG_TARGET\""
  exit 1
fi

echo "## CHANGELOG.md (entre $TAG_SOURCE et $TAG_TARGET)"
echo ""
# Add one heading level for each markdown heading line.
printf "%s\n" "$SECTION" | sed 's/^#/##/'
echo ""
