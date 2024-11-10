#!/usr/bin/env sh

jq '. | .background.["scripts"] = [.background.service_worker] | del(.background.service_worker)' ./manifest/base.json > ./manifest.json
yarn web-ext build \
	--overwrite-dest \
	--artifacts-dir artifacts/firefox \
	--ignore-files \
        artifacts \
        manifest \
        scripts \
        "eslint*" \
        "prettier*" \
        package.json \
        yarn.lock \
        screenshot.png

rm ./manifest.json
