# Swiss Style CSS Architecture - Nuxt 4 Template

## Overview

This project implements a comprehensive Swiss Style (International Typographic Style) theme with modular CSS architecture, Tailwind v4 compatibility, and extensive UI component support.

## CSS File Structure

### 1. Core Files

#### `main.css`
- **Purpose**: Core variables, base reset, Tailwind overrides
- **Key Features**:
  - Swiss Style variables (`--c-bg`, `--c-fg`, `--border-w`, etc.)
  - Helvetica typography stack
  - Zero border-radius enforcement
  - Tailwind utility overrides for rounded corners and shadows
  - Basic utilities (`.swiss-grid`, `.swiss-section`, `.swiss-kicker`)

### 2. Component-Specific Files

#### `forms.css`
- **Purpose**: Form elements styling
- **Components**: Buttons, inputs, textareas, selects, checkboxes, radio buttons, sliders, switches
- **Features**: Error states, help text, disabled states, focus management

#### `components.css`
- **Purpose**: UI components library
- **Components**: Cards, modals, tabs, tooltips, calendars, alerts, badges, avatars, accordions
- **Features**: 20+ component types with Swiss styling

#### `navigation.css`
- **Purpose**: Navigation and header elements
- **Components**: Navigation bars, breadcrumbs, pagination, menus
- **Features**: Uppercase typography, hover effects, ARIA support

#### `tables.css`
- **Purpose**: Table styling
- **Components**: HTML tables, UTable components
- **Features**: Dense mode, striped variants, responsive design

#### `layout.css`
- **Purpose**: Layout components
- **Components**: Hero sections, welcome sections, utility cards
- **Features**: Responsive typography with clamp(), flexible layouts

#### `mouse-follower.css`
- **Purpose**: Mouse follower custom cursor
- **Features**: Swiss Style cursor adaptations with proper sizing and borders

#### `ui-extensions.css`
- **Purpose**: Component aliases, ARIA fallbacks, enhanced UI support
- **Key Features**:
  - U-prefix aliases for all Nuxt UI components (`.u-button`, `.u-input`, etc.)
  - Comprehensive ARIA role fallbacks
  - Enhanced range/slider support
  - Accessibility improvements (skip links, focus states)
  - Status and state management
  - Mobile-responsive enhancements

### 3. Plugin Files

#### `animations.css`
- **Purpose**: GSAP and CSS animations
- **Features**: Swiss-compatible animation styles

## Key Features Implemented

### 1. Swiss Style Principles
- **Typography**: Helvetica Neue font stack, uppercase headings, precise letter-spacing
- **Color Palette**: Strict black and white (`#000000` / `#ffffff`)
- **Geometry**: Zero border-radius, strong borders (2px), clean lines
- **Grid System**: Optional background grid (`.swiss-grid`)

### 2. Tailwind v4 Compatibility
- **Border Radius Override**: All Tailwind rounded classes forced to `border-radius: 0`
- **Shadow Removal**: All Tailwind shadow classes disabled
- **Typography Integration**: Swiss font stack integrated

### 3. Component Aliases
- **U-Prefix System**: All Nuxt UI components accessible via `.u-*` classes
- **Backward Compatibility**: Works with existing `.ui-*` classes
- **Consistent Styling**: Ensures Swiss Style principles across all aliases

### 4. ARIA & Accessibility
- **Role Fallbacks**: Comprehensive ARIA role styling for tabs, menus, pagination, etc.
- **Focus Management**: Enhanced focus states with proper outline styling
- **Screen Reader Support**: Skip links and proper ARIA attributes
- **High Contrast Support**: Media query support for `prefers-contrast: high`

### 5. Enhanced Form Controls
- **Cross-Browser Sliders**: Custom styling for range inputs across browsers
- **State Management**: Disabled, loading, error, and success states
- **Mobile Optimization**: Touch-friendly sizing and responsive behavior

## Usage Examples

### Basic Components
```vue
<template>
  <!-- Using standard Nuxt UI classes -->
  <UButton class="swiss-invert">Standard Button</UButton>
  
  <!-- Using u-prefix aliases -->
  <button class="u-btn swiss-kicker">Swiss Button</button>
  
  <!-- Using utility classes -->
  <section class="swiss-section swiss-grid">
    <h2 class="swiss-kicker">Section Title</h2>
  </section>
</template>
```

### ARIA Components
```vue
<template>
  <!-- Tabs with ARIA support -->
  <div role="tablist">
    <button role="tab" aria-selected="true">Tab 1</button>
    <button role="tab" aria-selected="false">Tab 2</button>
  </div>
  
  <!-- Pagination with ARIA -->
  <nav aria-label="Pagination">
    <a href="/page/1">1</a>
    <a href="/page/2" aria-current="page">2</a>
    <a href="/page/3">3</a>
  </nav>
</template>
```

### Form Controls
```vue
<template>
  <!-- Enhanced form controls -->
  <input type="range" min="0" max="100" class="swiss-slider" />
  <button class="u-button" aria-disabled="true">Disabled Button</button>
  <div role="status" class="ui-notification">Status Update</div>
</template>
```

## Load Order

The CSS files are loaded in this specific order (defined in `nuxt.config.ts`):

1. `mouse-follower/dist/mouse-follower.min.css` (External)
2. `main.css` (Core variables and base)
3. `forms.css` (Form components)
4. `components.css` (UI components)
5. `navigation.css` (Navigation elements)
6. `tables.css` (Table styling)
7. `layout.css` (Layout components)
8. `mouse-follower.css` (Custom cursor)
9. `ui-extensions.css` (Aliases and ARIA fallbacks)
10. `animations.css` (Animations)

## Browser Support

- **Modern Browsers**: Full support (Chrome 90+, Firefox 88+, Safari 14+)
- **Cross-Browser Sliders**: Custom styling for WebKit and Firefox
- **Accessibility**: ARIA roles and keyboard navigation support
- **Mobile**: Touch-friendly interactions and responsive design

## Development Notes

- All border-radius is enforced to `0` via `!important`
- Shadows are completely disabled for pure Swiss aesthetic
- Font-smoothing is enabled for crisp typography
- CSS Grid and Flexbox used for layouts
- No JavaScript dependencies for core styling (except mouse-follower plugin)

## Customization

To customize the Swiss Style theme:

1. **Colors**: Modify `--c-bg` and `--c-fg` in `:root`
2. **Typography**: Update `--font-sans` variable
3. **Borders**: Adjust `--border-w` and `--border-w-thin`
4. **Spacing**: Modify the `--rhythm-*` scale
5. **Mouse Follower**: Update `--mf-size` for cursor sizing
