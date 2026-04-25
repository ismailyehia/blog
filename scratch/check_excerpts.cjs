const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  excerpt: String,
  slug: String
});

const Post = mongoose.model('Post', postSchema);

async function check() {
  await mongoose.connect('mongodb://esmael12kg_db_user:SndYD6XwGCFqyiKU@ac-rapmlss-shard-00-00.dwxbrp7.mongodb.net:27017,ac-rapmlss-shard-00-01.dwxbrp7.mongodb.net:27017,ac-rapmlss-shard-00-02.dwxbrp7.mongodb.net:27017/dev_tools_blog?ssl=true&replicaSet=atlas-2ws5cd-shard-0&authSource=admin');
  const posts = await Post.find({});
  console.log('--- POSTS EXCERPT CHECK ---');
  posts.forEach(p => {
    console.log(`[${p.slug}] Excerpt length: ${p.excerpt ? p.excerpt.length : 0}`);
    if (!p.excerpt) console.log(`   WARNING: Missing excerpt for ${p.title}`);
  });
  await mongoose.disconnect();
}

check();
