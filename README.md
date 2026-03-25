# Fruitydrops.github.io

Personal webpage for Fruitydrops, built with Valaxy.

Example: [valaxy.site](https://valaxy.site)

## Usage

```bash
# install
npm i
# or pnpm i

# start
npm run dev
# or pnpm dev
```

See `http://localhost:4859/`.

### Config

Modify `valaxy.config.ts` and `site.config.ts` to customize the blog.

### Docker

```bash
docker build . -t your-valaxy-blog-name:latest
```

## Structure

In most cases, you only need to work in the `pages` folder.

### Main folders

- `pages`: all pages and posts
- `styles`: theme style overrides
- `components`: custom Vue components
- `layouts`: custom layouts
- `locales`: i18n resources

### Other

- `.github`: GitHub Actions for deploy
- `netlify.toml`: Netlify config
- `vercel.json`: Vercel config
