import { describe, it, expect } from 'vitest';

// The logic under test (mirrors Header.astro frontmatter):
function getNavState(pathname: string) {
  const isHome = pathname === '/' || pathname === '';
  const isAbout = pathname === '/about' || pathname === '/about/';
  return {
    isHome,
    isAbout,
    homeAriaCurrent: isHome ? 'page' : undefined,
    aboutAriaCurrent: isAbout ? 'page' : undefined,
  };
}

describe('getNavState', () => {
  it('pathname "/" → isHome=true, isAbout=false', () => {
    const state = getNavState('/');
    expect(state.isHome).toBe(true);
    expect(state.isAbout).toBe(false);
  });

  it('pathname "/about" → isHome=false, isAbout=true', () => {
    const state = getNavState('/about');
    expect(state.isHome).toBe(false);
    expect(state.isAbout).toBe(true);
  });

  it('pathname "/about/" (trailing slash) → isHome=false, isAbout=true', () => {
    const state = getNavState('/about/');
    expect(state.isHome).toBe(false);
    expect(state.isAbout).toBe(true);
  });

  it('pathname "" (empty string) → isHome=true, isAbout=false', () => {
    const state = getNavState('');
    expect(state.isHome).toBe(true);
    expect(state.isAbout).toBe(false);
  });

  it('pathname "/other" → isHome=false, isAbout=false', () => {
    const state = getNavState('/other');
    expect(state.isHome).toBe(false);
    expect(state.isAbout).toBe(false);
  });

  it('aria-current is "page" when active, undefined when not', () => {
    const homeState = getNavState('/');
    expect(homeState.homeAriaCurrent).toBe('page');
    expect(homeState.aboutAriaCurrent).toBeUndefined();

    const aboutState = getNavState('/about');
    expect(aboutState.aboutAriaCurrent).toBe('page');
    expect(aboutState.homeAriaCurrent).toBeUndefined();

    const otherState = getNavState('/other');
    expect(otherState.homeAriaCurrent).toBeUndefined();
    expect(otherState.aboutAriaCurrent).toBeUndefined();
  });
});
