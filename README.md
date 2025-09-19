# Movie Computer Screens Collection

A curated collection of computer interfaces from movies recreated for the web. Built with Nuxt 4, featuring GSAP animations and Swiss Style design principles. Explore iconic movie computer screens, from futuristic HUDs to retro terminals, all faithfully recreated as interactive web experiences.

![Preview](public/media/preview.jpg)

**🌐 Live Demo:** [https://projects.manuelhintermayr.com/movie-os-collection](https://projects.manuelhintermayr.com/movie-os-collection)

**Developed by:** [Manuel Hintermayr](https://github.com/manuelhintermayr)  
**Repository:** [https://github.com/manuelhintermayr/movie-os-collection](https://github.com/manuelhintermayr/movie-os-collection)

## 🎬 About

This project showcases computer interfaces and operating systems featured in movies, recreated as interactive web experiences. From the sleek interfaces of *The Incredibles* to the retro terminals of *Tron*, discover how filmmakers envisioned technology and bring these iconic screens to life in your browser.

**Note:** This is a curated collection of fan-made recreations and open source projects. All movie rights belong to their respective owners. External links are provided for educational purposes.

## 🚀 Features

- 🎬 **Movie OS Collection** - Curated selection of computer interfaces from films
- ⚡️ **Nuxt 4** - Latest version with improved performance and new features
- 🎨 **Swiss Style Design** - Clean, grid-based layout with typography focus
- 🎭 **GSAP Animations** - Smooth entrance animations and interactive effects
- 🐭 **Mouse Follower** - Dynamic cursor effects with custom states
- 🌍 **Internationalization** - Full i18n support (English/German)
- 🌙 **Dark Mode** - Built-in dark/light mode toggle
- 📱 **Responsive Design** - Mobile-first approach with optimized breakpoints
- 🔍 **Search & Filter** - Find projects by title, film, or technology stack
- 🎲 **Shuffle Feature** - Randomize project display
- 📄 **Empty States** - User-friendly no results messaging
- ⬆️ **Back to Top** - Smooth scroll navigation with magnetic effects
- 🔧 **TypeScript** - Full TypeScript support with type safety

![Preview](public/media/preview.gif)

## 🛠️ Technology Stack

### Core Frameworks
- **[Nuxt 4](https://nuxt.com/)** - The Intuitive Vue Framework
- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript Framework

### UI & Styling
- **[Nuxt UI](https://ui.nuxt.com/)** - Fully styled and customizable components
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **Swiss Style Principles** (International Typographic Style) - Grid-based layouts, clarity, and typographic hierarchy

### Animation & Effects
- **[GSAP](https://greensock.com/gsap/)** - Professional-grade animation library
- **[ScrollTrigger](https://greensock.com/scrolltrigger/)** - Scroll-based animation trigger
- **[Mouse Follower](https://github.com/Cuberto/mouse-follower)** - Dynamic cursor effects

### Data & Internationalization
- **[@nuxtjs/i18n](https://i18n.nuxtjs.org/)** - Internationalization module
- **JSON Data Structure** - Centralized project data management
- **Support for:** English (en) and German (de)
- **Lazy loading** - Translation files loaded on demand

### Icons & Assets
- **[@iconify-json/heroicons](https://iconify.design/)** - Heroicons icon collection
- **[@nuxt/icon](https://github.com/nuxt/icon)** - Icon component with 200k+ icons

### Development Tools
- **TypeScript** - Full type safety and IntelliSense
- **VS Code Integration** - Automatic code cleanup and unused import removal
- **Utility Scripts** - i18n management and code quality checks

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/manuelhintermayr/nuxt4-template-swiss-style.git
cd nuxt4-template-swiss-style

# Install dependencies
npm install
# or
pnpm install
# or
yarn install
# or
bun install
```

## 🎮 Collection Highlights

### Featured Movie Interfaces
- **Jurassic Park (1993)** - Iconic park control terminal with Unix filesystem navigation
- **The Incredibles (2004)** - Syndrome's sleek villain command computer interface  
- **TRON: Legacy (2010)** - Futuristic Encom boardroom data visualization dashboard
- **The Matrix (1999)** - Digital rain code terminal with performant shader effects
- **Back to the Future (1985)** - DeLorean time circuits with destination/present/last time display
- **Star Trek (various)** - LCARS interfaces by original designer Michael Okuda
- **2001: A Space Odyssey (1968)** - HAL 9000 control panel recreation
- **Iron Man (2008)** - J.A.R.V.I.S. holographic HUD interface

### Project Data Structure
Each movie computer interface includes:
- **Title** - Interface name
- **Film** - Source movie
- **Description** - Detailed background (English/German)
- **Tech Stack** - Technologies used in recreation
- **Live Demo** - Interactive web version
- **Source Code** - GitHub repository link
- **Screenshots** - Visual previews

## 🚦 Development

Start the development server on `http://localhost:3000`:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
# or
bun run dev
```

### Additional Development Commands

```bash
# Code Quality Checks
npm run check:unused-vars          # Check for unused variables
npm run check:unused-vars-enhanced # Enhanced unused variable analysis
npm run lint:check                 # Run all code quality checks

# i18n Management  
npm run analyze:i18n              # Analyze i18n string usage
npm run cleanup:i18n              # Remove unused i18n strings

# Production Build
npm run build                     # Build for production
npm run preview                   # Preview production build
```

## 🏗️ Project Structure

```
movie-os-collection/
├── app/
│   ├── app.config.ts           # App configuration
│   ├── app.vue                 # Root application component
│   ├── assets/
│   │   ├── css/               # Global styles and CSS files
│   │   └── data/              # Project data and type definitions
│   │       ├── projects.json   # Movie interface collection data
│   │       └── types.ts        # TypeScript interfaces
│   ├── components/             # Reusable Vue components
│   │   ├── MovieCollectionHeader.vue # Header with search and controls
│   │   ├── MovieCollectionHero.vue   # Hero section
│   │   ├── MovieCollectionFooter.vue # Footer with GitHub section
│   │   ├── ProjectCard.vue            # Individual project card
│   │   ├── ProjectGrid.vue            # Grid layout for projects
│   │   ├── NoResultsMessage.vue       # Empty state for search results
│   │   ├── LanguageSwitcher.vue       # Language toggle component
│   │   └── LoadingScreen.vue          # Loading animation at the beginning
│   ├── layouts/
│   │   └── default.vue         # Default layout template
│   ├── pages/
│   │   └── index.vue           # Main collection page
│   └── plugins/
│       └── mouse-follower.client.ts # Mouse cursor effects
├── i18n/
│   ├── i18n.config.ts         # i18n configuration
│   └── locales/               # Translation files
│       ├── en.json            # English translations
│       └── de.json            # German translations
├── scripts/                   # Utility scripts for development
├── public/                    # Static assets and media
├── nuxt.config.ts            # Nuxt configuration
├── package.json              # Dependencies and scripts
└── tsconfig.json             # TypeScript configuration
```

## 🎨 Component Architecture

### Modular Design
All UI elements are extracted into reusable components following Vue.js best practices:

- **Props-based components** - `FeatureCard.vue` accepts title, description, icon, and color props
- **Composable integration** - Uses Nuxt's auto-imported composables like `useI18n`
- **TypeScript interfaces** - Fully typed props and component APIs
- **Scoped styling** - Component-specific styles when needed

### Movie Collection Components

#### Core Collection Components
- **MovieCollectionHeader** - Search interface, language switching, dark mode toggle, and responsive layout
- **MovieCollectionHero** - Main title section with animated GSAP entrance effects  
- **ProjectCard** - Individual movie interface cards with hover effects, localized descriptions, and responsive button layout
- **ProjectGrid** - Responsive grid layout with scroll-triggered reveal animations
- **NoResultsMessage** - User-friendly empty state for search results with clear action

#### Supporting Components
- **LanguageSwitcher** - Seamless language switching with localStorage persistence and compact display
- **MovieCollectionFooter** - GitHub contribution section with social links and disclaimer
- **LoadingScreen** - Animated loading experience with GSAP transitions

#### UI Enhancement Components
- **Back-to-Top Button** - Smooth scroll-to-top with magnetic hover effects and fade transitions
- **Responsive Design Elements** - Mobile-optimized layouts with breakpoint-specific behavior

### Component Features
- **Props-based Architecture** - TypeScript interfaces for type-safe component APIs
- **Mouse Follower Integration** - Custom cursor effects with data attributes
- **GSAP Animation Support** - Scroll-triggered reveals and interactive hover effects
- **Internationalization Ready** - All text content supports English/German translations

## 🛠️ Development Tools

### i18n Management Scripts:
- **`scripts/analyze-i18n-strings.js`** - Analyze translation usage and find unused strings
- **`scripts/cleanup-i18n-strings.js`** - Remove unused translations automatically

### Code Quality Scripts:
- **`scripts/check-unused-vars.js`** - Detect unused variables in TypeScript/Vue files
- **`scripts/check-unused-vars-enhanced.js`** - Enhanced analysis with import tracking

See [`scripts/README.md`](scripts/README.md) for detailed script usage.

## 🚀 Deployment

### Build for Production:
```bash
npm run build
```

### Preview Production Build:
```bash
npm run preview
```

### Deploy to GitHub Pages:
The project is configured for GitHub Pages deployment with:
- **Base URL**: `/movie-os-collection/`
- **Static Generation**: All routes pre-rendered
- **Asset Optimization**: Images and media properly referenced

### Live Demo:
🎬 **[View Collection →](https://projects.manuelhintermayr.com/movie-os-collection/)**

### Repository:
📦 **[GitHub Repository](https://github.com/manuelhintermayr/movie-os-collection)**

## 📚 Documentation & Resources

### Framework Documentation:
- **[Nuxt 4 Documentation](https://nuxt.com/docs/getting-started/introduction)** - Latest Nuxt features and SSR capabilities
- **[Vue 3 Documentation](https://vuejs.org/guide/)** - Vue.js Composition API and reactivity
- **[Nuxt UI Documentation](https://ui.nuxt.com/)** - Component library for modern interfaces

### Animation & Interaction Libraries:
- **[GSAP Documentation](https://greensock.com/docs/)** - Professional animation library
- **[ScrollTrigger Documentation](https://greensock.com/docs/v3/Plugins/ScrollTrigger)** - Scroll-based animations
- **[Mouse Follower Documentation](https://github.com/Cuberto/mouse-follower)** - Smooth cursor effects

### Styling & Internationalization:
- **[Tailwind CSS Documentation](https://tailwindcss.com/docs)** - Utility-first CSS framework
- **[Nuxt i18n Documentation](https://i18n.nuxtjs.org/)** - Multi-language support
- **[TypeScript Documentation](https://www.typescriptlang.org/docs/)** - Type safety and interfaces

## 🤝 Contributing

Contributions to expand the movie interface collection are welcome:

### Adding New Movie Interfaces:
1. Add project data to `app/assets/data/projects.json`
2. Include screenshots in `public/media/`
3. Add localized descriptions for English and German
4. Submit pull request with new interface details

### Code Improvements:
- Fork the repository and create feature branches
- Follow Vue.js and TypeScript best practices
- Test animations and responsive behavior
- Ensure accessibility standards are met

### Feedback & Issues:
- Report bugs via GitHub Issues
- Suggest new movie interfaces to include
- Share ideas for animation improvements
- Request additional language translations

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## ⚖️ Legal Disclaimer

**Trademarks & Copyright:** All movie titles, trademarks, and copyrighted materials belong to their respective rights holders. This collection links to fan recreations and educational demonstrations created by the open source community.

**External Links:** Manuel Hintermayr assumes no responsibility for external links and their content. Opening external links is at your own risk. The operators of the linked pages are solely responsible for their content, accuracy, and availability.

**Fair Use:** This project is created for educational and demonstration purposes under fair use provisions. Projects may be added or removed upon request from rights holders.

**No Warranty:** The collection is provided "as is" without any warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement.

## 💝 Acknowledgments

### Technology Stack:
- **[Nuxt.js](https://nuxt.com/)** - The intuitive Vue framework
- **[Vue.js](https://vuejs.org/)** - Progressive JavaScript framework  
- **[GSAP](https://greensock.com/)** - Professional animation library
- **[Mouse Follower](https://github.com/Cuberto/mouse-follower)** - Smooth cursor effects by Cuberto
- **[Nuxt UI](https://ui.nuxt.com/)** - Beautiful and accessible component library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### Special Thanks:
- **Cinema UI designers** and **developers** who created these iconic interfaces
- **Open source community** for excellent tools and libraries
- **Movie enthusiasts** who appreciate and build great interface design
- **Nuxt Team** for the amazing framework
- **Tailwind Labs** for Tailwind CSS and Headless UI
- **Heroicons** for the beautiful icon set
- **Vue.js Team** for the progressive framework
- **GreenSock** for the incredible [GSAP](https://greensock.com/) animation library
- **Cuberto** for the incredible [Mouse Follower](https://github.com/Cuberto/mouse-follower) library

---

**Happy coding!** 🚀

Built with ❤️ by [Manuel Hintermayr](https://github.com/manuelhintermayr)
