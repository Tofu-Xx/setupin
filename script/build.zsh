vite build --mode development
vite build --mode production

mv dist/development/main.js dist/main.js
mv dist/production/main.js dist/main.prod.js

rm -rf dist/development dist/production