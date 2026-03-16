import { describe, it, expect } from 'vitest';

// The logic under test (mirrors Header.astro frontmatter):
function getNavState(pathname: string) {
  const isHome = pathname === '/' || pathname === '';
  const isAbout = pathname === '/about' || pathname === '/about/';
  const isCV = pathname === '/cv' || pathname === '/cv/';
  return {
    isHome,
    isAbout,
    isCV,
    homeAriaCurrent: isHome ? 'page' : undefined,
    aboutAriaCurrent: isAbout ? 'page' : undefined,
    cvAriaCurrent: isCV ? 'page' : undefined,
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

  it('pathname "/cv" → isCV=true', () => {
    const state = getNavState('/cv');
    expect(state.isHome).toBe(false);
    expect(state.isAbout).toBe(false);
    expect(state.isCV).toBe(true);
  });

  it('pathname "/cv/" (trailing slash) → isCV=true', () => {
    const state = getNavState('/cv/');
    expect(state.isHome).toBe(false);
    expect(state.isAbout).toBe(false);
    expect(state.isCV).toBe(true);
  });

  it('aria-current is "page" when active, undefined when not', () => {
    const homeState = getNavState('/');
    expect(homeState.homeAriaCurrent).toBe('page');
    expect(homeState.aboutAriaCurrent).toBeUndefined();
    expect(homeState.cvAriaCurrent).toBeUndefined();

    const aboutState = getNavState('/about');
    expect(aboutState.aboutAriaCurrent).toBe('page');
    expect(aboutState.homeAriaCurrent).toBeUndefined();
    expect(aboutState.cvAriaCurrent).toBeUndefined();

    const cvState = getNavState('/cv');
    expect(cvState.cvAriaCurrent).toBe('page');
    expect(cvState.homeAriaCurrent).toBeUndefined();
    expect(cvState.aboutAriaCurrent).toBeUndefined();

    const otherState = getNavState('/other');
    expect(otherState.homeAriaCurrent).toBeUndefined();
    expect(otherState.aboutAriaCurrent).toBeUndefined();
    expect(otherState.cvAriaCurrent).toBeUndefined();
  });
});
