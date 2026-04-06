# React Job Tracker

Built a simple, client-side React application designed to help job seekers efficiently track their applications, manage, and monitor expected salaries. Built with a focus on responsive data filtering and persistent local storage.

## Key Features

* **CRUD Operations:** Seamlessly add new job entries and remove/delete outdated ones from the dashboard.
* **Persistent Memory:** Utilizes `localStorage` with lazy state initialization to prevent data loss on browser refresh and eliminate race conditions.
* **Advanced Filtering (Derived State):** Features a robust dual-filter system allowing users to search by Company Name (text input) AND filter by Application Status (dropdown) simultaneously, all without mutating the original dataset.
* **Dynamic Stats Dashboard:** Automatically calculates and displays total applications and currently active interview pipelines.
* **Currency Formatting:** Implements the `Intl.NumberFormat` API to dynamically render salaries in standard NGN currency format.
* **Form Validation:** Includes custom inline UI error handling to prevent incomplete or invalid data entries.

## Tech Stack

* **Frontend Engine:** React (Vite)
* **Styling Architecture:** Pure Vanilla CSS (Custom Flexbox layouts)
* **State Management:** React Hooks (`useState`, `useEffect`)
