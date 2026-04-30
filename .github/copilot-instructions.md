This is a fitness tracker app. Consists of frontend and backend folders. Strongly mobile-focused. Frontend is planned to be built with:

- Vite
- Vue, script setup, script before template
- TypeScript
- Tailwind CSS (no custom css if possible, only tailwind classes)
- Workbox for PWA features (the app should be installable and work offline)
- Vant for mobile UI components

The backend will be built with:

- NestJS
- PostgreSQL
- Prisma

Functionality:

- User authentication (sign up, log in, log out). Based on email, no password validation, no email validation, no password recovery for now.
- There is a public exs list. Users to that list. Every ex has a name and id, and optionally a description and a video.
- Users can create workout plans and workouts. A workout plan consists of several workouts. A workout consists of several exs, and for each ex, the user can specify the number of sets, reps, weight and a comment. Number of sets, reps, weight and a comment are referred to as "ex data". All the personal info on workout plans, workouts and ex data is called the user data.
- When user goes to gym, he enters workout mode. In workout mode, user can see the list of exs in the workout. If there is ex data, it is displayed from the start. User can edit the ex data during workout.
- When user wants to CRUD workout plans and workouts, he enters the edit mode.
- When app first loads, it looks to indexedDB for any existing data. If there is data, it is loaded and saved to the local object. If there is no data, an empty object is created.
- When user makes change to the data in the workout mode, only the local data changes. When user presses save in the workout mode or makes changes in the edit mode, first the local data changes, then a POST/PUT/PATCH request is created. This request is added to a queue. When the app is online, the queue is processed and the data is sent to the server. If the request fails, it is retried later as a part of the queue. This way, the app can work offline and sync data when it goes online.
- Each save request is processed by the backend in such a way that the current user data changes and the change is saved to the log database for future statistics.

UI

- Background is white, text is black, logos and btns are dark blue. No dark mode for now.
- Only the mobile layout. On wider screens it just stretches.

An ex might be called ex (exes for plural)
