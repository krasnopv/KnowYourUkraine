// Seed script for Know Your Ukraine
// Run with: npx ts-node scripts/seed.ts

const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN || '';

async function createEntry(collection: string, data: object) {
  const res = await fetch(`${STRAPI_URL}/api/${collection}`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({ data }),
  });
  
  if (!res.ok) {
    const error = await res.text();
    console.error(`Failed to create ${collection}:`, error);
    return null;
  }
  
  const result = await res.json() as { data: { id: number } };
  console.log(`✅ Created ${collection}:`, result.data.id);
  return result.data;
}

async function seed() {
  console.log('🌱 Seeding database...\n');

  // Categories
  const categories = [
    { name: 'Культура', slug: 'culture' },
    { name: 'Історія', slug: 'history' },
    { name: 'Традиції', slug: 'traditions' },
    { name: 'Мова', slug: 'language' },
  ];

  console.log('📁 Creating categories...');
  for (const cat of categories) {
    await createEntry('categories', cat);
  }

  // Product Categories
  const productCategories = [
    { name: 'Одяг', slug: 'clothing' },
    { name: 'Аксесуари', slug: 'accessories' },
    { name: 'Сувеніри', slug: 'souvenirs' },
  ];

  console.log('\n📁 Creating product categories...');
  for (const cat of productCategories) {
    await createEntry('product-categories', cat);
  }

  // Authors
  const authors = [
    { name: 'Олена Коваленко', bio: 'Дослідниця української культури та історії' },
    { name: 'Андрій Мельник', bio: 'Журналіст та письменник' },
    { name: 'Марія Шевченко', bio: 'Етнограф та культуролог' },
  ];

  console.log('\n👤 Creating authors...');
  for (const author of authors) {
    await createEntry('authors', author);
  }

  // Partners
  const partners = [
    {
      name: 'Український культурний фонд',
      description: 'Державна установа, що підтримує культурні ініціативи',
      websiteUrl: 'https://ucf.in.ua',
    },
    {
      name: 'Prometheus',
      description: 'Освітня платформа з безкоштовними онлайн-курсами',
      websiteUrl: 'https://prometheus.org.ua',
    },
    {
      name: 'Ukraїner',
      description: 'Медіа-проєкт про унікальність України',
      websiteUrl: 'https://ukrainer.net',
    },
  ];

  console.log('\n🤝 Creating partners...');
  for (const partner of partners) {
    await createEntry('partners', partner);
  }

  // Products
  const products = [
    {
      name: 'Футболка "Тризуб"',
      slug: 'tshirt-tryzub',
      price: 850,
      inStock: true,
      snipcartId: 'tshirt-tryzub',
    },
    {
      name: 'Чашка "Слава Україні"',
      slug: 'mug-slava-ukraini',
      price: 350,
      inStock: true,
      snipcartId: 'mug-slava-ukraini',
    },
    {
      name: 'Худі "Київ"',
      slug: 'hoodie-kyiv',
      price: 1450,
      inStock: true,
      snipcartId: 'hoodie-kyiv',
    },
    {
      name: 'Шопер "Вишиванка"',
      slug: 'tote-vyshyvanka',
      price: 450,
      inStock: false,
      snipcartId: 'tote-vyshyvanka',
    },
  ];

  console.log('\n🛍️ Creating products...');
  for (const product of products) {
    await createEntry('products', product);
  }

  // Blog Posts
  const blogPosts = [
    {
      title: 'Історія української вишиванки',
      slug: 'history-of-vyshyvanka',
      excerpt: 'Вишиванка — це не просто одяг, а символ української ідентичності.',
    },
    {
      title: 'Традиційні українські страви на Різдво',
      slug: 'traditional-christmas-dishes',
      excerpt: 'Дванадцять страв на Святвечір — це давня українська традиція.',
    },
    {
      title: 'Козацька доба: золотий вік України',
      slug: 'cossack-era',
      excerpt: 'Козацтво відіграло ключову роль у формуванні української державності.',
    },
  ];

  console.log('\n📝 Creating blog posts...');
  for (const post of blogPosts) {
    await createEntry('blog-posts', post);
  }

  console.log('\n✨ Seeding complete!');
}

seed().catch(console.error);

