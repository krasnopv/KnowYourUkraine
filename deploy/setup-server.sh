#!/bin/bash
# Server setup script for Know Your Ukraine
# Run on a fresh Ubuntu 22.04+ server

set -e

echo "🇺🇦 Setting up Know Your Ukraine server..."

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install Nginx
sudo apt install -y nginx

# Install Certbot for SSL
sudo apt install -y certbot python3-certbot-nginx

# Install PM2
sudo npm install -g pm2

# Create app directory
sudo mkdir -p /var/www/knowYourUkraine
sudo chown $USER:$USER /var/www/knowYourUkraine

# Clone repository (replace with your repo URL)
echo "📦 Cloning repository..."
cd /var/www
git clone https://github.com/YOUR_USERNAME/knowYourUkraine.git || true
cd /var/www/knowYourUkraine

# Setup Strapi environment
echo "⚙️ Setting up Strapi..."
cd /var/www/knowYourUkraine/apps/cms

# Copy and configure production environment
cp env.production.example .env
echo "⚠️  Please edit /var/www/knowYourUkraine/apps/cms/.env with your production secrets!"

npm ci --production=false
npm run build

# Setup Next.js environment
echo "⚙️ Setting up Next.js..."
cd /var/www/knowYourUkraine/apps/web
cp env.local.example .env.local
echo "⚠️  Please edit /var/www/knowYourUkraine/apps/web/.env.local with your production values!"

npm ci
npm run build

# Start with PM2
echo "🚀 Starting services..."
cd /var/www/knowYourUkraine/apps/cms
pm2 start npm --name "strapi" -- run start

cd /var/www/knowYourUkraine/apps/web
pm2 start npm --name "nextjs" -- run start

# Save PM2 config
pm2 save
pm2 startup

# Copy Nginx config
echo "🌐 Configuring Nginx..."
sudo cp /var/www/knowYourUkraine/deploy/nginx.conf /etc/nginx/sites-available/knowyourukraine
sudo ln -sf /etc/nginx/sites-available/knowyourukraine /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

echo ""
echo "✅ Server setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Edit /var/www/knowYourUkraine/apps/cms/.env with production secrets"
echo "2. Edit /var/www/knowYourUkraine/apps/web/.env.local with production values"
echo "3. Run: sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d cms.yourdomain.com"
echo "4. Restart services: pm2 restart all"
echo ""
echo "🗄️  Database: Using Supabase PostgreSQL (configured in .env)"
echo "📁 Storage: Using Supabase Storage (configured in .env)"
