#!/usr/bin/env bash

# Ce script crée un brouillon de release à partir de l'ancien tag et du nouveau tag.

set -euo pipefail

APP_NAME="${1:-}"
VERSION="${2:-}"
RELEASE_DATE="${3:-}"
WHAT_NEW="${4:-}"
BUG_FIXES_AND_MINOR_CHANGES="${5:-}"
CHANGELOG_URL="${6:-}"
ISSUES_URL="${7:-}"
TAG_OLD="${8:-}"
TAG_NEW="${9:-}"
EXTRA="${10:-}"

if [[ -z "$TAG_OLD" || -z "$TAG_NEW" || -n "$EXTRA" ]]; then
  echo "❌ Usage: task release-draft -- <old_tag> <new_tag>"
  exit 1
fi

# On récupère le contenu du fichier "release-template.md" et on remplace les placeholders, du type ${PLACEHOLDER} par les valeurs données en arguments du script : APP_NAME, VERSION, RELEASE_DATE, WHAT_NEW, BUG_FIXES_AND_MINOR_CHANGES, CHANGELOG_URL, ISSUES_URL
RELEASE_DRAFT_CONTENT=$(cat scripts/release/release-template.md)

RELEASE_DRAFT_CONTENT="${RELEASE_DRAFT_CONTENT//\$\{APP_NAME\}/$APP_NAME}"
RELEASE_DRAFT_CONTENT="${RELEASE_DRAFT_CONTENT//\$\{VERSION\}/$VERSION}"
RELEASE_DRAFT_CONTENT="${RELEASE_DRAFT_CONTENT//\$\{RELEASE_DATE\}/$RELEASE_DATE}"
RELEASE_DRAFT_CONTENT="${RELEASE_DRAFT_CONTENT//\$\{WHAT_NEW\}/$WHAT_NEW}"
RELEASE_DRAFT_CONTENT="${RELEASE_DRAFT_CONTENT//\$\{BUG_FIXES_AND_MINOR_CHANGES\}/$BUG_FIXES_AND_MINOR_CHANGES}"
RELEASE_DRAFT_CONTENT="${RELEASE_DRAFT_CONTENT//\$\{CHANGELOG_URL\}/$CHANGELOG_URL}"
RELEASE_DRAFT_CONTENT="${RELEASE_DRAFT_CONTENT//\$\{ISSUES_URL\}/$ISSUES_URL}"

echo "$RELEASE_DRAFT_CONTENT"