/**
 * Matthew McGovern - Personal Website
 * Main JavaScript
 */

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav__list');
  
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      navList.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('active');
      });
    });
  }
  
  // Load recent posts on homepage
  loadRecentPosts();
  
  // Load all posts on blog page
  loadBlogPosts();
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Load recent posts for homepage
async function loadRecentPosts() {
  const container = document.getElementById('recent-posts');
  if (!container) return;
  
  try {
    const response = await fetch('/assets/data/posts.json');
    const data = await response.json();
    const recentPosts = data.posts.slice(0, 3);
    
    container.innerHTML = recentPosts.map(post => `
      <div style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--color-border);">
        <h5 style="margin-bottom: 0.25rem;">
          <a href="/${post.slug}/">${post.title}</a>
        </h5>
        <p style="font-size: 0.85rem; color: var(--color-text-muted); margin: 0;">
          ${post.excerpt}
        </p>
        <span style="font-size: 0.8rem; color: var(--color-text-muted);">
          ${formatDate(post.date)}
        </span>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading posts:', error);
    container.innerHTML = '<p class="text-muted">Unable to load posts.</p>';
  }
}

// Load all posts for blog page
async function loadBlogPosts() {
  const container = document.getElementById('posts-grid');
  if (!container) return;
  
  try {
    const response = await fetch('/assets/data/posts.json');
    const data = await response.json();
    
    container.innerHTML = data.posts.map(post => `
      <article class="post-card">
        <div class="post-card__content">
          <h3 class="post-card__title">
            <a href="/${post.slug}/">${post.title}</a>
          </h3>
          <p class="post-card__excerpt">${post.excerpt}</p>
          <div class="post-card__meta">
            <span>${post.author}</span>
            <span>${formatDate(post.date)}</span>
          </div>
          <a href="/${post.slug}/" class="post-card__read-more">Read More →</a>
        </div>
      </article>
    `).join('');
  } catch (error) {
    console.error('Error loading posts:', error);
    container.innerHTML = '<p class="text-muted">Unable to load posts.</p>';
  }
}

// Format date helper
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Code block copy functionality
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('pre code').forEach(block => {
    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.textContent = 'Copy';
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(block.textContent);
        button.textContent = 'Copied!';
        setTimeout(() => button.textContent = 'Copy', 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
    
    const pre = block.parentElement;
    pre.style.position = 'relative';
    button.style.cssText = `
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      background: var(--color-accent);
      color: var(--color-bg-dark);
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `;
    pre.appendChild(button);
  });
});

