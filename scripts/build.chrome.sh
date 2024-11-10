#!/usr/bin/env sh

mkdir -p ./artifacts/chrome
cp ./manifest/base.json ./manifest.json
zip caat.zip \
	./background.js \
	./manifest.json \
	./icon_16x16.png \
	./icon_48x48.png \
	./icon_128x128.png \
	./_locales/en/messages.json \
	./_locales/ja/messages.json
mv caat.zip ./artifacts/chrome/caat.zip
rm ./manifest.json
