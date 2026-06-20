# Go-Live Checklist

This site is currently **staging** on GitHub Pages at
`https://jcincometax.github.io` and is **hidden from search engines**. When
you're ready to make it the public, indexed site at **www.jcincometaxx.com**,
do the following.

## 1. Re-enable search indexing

Replace the contents of `robots.txt` with the production version:

```
User-agent: *
Allow: /

Sitemap: https://www.jcincometaxx.com/sitemap.xml
```

(During staging, `robots.txt` is set to `Disallow: /` so the preview stays out
of Google. This is the only change needed to allow indexing.)

## 2. Attach the custom domain

1. Repo → **Settings → Pages → Custom domain** → enter `www.jcincometaxx.com`
   → **Save**. (GitHub adds a `CNAME` file to the repo automatically.)
2. At your DNS provider for **jcincometaxx.com**, add:
   - **CNAME** record: `www` → `jcincometax.github.io`
   - For the bare/apex domain `jcincometaxx.com`, add **A** records pointing to
     GitHub Pages:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
     (optionally the matching AAAA/IPv6 records) so the apex redirects to `www`.
3. Back in **Settings → Pages**, wait for the green check, then tick
   **Enforce HTTPS**.

GitHub Pages will then serve **www.jcincometaxx.com** and automatically redirect
the `jcincometax.github.io` URL to it.

> Note: this step replaces whatever currently answers at jcincometaxx.com
> (e.g. the old Google Sites page). Do it only when you're ready to switch over.

## 3. Submit for indexing

- Add the property in **Google Search Console** and submit `sitemap.xml`.
- (Optional) Do the same in **Bing Webmaster Tools**.
