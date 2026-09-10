# Frontend Test Audit

This audit reflects the CI/CD baseline introduced on `chore/frontend-ci-cd`.
Normal unit and component tests use Vitest, Testing Library, jsdom, and MSW.
They must not call the live Render staging backend.

Current coverage baseline:

| Metric | Baseline |
| --- | ---: |
| Statements | 32.03% |
| Branches | 27.16% |
| Functions | 24.76% |
| Lines | 32.78% |

No coverage thresholds are enforced yet because broad page/component coverage is
still uneven. Raising thresholds should happen after the remaining critical
flows below are covered.

| Module | Critical scenarios | Covered | Missing | Test files |
| --- | --- | --- | --- | --- |
| App bootstrap | Providers, router shell, service worker registration | Partial: route guard tests and PWA manifest tests | Full `App` bootstrap and production service worker registration | `src/test/routes.test.tsx`, `src/test/pwa.test.ts` |
| Routing | Protected/public-only route behavior | Unauthenticated rejection and authenticated public-route redirect | Full route map smoke test for every protected page | `src/test/routes.test.tsx` |
| Auth/login | Validation, valid login, loading, invalid/unverified errors, navigation | Covered at form boundary | Token persistence is covered through hook/client tests, not full page integration | `src/test/auth-forms.test.tsx`, `src/test/api-client.test.ts` |
| Registration | Required fields, step transition, neighborhood selection, success, server validation, OTP transition | Covered at form boundary | Strong password mismatch between step 1 and backend schema remains a product gap | `src/test/auth-forms.test.tsx` |
| OTP | Invalid OTP, valid verify, resend disabled/enabled, error handling, navigation | Covered | Countdown visual edge cases beyond timer expiry | `src/test/auth-forms.test.tsx` |
| Forgot/reset password | Request reset, validation, success/failure, reset rules | Covered | Delayed navigation after forgot-password success is not asserted to avoid timer flake | `src/test/auth-forms.test.tsx` |
| Profile | Display smoke coverage | Partial | Edit save success/failure, image remove, upload validation, profile API failure | `src/test/e2e-flows.test.tsx` |
| Locations | Loading, success, empty, error | Covered through hook tests | Page-specific neighborhood empty copy | `src/test/domain-hooks.test.tsx` |
| Wallet | Balance, loading, empty transactions, transaction error | Covered through hook and smoke tests | Transaction pagination UI interactions | `src/test/domain-hooks.test.tsx`, `src/test/wallet.test.ts`, `src/test/e2e-flows.test.tsx` |
| Errands | List, create success, insufficient token failure, update, cancel | Covered through hook/schema tests | Full create form, detail page, cancel confirmation UI, voice upload path | `src/test/domain-hooks.test.tsx`, `src/test/errands.test.ts`, `src/test/e2e-flows.test.tsx` |
| Trips | List, create, update, cancel, pricing quote | Covered through hook/schema tests | Full create-trip page validation and detail state rendering | `src/test/domain-hooks.test.tsx`, `src/test/trips.test.ts`, `src/test/e2e-flows.test.tsx` |
| Matching | Result, no-result, ranking score, loading, error | Covered through hook tests | Full MatchFeed selection/navigation behavior | `src/test/domain-hooks.test.tsx` |
| Assignments | Accept, conflict, pickup, start delivery, complete, cancel, unauthorized | Covered through hook tests | Page-level state transition UX and role-specific authorization copy | `src/test/domain-hooks.test.tsx` |
| Chat | Text send, voice metadata send, message list, read state, blocked-send failure | Covered through hook tests | IMAGE messages are not implemented; image size/MIME tests missing. Voice max 30 sec/500 KB and MIME validation are not implemented. Retry/dedup delta sync UI is not fully implemented. | `src/test/domain-hooks.test.tsx` |
| Ratings/trust | Submit rating and duplicate server failure | Partial | Full validation UI, disabled duplicate state, badge rendering | `src/test/domain-hooks.test.tsx` |
| Payments | Package list, create invoice, mock success/failure without provider credentials | Covered through hook and smoke tests | Invoice detail polling/expired state UI | `src/test/domain-hooks.test.tsx`, `src/test/wallet.test.ts`, `src/test/e2e-flows.test.tsx` |
| Notifications | Unread count/filter, mark all read | Partial | Mark one read, loading/error states from remote notification API if added later | `src/test/notifications.test.tsx` |
| PWA/offline | Manifest install properties and shortcuts | Partial | Service worker cache strategy, offline navigation fallback, retry/idempotency behavior | `src/test/pwa.test.ts` |
| Localization | Backend error/success translation and API error extraction | Covered | UI language switch behavior if added later | `src/test/i18n.test.ts` |
| Accessibility | Critical forms expose visible labels and submit via real form controls | Partial | Automated axe checks, label `htmlFor` associations, keyboard traversal coverage | `src/test/auth-forms.test.tsx` |
| Responsive/mobile | Mobile-first page smoke coverage | Partial | No pixel/layout E2E; only behavior that changes functionally should be added to component tests | `src/test/e2e-flows.test.tsx` |
| API mocking | Loading/success/error/empty with deterministic mocks | Covered through MSW and mocked API modules | Shared MSW handler catalog can be expanded as pages move from hook tests to integration tests | `src/test/msw/server.ts`, `src/test/api-client.test.ts`, `src/test/domain-hooks.test.tsx` |

## Future E2E

No Playwright or Cypress suite is included yet. Add browser E2E only after stable
test data/mocks exist. Recommended future flows:

1. Register -> OTP -> Login -> Profile -> Wallet -> Create Errand.
2. Traveler Login -> Create Trip -> Matching -> Accept Assignment -> Chat -> Complete.

E2E tests should not rely on mutable staging data.
