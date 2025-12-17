import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// Load .env file
dotenv.config({ path: path.join(process.cwd(), '.env') });

const { Client } = pg;

async function checkDatabase() {
  const client = new Client({
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
  });

  try {
    await client.connect();
    console.log('✅ Connected to database\n');

    // Check admin users
    console.log('📋 Admin Users:');
    const adminUsers = await client.query('SELECT id, email, username, firstname, lastname, is_active FROM admin_users');
    console.log(`Found ${adminUsers.rows.length} admin user(s):`);
    adminUsers.rows.forEach((user, i) => {
      console.log(`  ${i + 1}. ${user.email} (${user.username || 'N/A'}) - ${user.firstname} ${user.lastname} - Active: ${user.is_active}`);
    });
    console.log('');

    // Check admin roles
    console.log('📋 Admin Roles:');
    const adminRoles = await client.query('SELECT id, name, code FROM admin_roles');
    console.log(`Found ${adminRoles.rows.length} admin role(s):`);
    adminRoles.rows.forEach((role, i) => {
      console.log(`  ${i + 1}. ${role.name} (${role.code})`);
    });
    console.log('');

    // Check admin user-role links
    console.log('📋 Admin User-Role Links:');
    const adminLinks = await client.query(`
      SELECT au.email, ar.name as role_name
      FROM admin_users au
      LEFT JOIN admin_users_roles_lnk aurl ON au.id = aurl.user_id
      LEFT JOIN admin_roles ar ON aurl.role_id = ar.id
    `);
    adminLinks.rows.forEach((link, i) => {
      console.log(`  ${i + 1}. ${link.email} → ${link.role_name || 'No role'}`);
    });
    console.log('');

    // Check up_users (regular users)
    console.log('📋 Regular Users (up_users):');
    const upUsers = await client.query('SELECT id, email, username FROM up_users LIMIT 10');
    console.log(`Found ${upUsers.rows.length} regular user(s):`);
    upUsers.rows.forEach((user, i) => {
      console.log(`  ${i + 1}. ${user.email} (${user.username || 'N/A'})`);
    });
    console.log('');

    // Check up_roles
    console.log('📋 Regular Roles (up_roles):');
    const upRoles = await client.query('SELECT id, name, type FROM up_roles');
    console.log(`Found ${upRoles.rows.length} role(s):`);
    upRoles.rows.forEach((role, i) => {
      console.log(`  ${i + 1}. ${role.name} (${role.type})`);
    });
    console.log('');

    // Check content types
    console.log('📋 Content Types:');
    const contentTypes = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name NOT LIKE 'admin_%' 
      AND table_name NOT LIKE 'up_%'
      AND table_name NOT LIKE 'strapi_%'
      AND table_name NOT LIKE 'core_%'
      ORDER BY table_name
    `);
    console.log(`Found ${contentTypes.rows.length} content type table(s):`);
    contentTypes.rows.forEach((ct, i) => {
      console.log(`  ${i + 1}. ${ct.table_name}`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.end();
  }
}

checkDatabase();
