#!/bin/bash
#replace this with the path of your project on the VPS
cd /var/www/dope-golf-admin

#pull from the branch
git pull

# followed by instructions specific to your project that you used to do manually
export NVM_DIR=~/.nvm
source ~/.nvm/nvm.sh
yarn

yarn build

cp -R /var/www/dope-golf-admin/build /var/www/dope-golf-backend

export PATH=~/.npm-global/bin:$PATH
source ~/.profile