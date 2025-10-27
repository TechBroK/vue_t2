# TicketFlow (Vue)

This is a Vue 3 + Vite port of the TicketFlow demo app. It's client-only, uses Pinia for state, and persists tickets/auth to localStorage for demo purposes.

Quick start

```powershell
cd C:\Users\HomePC\Development\vue_t2
npm install
npm run dev
```

Build and deploy (GitHub Pages)

```powershell
npm run build
npm run deploy
```

Keys & storage

- Tickets localStorage key: `tf:tickets:v1`
- Auth session key: `ticketapp_session`
- Auth user key: `ticketapp_user`

Validation rules

- Title and status are required.
- Status must be one of `open`, `in_progress`, `closed`.
- Description max length 1000.
- Priority: Low / Medium / High.

Project structure

- src/main.js - app bootstrap
- src/router - vue-router setup
- src/stores - Pinia stores
- src/components - Header, Footer, NotificationToasts, TicketForm, TicketList, TicketItem
- src/pages - Landing, Auth (login/signup), Dashboard, TicketPage, NotFound

Notes

This is a demo app: do NOT use localStorage for real authentication in production.

Test user (quick):

- Email: test@example.com
- Password: password

If you prefer, create an account via Sign up and then log in.

Accessibility & notes:
- Header and mobile nav include aria attributes and keyboard focus styles.
- Toasts use aria-live for screen-reader announcements.
