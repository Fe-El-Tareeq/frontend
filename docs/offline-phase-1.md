# Offline Phase 1

Phase 1 provides a revisioned application shell and read-only access to selected data that an authenticated user previously fetched online. It does not queue or simulate successful writes.

## Storage layers

- Workbox precaches the production HTML, generated JavaScript chunks, CSS, icons, fonts, and other startup assets. Navigation falls back to the precached `index.html`. Authenticated API responses are never stored in Cache Storage.
- TanStack Query remains the in-memory data owner while the app is running.
- IndexedDB database `bitareeqak-offline`, schema version 1, contains `resource_cache` and `sync_meta`. Future versions can add mutation, chat-message, and media stores without changing the existing records.
- Each private record is namespaced by user ID and normalized API origin. Storage errors degrade to online-only behavior.

## Persisted resources

| Resource | TTL | Offline caution |
| --- | ---: | --- |
| Profile | 24 hours | Display only |
| Errands and trips | 15 minutes | May contain outdated status |
| Assignments | 5 minutes | No offline transitions |
| Chat rooms/history | 24 hours | New messages require reconnect |
| Notifications | 30 minutes | Count and read state are non-authoritative |
| Locations and support configuration | 7 days | Refresh after reconnect |

Wallet, payments, OTP/auth forms, matching results, credentials, and mutation data are excluded. Wallet operations and assignment transitions require confirmed connectivity.

## Lifecycle

After auth-state hydration, allowed unexpired records for the current namespace hydrate TanStack Query. Successful online query updates are persisted with cache, sync, schema, and expiry timestamps. Browser online/offline events are combined with a lightweight backend health probe. Reconnection refreshes active stale allowlisted queries sequentially to avoid a request storm.

Logout clears the in-memory query cache through the auth hook and purges the current user's IndexedDB namespace plus legacy notification, chat, and voice localStorage entries. A different user cannot hydrate the previous user's records.

Network failure during token refresh preserves the local session; only a server-confirmed `400`, `401`, or `403` clears it. Cached private data remains sensitive on a shared device and is not a substitute for server authorization.

## Manual PWA test

1. Build and serve the production output.
2. Open online, authenticate, and visit supported screens.
3. Confirm the service worker controls the page and IndexedDB contains namespaced records.
4. Install or reload the PWA, disable the network, close it, and reopen it.
5. Verify the shell and cached reads load with offline/stale indicators and online-only actions disabled.
6. Restore connectivity and verify active stale resources refresh gradually.
7. Logout, disable the network, and verify the prior user's private cache is unavailable.
8. In a fresh browser profile that has never loaded the app online, open while offline and verify the browser fails normally without invented data.

## Deliberately deferred

Phase 2 may add a persistent mutation queue and pending-state UX. Offline creation, chat sending, media uploads, notification read mutations, background sync, proposal/assignment transitions, matching decisions, wallet mutations, and payments are not part of Phase 1.
