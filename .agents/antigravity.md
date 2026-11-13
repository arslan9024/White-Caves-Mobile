# White Caves Mobile — Antigravity & AEGIS Field Companion Node
# Location: C:\Users\Dell\Documents\antigravity\White-Caves\White-Caves-Mobile\.agents\antigravity.md
# Hierarchy: Mobile Project Layer

---
description: White Caves Mobile project-level Antigravity instructions, React Native / Expo architecture, and field broker operations.
globs: ["*"]
alwaysApply: true
---

# 1. Mobile Role & Authority
- Field agent companion app for on-site property visits, digital client signatures, and offline lead notes.
- Built on React Native, Expo, and TypeScript.
- Operates under AEGIS Department 03 (Mobile Engineering: `@Iris`).
- Monorepo umbrella reference: `../.agents/antigravity.md`
- Server counterpart: `../White-Caves-Server/.agents/antigravity.md`

# 2. Key Mobile Engineering Rules
- **TURING-LAW-000 & TURING-DEV-SERVER-BAN-013**: Never run `npx expo start` or long-running development servers in agent sessions.
- **Offline First**: Cache broker leads and inspection records locally with AsyncStorage / SQLite before syncing with Server API.
- **API Communication**: Consume authoritative backend endpoints from `White-Caves-Server` (`/api/v1/mobile/*`).
- **Design System Fidelity**: Match White Caves luxury design language (White Caves Red `#EF4444`, dark palette, clean typography).
- **Dual Format Architecture (`TURING-DUAL-FORMAT-014`)**: Keep agent prompts and guidelines in `.md`; keep app runtime code, components, and types in `.tsx`/`.ts`.
