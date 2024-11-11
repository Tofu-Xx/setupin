vite build --mode development
vite build --mode production
mv dist/{development,production}/* dist/
rm -rf dist/{development,production}