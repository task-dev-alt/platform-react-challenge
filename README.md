# Cat Gallery Application

A modern React application for browsing cat breeds and managing favorite cats, built with TypeScript and React Query.

## 🐱 Features

- **Cat Browser**

  - View a grid of cat images with infinite scroll
  - Add/remove cats to favorites
  - View detailed information about each cat

- **Breed Explorer**

  - Search and filter cat breeds
  - View detailed breed characteristics
  - Interactive rating displays for breed attributes
  - Wikipedia links for additional information
  - View cats of specific breeds

- **Favorites Management**
  - Save favorite cats
  - Remove cats from favorites

## Technical Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **Routing**: React Router
- **Components**: Custom component library

## Project Structure

```
src/
├── api/            # API integration layer
├── app/            # Application core setup
├── components/     # Reusable UI components
└── features/       # Feature-based modules
    ├── breeds/     # Breed-related features
    └── cats/       # Cat-related features
```

### Key Components

- `AsyncContainer`: Handles loading and error states
- `Modal`: Reusable modal component with accessibility features
- `Rating`: Visual representation of breed characteristics
- `Collapsible`: Expandable/collapsible section component

### Feature Modules

#### Cats Module

- `Cats.tsx`: Main cat browsing interface
- `CatDetails.tsx`: Detailed cat information view
- `CatGrid.tsx`: Grid layout for cat images
- `FavouriteCats.tsx`: Favorites management

#### Breeds Module

- `Breeds.tsx`: Main breed browsing interface
- `BreedDetails.tsx`: Detailed breed information
- `BreedFilters.tsx`: Filtering interface for breeds

## State Management

- React Query for server state
- Local state for UI interactions
- Infinite scrolling implementation

## API Integration

The application integrates with [The Cat API](https://thecatapi.com/) for:

- Fetching cat images
- Managing favorites
- Retrieving breed information

## Getting Started

1. **Installation**

   ```bash
   npm install
   ```

2. **Development**

   ```bash
   npm run dev
   ```

3. **Build**

   ```bash
   npm run build
   ```

4. **Testing (soon™️)**
   ```bash
   npm test
   ```

## Development Guidelines

### Code Organization

- Feature-based folder structure
- Shared components in `components/`
- Type definitions in feature modules
- Simplicity focused

### State Management Patterns

- Use React Query for server state
- Local state for UI-only state
- proper TypeScript typing

### Component Guidelines

- Functional components with hooks
- Props typing with TypeScript
- Responsive design with Tailwind

### Best Practices

- TypeScript for type safety
- Proper error handling
- Loading state management
- Responsive design

## Performance Considerations

- Infinite scrolling
- Proper caching with React Query
