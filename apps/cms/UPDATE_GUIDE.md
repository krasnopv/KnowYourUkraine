# Strapi Admin Panel Update Guide

## Understanding Updates

The Strapi admin panel is **automatically generated** from the Strapi core package (`@strapi/strapi`). When you update Strapi, the admin panel updates too.

## Update Methods

### 1. Update Strapi Core (npm/pnpm)

**When to use:** Updating Strapi version, security patches, new features

```bash
# Check what will be updated (dry run)
cd apps/cms
pnpm upgrade:dry

# Actually update
pnpm upgrade

# Rebuild admin panel (required after update)
pnpm build

# Restart dev server
pnpm dev
```

**What gets updated:**
- Strapi core (`@strapi/strapi`)
- Admin panel (automatically)
- Plugins (`@strapi/plugin-users-permissions`, etc.)

### 2. Pull from GitLab

**When to use:** 
- Getting project-specific changes (content types, configs)
- Team member's code changes
- Custom admin customizations (if you add `src/admin/app.tsx`)

```bash
# Pull latest code
git pull origin main

# Install any new dependencies
pnpm install

# Rebuild if Strapi version changed
pnpm build

# Restart
pnpm dev
```

## Best Practice Workflow

### For Strapi Version Updates:

1. **Check changelog** - Review [Strapi releases](https://github.com/strapi/strapi/releases)
2. **Update package.json** - Change version in `package.json` (or use `pnpm upgrade`)
3. **Install dependencies** - `pnpm install`
4. **Rebuild admin** - `pnpm build` (CRITICAL - admin panel must be rebuilt)
5. **Test** - Start dev server and test admin panel
6. **Commit** - Commit `package.json`, `package-lock.json`, and `build/` folder

### For Project Code Updates:

1. **Pull from GitLab** - `git pull`
2. **Install dependencies** - `pnpm install` (if package.json changed)
3. **Rebuild if needed** - `pnpm build` (if Strapi version changed)
4. **Restart** - `pnpm dev`

## Important Notes

⚠️ **Always rebuild after Strapi updates:**
- The admin panel is compiled JavaScript
- Running `pnpm build` regenerates it from the updated Strapi source
- Without rebuilding, you'll see errors like "checkUserHasPermissions is not a function"

⚠️ **Version Pinning:**
- Currently pinned to `5.32.0` (no `^`) to avoid auto-updates
- To update, manually change version in `package.json` or use `pnpm upgrade`

⚠️ **Build Folder:**
- The `build/` folder contains the compiled admin panel
- Should be committed to Git (for production deployments)
- Gets regenerated on every `pnpm build`

## Current Setup

- **Strapi Version:** 5.32.0 (pinned)
- **Admin Customizations:** None (using default admin)
- **Custom Files:** Only example files in `src/admin/`

## Troubleshooting

If admin panel has errors after update:
1. Delete build cache: `rm -rf .cache build dist`
2. Reinstall: `rm -rf node_modules && pnpm install`
3. Rebuild: `pnpm build`
4. Clear browser cache
