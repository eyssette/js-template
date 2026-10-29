---
description: "General Rules to Follow : coding, tests, build, lint, i18n, docs, release notes, and commit conventions."
name: "Agent Guidelines"
---

# Agent Guidelines

## Project context

### Stack and runtime

- Node.js 22+ for local work, build, and CI.
- npm is the package manager.
- Source code lives in `app/js` and `app/css`; entry point is `app/js/main.mjs` (imports the other JS modules and the main CSS).
- The ECMAScript target is es2020.

### Project structure

| Path | Content |
| --- | --- |
| `app/` | Application source code |
| `app/js/lib/paraglide/` | Generated — never edit |
| `app/pwa/` | Service worker and PWA files |
| `dist/` | Build output — never edit |
| `docs/` | Documentation |
| `features/` | Gherkin scenarios for e2e tests |
| `i18n/messages/` | Translation files (ParaGlideJS) |
| `i18n/helpers/` | i18n helper scripts |
| `packages/create-js-template/` | Script to create a new project from js-template (removed after project creation) |
| `scripts/` | Automation scripts backing Taskfile tasks |
| `tests/unit/` | Unit tests (Jasmine) |
| `tests/e2e/step_definitions/` | E2e step implementations (CodeceptJS) |


## Working principles

- For clear, actionable requests, inspect the relevant code and implement the requested changes without asking for approval of the implementation plan.
- Ask clarifying questions when ambiguity materially affects the expected behavior, scope, or architecture.
- For minor ambiguities, choose the simplest reasonable interpretation, document the assumption, and proceed when the decision is reversible and within the user's request.
- Before making a consequential decision outside the agreed scope, explain the options and ask for approval.
- User approval of a plan does not authorize unrelated changes or actions restricted by the Guardrails section.
- Write the minimum code that solves the problem: no speculative features, abstractions, or configurability that was not asked for.
- Touch only what the task requires. Do not reformat, refactor, or "improve" adjacent code — Oxfmt/Oxlint already handle style on save. Remove only the imports/variables your own change made unused; leave pre-existing dead code, just mention it.
- Prefer the tasks already defined in Taskfile.yml over ad-hoc commands.
- Use the skills in .agents/skills/ when one matches the task.

## Architecture and coding conventions

### Code quality

- Write modular JavaScript with explicit imports/exports.
- Keep functions small, testable, and low in cognitive complexity.
- Do not add libraries or dependencies without user approval.
- Use English for code (functions, variables, classes, etc.) and French for comments and documentation.
- Maintain compatibility with the project's ECMAScript target (es2020)

Lint policy — if a rule fires (inline, per-file, or global in oxlint.config.mjs):
- ERROR → fix the underlying code.
- WARNING → Fix the issue when reasonably possible.
- If a warning cannot be resolved without an unjustified workaround, explain why and report it rather than disabling the rule.
- Never change lint configuration or disable a rule without explicit user approval.
- Explain consequential decisions, deviations from the project's rules, and non-obvious trade-offs. Summarize routine implementation details in the final response.

### Naming conventions

| Files | Convention |
| --- | --- |
| JavaScript | `camelCase` by default |
| Svelte components (`app/js/components`) | `PascalCase` |
| `features/` | `snake_case` |
| `tests/e2e/` | `snake_case` — except `tests/e2e/.config/`: `kebab-case` |
| Unit tests (`tests/unit/`) | `camelCase`, matching the JavaScript file tested |
| `scripts/`, `i18n/helpers/`, `packages/create-js-template/` | `kebab-case` |

### UI/UX Design

- Default to a simple, clean, modern design — no unnecessary complexity or visual clutter.
- Responsive and accessible, following WCAG 2.1 level AA.
- Intuitive, very fast, easy to use, with clear navigation.


### Internationalization

- All user-visible application text must use ParaGlideJS.
- Add or update translations in `i18n/messages`.
- Follow the project's existing message-key conventions.
- Do not manually edit generated ParaGlideJS output.

### Svelte 5 Components

Prefer vanilla JavaScript. Use Svelte 5 components when their reactivity, state management, or component model provides a clear advantage over a vanilla JavaScript implementation.

- Component files live in app/js/components (PascalCase).
- Declare the custom element name in kebab-case: <svelte:options customElement="component-name" />.
- Use Svelte 5 runes: `$props` for component properties, `$state` / `$derived` / `$effect` for fine-grained reactivity, `$host` to access the host element (e.g. for event dispatching).

### Commit and changelog conventions

