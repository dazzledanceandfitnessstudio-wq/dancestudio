// app/sitemap.js
import { postService } from '../lib/firebaseService';

// Helper to format date for sitemap
function formatDate(date) {
  if (!date) return new Date().toISOString().split('T')[0];
  const d = date.toDate ? date.toDate() : new Date(date);
  return d.toISOString().split('T')[0];
}

// Helper to create SEO-friendly slug from title
function createSlug(title) {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')  // Replace special chars with hyphens
    .replace(/^-+|-+$/g, '');      // Remove leading/trailing hyphens
}

export default async function sitemap() {
  // Base URL
  const baseUrl = 'https://dazzlestudios.in';

  // ─── Static Pages ───
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kathak`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/registration`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/developed-by-softmax`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // ─── Dynamic Posts from Firebase ───
  let postPages = [];
  
  try {
    // Fetch ALL posts from Firebase
    const posts = await postService.getAllPosts();
    
    if (posts && posts.length > 0) {
      // Map each post to sitemap entry
      postPages = posts.map((post) => {
        const slug = createSlug(post.title);
        const postId = post.id;
        
        // Determine last modified date
        let lastMod = new Date();
        if (post.updatedAt) {
          lastMod = post.updatedAt.toDate ? post.updatedAt.toDate() : new Date(post.updatedAt);
        } else if (post.createdAt) {
          lastMod = post.createdAt.toDate ? post.createdAt.toDate() : new Date(post.createdAt);
        }
        
        return {
          url: `${baseUrl}/post/${slug}-${postId}`,
          lastModified: lastMod,
          changeFrequency: 'weekly',
          priority: 0.7,
        };
      });
      
      console.log(`✅ Sitemap generated with ${postPages.length} posts`);
    } else {
      console.log('⚠️ No posts found in Firebase');
      // Fallback if no posts
      postPages = [
        {
          url: `${baseUrl}/post/studio-news-update-JuCWyz2RCApFwiBn7Ji3`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        },
        {
          url: `${baseUrl}/post/dance-workshop-announcement-CBv28EVk96NsvkFRbVgm`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        },
      ];
    }
  } catch (error) {
    console.error('❌ Error fetching posts for sitemap:', error);
    // Fallback posts if Firebase fails
    postPages = [
      {
        url: `${baseUrl}/post/studio-news-update-JuCWyz2RCApFwiBn7Ji3`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/post/dance-workshop-announcement-CBv28EVk96NsvkFRbVgm`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
    ];
  }

  // ─── Combine Static + Dynamic ───
  const allPages = [...staticPages, ...postPages];
  
  console.log(`📊 Total sitemap entries: ${allPages.length} (${staticPages.length} static + ${postPages.length} posts)`);
  
  return allPages;
}