export async function getColorSwatches(s, l, signal) {
  const swatches = [];
  const seenNames = new Set();
  for (let h = 0; h < 360; h++) {
    const url = `https://www.thecolorapi.com/id?hsl=${h},${s}%,${l}%`;
    const resp = await fetch(url, { signal });
    const data = await resp.json();
    const name = data.name.value;
    
    if (!seenNames.has(name)) {
      swatches.push({
        h,
        name,
        rgb: data.rgb.value,
        hex: data.hex.value,
        background: `hsl(${h},${s}%,${l}%)`
      });
      seenNames.add(name);
    }
  }
  return swatches;
}

export function getColorSwatchesOptimized(s, l, enableBinarySearch = false) {
  /** Added optimization:
   *   - binary search to find the end of a region with the same name (pass `enableBinarySearch`
   *   as true if API supports it)
   *   - caching of API responses to avoid redundant requests
   *   - explicit uniqueness check for color names
   *   - abort controller to handle long-running requests
   */
  const swatches = [];
  const seenNames = new Set();
  const cache = new Map();
  
  const controller = new AbortController();
  const signal = controller.signal;
  
  async function fetchColor(hue) {
    if (cache.has(hue)) return cache.get(hue);
    const url = `https://www.thecolorapi.com/id?hsl=${hue},${s}%,${l}%`;
    const resp = await fetch(url, { signal });
    const data = await resp.json();
    cache.set(hue, data);
    return data;
  }
  
  async function search() {
    if(!enableBinarySearch) {
      return getColorSwatches(s, l, signal);
    } else {
      let h = 0;
      while (h < 360) {
        const data = await fetchColor(h);
        const name = data.name.value;
        
        if (!seenNames.has(name)) {
          swatches.push({
            h,
            name,
            rgb: data.rgb.value,
            hex: data.hex.value,
            background: `hsl(${h},${s}%,${l}%)`,
          });
          seenNames.add(name);
        }
        
        let left = h + 1;
        let right = 360;
        let lastSame = h;
        
        while (left < right) {
          const mid = Math.floor((left + right) / 2);
          const midData = await fetchColor(mid);
          const midName = midData.name.value;
          
          if (midName === name) {
            lastSame = mid;
            left = mid + 1;
          } else {
            right = mid;
          }
        }
        
        h = lastSame + 1;
      }
    }
    return swatches;
  }
  
  return {
    search,
    abort: (reason) => controller.abort(reason),
  };
}