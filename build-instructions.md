
# Build Instructions for MediCare Companion

## Creating a Production Build

To create a production-ready build of the MediCare Companion application:

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Build the application**:
   ```bash
   npm run build
   ```

3. **The built files will be in the `dist` folder**, which contains:
   - `index.html` - Main HTML file
   - `assets/` - CSS, JavaScript, and other assets
   - Static files ready for deployment

## Creating a Downloadable Package

To create a downloadable ZIP file of the complete project:

### Option 1: Using Git (Recommended)
```bash
git archive --format=zip --output=medicare-companion.zip HEAD
```

### Option 2: Manual ZIP Creation
1. Create a new folder called `medicare-companion`
2. Copy all project files except:
   - `node_modules/`
   - `dist/`
   - `.git/`
   - Any cache files
3. Compress the folder into a ZIP file

### Option 3: Include Built Files
1. Run `npm run build`
2. Create a folder called `medicare-companion-complete`
3. Copy all source files AND the `dist` folder
4. Include a deployment guide
5. Compress into ZIP

## Deployment Options

### 1. Static File Hosting
- Upload the contents of `dist/` to any web server
- Works with: Netlify, Vercel, GitHub Pages, AWS S3, etc.

### 2. Local Development Server
- Run `npm run dev` for development
- Run `npm run preview` to preview the production build locally

## Project Structure for Distribution

```
medicare-companion/
├── src/                 # Source code
├── public/             # Static assets
├── dist/               # Built files (after npm run build)
├── package.json        # Dependencies and scripts
├── README.md          # Documentation
├── index.html         # Main HTML template
├── tailwind.config.ts # Tailwind configuration
├── vite.config.ts     # Vite configuration
└── build-instructions.md # This file
```

## Environment Requirements

- **Node.js**: v18 or higher
- **npm**: v8 or higher
- **Browser**: Modern browsers with ES6+ support

## Quick Start for End Users

1. Extract the ZIP file
2. Open terminal/command prompt in the project folder
3. Run: `npm install`
4. Run: `npm run dev`
5. Open browser to `http://localhost:8080`

## Production Deployment

The built application is a Single Page Application (SPA) that requires:
- Web server capable of serving static files
- URL rewriting to handle client-side routing (redirect all routes to index.html)
- HTTPS recommended for production use

## File Size Information

- **Source code**: ~2-3 MB (including node_modules)
- **Built application**: ~500-800 KB (minified and compressed)
- **ZIP package**: ~50-100 KB (source only, excluding node_modules)
