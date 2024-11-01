# bash -c "{ echo export; curl -L https://unpkg.com/vue@3/dist/vue.global.js; } > vendor/vue.js"
# bash -c "{ echo export; curl -L https://unpkg.com/vue@3/dist/vue.global.prod.js; } > vendor/vue.prod.js"
bash -c "curl -L https://unpkg.com/vue/dist/vue.esm-browser.js -o vendor/vue.esm.js"
bash -c "curl -L https://unpkg.com/vue/dist/vue.esm-browser.prod.js -o vendor/vue.esm.prod.js"
