# color-swatches

created with
```sh
npm create vue@latest
```

Use Node.js version 20 or later.

Structure: 
- App.vue - Main Vue component that renders the header and grid.
- SwatchGrid.vue - A component that displays a grid of color swatches.
- Swatch.vue - A component that represents a single color swatch.
- Slider.vue - Reusable slider component for adjusting color values.

UX:
- Sliders allow users to select saturation and lightness.
- Loading state is displayed as opacity 0.5 when the app is fetching data.
- Limited app width to 1200px for better readability.
- Ensured that the app is responsive and works well on mobile devices.

Accessibility:
- Input elements have labels for screen readers.
- Keyboard navigation is supported for sliders.

Performance:
- getColorSwatchesOptimized can use binary search if API will have colors sorted by name.
- getColorSwatchesOptimized can use caching to avoid repeated API calls for the same color swatch.
- Initial data for default values s=100 and l=50 is precached to improve performance on first load.
- Added debounce to the slider input to reduce the number of API calls when adjusting color values.
- Allowed to abort API calls if the user is adjusting the slider when long fetching is in progress.

Dev Experience:
- Created a reusable Slider component to handle discrete values input.
- Used Vue 3 with Composition API for modern development practices.


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```
