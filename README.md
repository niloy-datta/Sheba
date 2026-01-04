<<<<<<< HEAD
# Sheba
=======
# Sheba Media - React Media Website

A beautiful, modern media website built with React.js featuring video and image galleries.

## Features

- 🎥 Video gallery with playable videos
- 🖼️ Image gallery with hover effects
- 🎨 Modern, responsive UI design
- 🔍 Category filtering (All, Nature, Urban)
- 📱 Mobile-friendly responsive design
- ⚡ Fast performance with Vite

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
sheba/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── MediaGallery.jsx
│   │   └── VideoPlayer.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

## Technologies Used

- React 18
- Vite
- React Router DOM
- CSS3 (with modern features)

## Customization

You can customize the media content by editing the data arrays in `src/components/MediaGallery.jsx`:

- Update the `videos` array to add/remove videos
- Update the `images` array to add/remove images
- Modify categories and filters as needed

## License

MIT
>>>>>>> bce6be4 (Backup: Project state with TypeScript conversion in progress)
