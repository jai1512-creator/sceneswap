import { Scene } from '../types/scene';

export function getShareUrl(scene: Scene): string {
  const url = new URL(window.location.origin + window.location.pathname);
  if (scene.isRemix && scene.remixParents) {
    url.searchParams.set('remix', `${scene.remixParents[0]}+${scene.remixParents[1]}`);
  } else if (scene.isCustom) {
    url.searchParams.set('custom', `${scene.mood},${scene.era},${scene.environmentType},${scene.lightingType}`);
  } else {
    url.searchParams.set('scene', scene.id);
  }
  return url.toString();
}

export async function shareScene(scene: Scene): Promise<{ shared: boolean; copied: boolean }> {
  const shareUrl = getShareUrl(scene);
  const shareData = {
    title: `SceneSwap — ${scene.title}`,
    text: `Explore the aesthetic of "${scene.title}": ${scene.tagline}`,
    url: shareUrl,
  };

  if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      return { shared: true, copied: false };
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return { shared: false, copied: false };
      }
      // fall through to clipboard copy
    }
  }

  // Graceful fallback to clipboard
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(shareUrl);
      return { shared: false, copied: true };
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
      return { shared: false, copied: true };
    }
  } catch {
    return { shared: false, copied: false };
  }
}
