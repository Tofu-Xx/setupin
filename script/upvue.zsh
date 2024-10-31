# bash -c "{ echo export; curl -L https://unpkg.com/vue@3/dist/vue.global.js; } > src/assets/vue.js"
# bash -c "{ echo export; curl -L https://unpkg.com/vue@3/dist/vue.global.prod.js; } > src/assets/vue.prod.js"
bash -c "curl -L https://unpkg.com/vue/dist/vue.esm-browser.js -o src/assets/vue.esm.js"
bash -c "curl -L https://unpkg.com/vue/dist/vue.esm-browser.prod.js -o src/assets/vue.esm.prod.js"
