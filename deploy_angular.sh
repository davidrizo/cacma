# Angular
cd develop/frontend
#hashing to force cache clean

ng build --aot --prod --output-path ../../docs --base-href /cacma/ --deploy-url https://davidrizo.github.io/cacma/
#node_modules/@angular/cli/bin/ng build --output-hashing=all --aot --prod --base-href /investigacion/cacma/ --deploy-url /investigacion/cacma/

cd -
cp docs/index.html docs/404.html
git add docs/*
git commit -a -m "Production release"
git push




