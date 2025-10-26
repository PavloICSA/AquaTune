# 🌐 Розгортання веб-додатку "Калькулятор кислотних добрив"

Інструкції для розгортання веб-версії калькулятора кислотних добрив на різних платформах.

## 🚀 Швидкий старт

### Локальне тестування

1. **Встановіть Node.js**
   - Завантажте з https://nodejs.org/
   - Рекомендована версія: 18.x або новіша

2. **Запустіть збірку**
   ```bash
   # Використайте готовий скрипт
   build-web.bat
   
   # Або вручну:
   npm install
   npm run build
   ```

3. **Попередній перегляд**
   ```bash
   npm run preview
   ```
   Відкрийте http://localhost:4173

## 📁 Статичне хостування

Після збірки (`npm run build`) папка `dist` містить готові файли для розгортання.

### Netlify (Рекомендовано)

1. **Через веб-інтерфейс:**
   - Зайдіть на https://netlify.com
   - Перетягніть папку `dist` на сторінку
   - Отримайте безкоштовний URL

2. **Через Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

### Vercel

1. **Через веб-інтерфейс:**
   - Зайдіть на https://vercel.com
   - Імпортуйте проект з Git
   - Автоматичне розгортання

2. **Через Vercel CLI:**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

### GitHub Pages

1. **Налаштуйте GitHub Actions:**
   Створіть `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: npm install
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

2. **Увімкніть GitHub Pages в налаштуваннях репозиторію**

## 🖥️ Власний сервер

### Apache

1. **Скопіюйте файли:**
   ```bash
   cp -r dist/* /var/www/html/fertilizer-calculator/
   ```

2. **Налаштуйте .htaccess** (для SPA routing):
   ```apache
   RewriteEngine On
   RewriteBase /fertilizer-calculator/
   RewriteRule ^index\.html$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /fertilizer-calculator/index.html [L]
   ```

### Nginx

1. **Скопіюйте файли:**
   ```bash
   cp -r dist/* /var/www/fertilizer-calculator/
   ```

2. **Налаштуйте конфігурацію:**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/fertilizer-calculator;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       # Кешування статичних файлів
       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

### Docker

1. **Створіть Dockerfile:**
   ```dockerfile
   FROM nginx:alpine
   COPY dist/ /usr/share/nginx/html/
   COPY nginx.conf /etc/nginx/conf.d/default.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Зберіть та запустіть:**
   ```bash
   docker build -t fertilizer-calculator .
   docker run -p 80:80 fertilizer-calculator
   ```

## 🔧 Налаштування для продакшену

### Оптимізація продуктивності

1. **Gzip стиснення** (Nginx):
   ```nginx
   gzip on;
   gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
   ```

2. **HTTP/2** (Apache):
   ```apache
   LoadModule http2_module modules/mod_http2.so
   Protocols h2 http/1.1
   ```

### Безпека

1. **HTTPS** (обов'язково для продакшену)
2. **Security Headers:**
   ```nginx
   add_header X-Frame-Options "SAMEORIGIN" always;
   add_header X-Content-Type-Options "nosniff" always;
   add_header Referrer-Policy "no-referrer-when-downgrade" always;
   add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
   ```

## 📱 PWA (Progressive Web App)

Для перетворення на PWA додайте:

1. **Service Worker**
2. **Web App Manifest**
3. **Offline функціональність**

## 🌍 CDN та глобальне розгортання

### Cloudflare

1. Налаштуйте DNS на Cloudflare
2. Увімкніть проксування
3. Налаштуйте кешування та оптимізацію

### AWS CloudFront

1. Створіть S3 bucket
2. Налаштуйте CloudFront distribution
3. Налаштуйте домен та SSL

## 📊 Моніторинг

### Google Analytics

Додайте в `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Sentry (Error Tracking)

```bash
npm install @sentry/react
```

## 🔄 Автоматичне розгортання

### GitHub Actions + Netlify

```yaml
name: Deploy to Netlify
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=dist
        env:
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
```

## 🐛 Усунення проблем

### Типові проблеми:

1. **404 при перезавантаженні сторінки**
   - Налаштуйте fallback на index.html

2. **Повільне завантаження**
   - Увімкніть gzip стиснення
   - Налаштуйте кешування

3. **Проблеми з CORS**
   - Налаштуйте правильні заголовки сервера

## 📞 Підтримка

Для питань щодо розгортання створіть issue в репозиторії або зверніться до документації хостинг-провайдера.

---

**Успішного розгортання! 🚀**