- Follow Conventional Commits, in French, with a scope required for `feat` and `fix`.
- Use clear, user-oriented wording in commit messages and changelog entries.
- Husky hooks re-check commit message format, lint, and formatting on commit. If a hook fails, fix the reported issue rather than working around it — never use `--no-verify`.


## Development commands

### Taskfile Commands

Always run tasks with `npx task <name>` (never assume `task` is installed globally).

Everyday:

| Command | Purpose |
| --- | --- |
| `npx task dev` | Dev server (watch mode) |
| `npx task build` | Build |

Quality:

| Command | Purpose |
| --- | --- |
| `npx task format:file -- <file_path>` | Format one file |
| `npx task format` | Format all files |
| `npx task lint:file:all -- <file_path>` | Lint one JS file (all issues) |
| `npx task lint:all` | Lint all JS files |
| `npx task lint` | Lint all JS files (major issues only) |
| `npx task html-validate` | HTML validation |
| `npx task ecma:source` | Check ECMAScript compatibility of source |
| `npx task ecma:dist` | Check ECMAScript compatibility of build output |
| `npx task review:file -- <file_path>` | Review a file |

Tests:

| Command | Purpose |
| --- | --- |
| `npx task tests` | Full test suite |
| `npx task tests:unit` | Unit tests only |
| `npx task tests:e2e` | E2e tests only |
| `npx task tests:e2e:current` | E2e tests tagged `@CURRENT` only (fast iteration on one scenario) |
| `npx task coverage` | Unit test coverage report |

⚠️ If `npx task <name>` fails with "command not found" or similar, check `Taskfile.yml` for the exact task name before assuming a different command — do not invent substitute commands.

May be unavailable — these require external tools not installed via npm (semgrep, bearer, trivy, lighthouse, pngquant/jpegoptim/svgo). Attempt only if the user asks; if the underlying tool is missing, report it clearly — do not retry or mask the error:

- `npx task security`, `npx task security:semgrep`, `npx task security:bearer`, `npx task security:trivy`
- `npx task perf`, `npx task perf:desktop`, `npx task perf:mobile`
- `npx task compress:images`
- `npx task a11y`

### Skills

Skills live in `.agents/skills/<name>/SKILL.md`. Read the relevant skill before acting.
If no skill file exists, fall back to the rules in this document.

## Testing and validation

- Add or update tests when changing application logic, following the existing test structure and conventions.
	- unit tests in `tests/unit/`
	- E2E scenarios in `features/`: Gherkin scenarios — clear, concise, user-oriented, in the style of existing scenarios.
		- When iterating on a single e2e scenario, tag it `@CURRENT` and run `npx task tests:e2e:current` instead of the full suite. Remove the `@CURRENT` tag in the final version of the scenario.
	- E2E step definitions in `tests/e2e/step_definitions/`
- Run the relevant tests when practical.
- Do not modify tests merely to make them pass; tests must reflect the intended behavior.

Definition of done — before considering a change finished, run in this order:

- [ ] `npx task format:file -- <file_path>` on every file you touched.
- [ ] `npx task lint:file:all -- <file_path>` on every JS file you touched
- [ ] `npx task tests:unit` if you touched logic that has unit tests.
- [ ] `npx task tests:e2e` if you have made important modifications to the application's behavior.
- [ ] `npx task ecma:source` if you touched syntax that might not be supported.

## Security and guardrails

**Never run the following commands without explicit user approval in the current conversation turn:**

- `npx task push` — pushes to **all configured Git remotes**; requires lint and tests to pass first.
- `npx task bump` — bumps the version, creates a Git tag, rewrites `CHANGELOG.md`, `VERSION`, `package.json`.
- `git push`, `git commit --no-verify`, or anything that bypasses Husky hooks.

**Never edit by hand:**

- `dist/` — generated build output.
- `app/js/lib/paraglide/` — generated by `npx task paraglide:compile`, gitignored.
- `CHANGELOG.md` — owned by `npx task bump`.

**Never:**

- Hardcode user-facing strings — use ParaGlideJS.
- Disable a lint rule to make it pass — see the lint policy in Code quality.
- Add a library or dependency without user approval.
- Change unit tests or E2E scenarios just to make them pass — tests must reflect actual behavior.


## Communication and language

| Context | Language |
| --- | --- |
| Communication with the user | French — unless the user writes in another language |
| Code (functions, variables, classes…) | English |
| Comments and documentation | French — unless the user asks for another language |
| Commit messages and changelog entries | French — unless the user asks for another language |
| This `AGENTS.md` file | English — explicit exception: LLM-facing agent configuration is kept in English |

Style: be concise, not verbose.
