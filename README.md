# Music Search App

A music search app that allows users to query for music using the Discogs API. The app displays search results, and when an item is clicked, it redirects the user to a detailed page showing track listings and additional information.

## Technologies Used

- **[Next.js](https://nextjs.org) 15**
- **React 19**
- **TypeScript**
- **Discogs API** - API to access Discogs music data
- **React Hook Form** - A library for managing form state and validation
- **Zod** - A TypeScript-first schema declaration and validation library
- **Shadcn UI** - Component library for building UI with Tailwind CSS
- **Tailwind CSS** - Utility-first CSS framework

## Features

- **Search**: Search for music by artist, album, genre, year, track, format, etc.
- **Results Display**: View a list of search results.
- **Detailed Release View**: Click on an item to view more details, including track listings.
- **Pagination**: Navigate through multiple pages of results.
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS.

## Requirements

- **Discogs Developer Account**: You need to register for a developer account at [Discogs Developers](https://www.discogs.com/developers) to obtain your API key and secret.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/runhannah/music-search-app.git
   cd music-search-app
   npm install

   ```

2. Provide .env variables

   ```bash
   DISCOGS_API_KEY=your_api_key_here
   DISCOGS_API_SECRET=your_api_secret_here

   ```

3. Start the app

   ```bash
   npm run dev

   ```

4. Open http://localhost:3000
