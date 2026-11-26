#!/usr/bin/env bash
# Скачивает все демонстрационные фото Unsplash из assets/js/images.js
# в assets/images/demo/ (формат WebP) и переключает сайт на локальные файлы.
# Запуск из папки сайта:  bash tools/download-demo-images.sh
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p assets/images/demo
ids=$(grep -oE 'demo\("[0-9]+-[0-9a-f]+"' assets/js/images.js | sed -E 's/demo\("//; s/"//' | sort -u)
n=0
for id in $ids; do
  out="assets/images/demo/$id.webp"
  if [ ! -s "$out" ]; then
    echo "↓ $id"
    curl -fsSL "https://images.unsplash.com/photo-$id?fm=webp&w=1920&q=72&fit=max" -o "$out"
  fi
  n=$((n+1))
done
sed -i.bak 's/var DEMO_MODE = "remote";/var DEMO_MODE = "local";/' assets/js/images.js && rm -f assets/js/images.js.bak
echo "Готово: $n фото сохранено локально, сайт переключён на локальные файлы."
