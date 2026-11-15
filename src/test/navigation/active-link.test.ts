import { describe, it, expect } from 'vitest';

// The logic under test (mirrors Header.astro frontmatter):
function getNavState(pathname: string) {
  const isBlog = pathname.startsWith('/blog');
  const isProjects = pathname.startsWith('/projects');
  return {
    isBlog,
    isProjects,
    blogAriaCurrent: isBlog ? 'page' : undefined,
    projectsAriaCurrent: isProjects ? 'page' : undefined,
  };
}

describe('getNavState', () => {
  it('pathname "/blog" → isBlog=true, isProjects=false', () => {
    const state = getNavState('/blog');
    expect(state.isBlog).toBe(true);
    expect(state.isProjects).toBe(false);
  });

  it('pathname "/blog/my-post" → isBlog=true, isProjects=false', () => {
    const state = getNavState('/blog/my-post');
    expect(state.isBlog).toBe(true);
    expect(state.isProjects).toBe(false);
  });

  it('pathname "/projects" → isBlog=false, isProjects=true', () => {
    const state = getNavState('/projects');
    expect(state.isBlog).toBe(false);
    expect(state.isProjects).toBe(true);
  });

  it('pathname "/" → isBlog=false, isProjects=false', () => {
    const state = getNavState('/');
    expect(state.isBlog).toBe(false);
    expect(state.isProjects).toBe(false);
  });

  it('aria-current is "page" when active, undefined when not', () => {
    const blogState = getNavState('/blog');
    expect(blogState.blogAriaCurrent).toBe('page');
    expect(blogState.projectsAriaCurrent).toBeUndefined();

    const projectsState = getNavState('/projects');
    expect(projectsState.projectsAriaCurrent).toBe('page');
    expect(projectsState.blogAriaCurrent).toBeUndefined();

    const homeState = getNavState('/');
    expect(homeState.blogAriaCurrent).toBeUndefined();
    expect(homeState.projectsAriaCurrent).toBeUndefined();
  });
});
