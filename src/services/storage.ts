import { Scene } from '../types/scene';

const STORAGE_VERSION = 'v2';
const FAVORITES_KEY = `sceneswap_favorites_${STORAGE_VERSION}`;
const SAVED_REMIXES_KEY = `sceneswap_saved_remixes_${STORAGE_VERSION}`;
const CUSTOM_SCENES_KEY = `sceneswap_custom_scenes_${STORAGE_VERSION}`;

/**
 * Automatically purge stale legacy v1 test keys from localStorage
 * so that returning testers and new visitors always get a 100% fresh experience.
 */
function purgeLegacyTestData(): void {
  try {
    if (typeof localStorage === 'undefined') return;

    const legacyKeys = [
      'sceneswap_favorites_v1',
      'sceneswap_saved_remixes_v1',
      'sceneswap_custom_scenes_v1',
      'sceneswap_history_v1',
      'sceneswap_edits_v1',
    ];

    legacyKeys.forEach((k) => {
      if (localStorage.getItem(k) !== null) {
        localStorage.removeItem(k);
      }
    });
  } catch (e) {
    // Ignore in restricted environments
  }
}

// Execute purge immediately on module load
purgeLegacyTestData();

export function getStoredFavorites(): Scene[] {
  try {
    if (typeof localStorage === 'undefined') return [];
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load favorites from localStorage', e);
    return [];
  }
}

export function saveStoredFavorites(favs: Scene[]): void {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
    window.dispatchEvent(new Event('sceneswap_storage_changed'));
  } catch (e) {
    console.error('Failed to save favorites to localStorage', e);
  }
}

export function isSceneFavorited(id: string): boolean {
  const favs = getStoredFavorites();
  return favs.some(s => s.id === id);
}

export function toggleSceneFavorite(scene: Scene): boolean {
  const favs = getStoredFavorites();
  const exists = favs.some(s => s.id === scene.id);
  let updated: Scene[];
  let isFavNow = false;

  if (exists) {
    updated = favs.filter(s => s.id !== scene.id);
    isFavNow = false;
  } else {
    updated = [scene, ...favs];
    isFavNow = true;
  }
  saveStoredFavorites(updated);
  return isFavNow;
}

export function getSavedRemixes(): Scene[] {
  try {
    if (typeof localStorage === 'undefined') return [];
    const raw = localStorage.getItem(SAVED_REMIXES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveRemixToStorage(scene: Scene): void {
  try {
    if (typeof localStorage === 'undefined') return;
    const existing = getSavedRemixes();
    if (!existing.some(s => s.id === scene.id)) {
      const updated = [scene, ...existing];
      localStorage.setItem(SAVED_REMIXES_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('sceneswap_storage_changed'));
    }
  } catch (e) {
    console.error('Failed to save remix', e);
  }
}

export function getSavedCustomScenes(): Scene[] {
  try {
    if (typeof localStorage === 'undefined') return [];
    const raw = localStorage.getItem(CUSTOM_SCENES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomSceneToStorage(scene: Scene): void {
  try {
    if (typeof localStorage === 'undefined') return;
    const existing = getSavedCustomScenes();
    if (!existing.some(s => s.id === scene.id)) {
      const updated = [scene, ...existing];
      localStorage.setItem(CUSTOM_SCENES_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('sceneswap_storage_changed'));
    }
  } catch (e) {
    console.error('Failed to save custom scene', e);
  }
}

/**
 * Resets the entire site back to its factory clean state with zero user edits,
 * zero saved remixes, and zero favorites.
 */
export function clearAllUserData(): void {
  try {
    if (typeof localStorage === 'undefined') return;

    localStorage.removeItem(FAVORITES_KEY);
    localStorage.removeItem(SAVED_REMIXES_KEY);
    localStorage.removeItem(CUSTOM_SCENES_KEY);

    // Also remove any remaining sceneswap-prefixed keys
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('sceneswap_')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));

    window.dispatchEvent(new Event('sceneswap_storage_changed'));
  } catch (e) {
    console.error('Failed to clear user data', e);
  }
}

export function hasUserEdits(): boolean {
  const favs = getStoredFavorites();
  const remixes = getSavedRemixes();
  const custom = getSavedCustomScenes();
  return favs.length > 0 || remixes.length > 0 || custom.length > 0;
}
