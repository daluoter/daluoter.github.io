#!/bin/bash
# test-hugo-build.sh - Test Hugo build locally before pushing

set -e

echo "🔍 Testing Hugo blog build locally..."

# Check if Hugo is installed
if ! command -v hugo &> /dev/null; then
    echo "❌ Hugo is not installed. Please install it first:"
    echo "   sudo apt install hugo"
    echo "   or: snap install hugo --channel=extended"
    exit 1
fi

cd "$(dirname "$0")/hugo-blog"

echo "📦 Hugo version:"
hugo version

echo ""
echo "🔨 Building Hugo site..."
hugo --minify

echo ""
echo "✅ Build successful!"
echo ""
echo "📁 Generated files in ../blog/:"
ls -la ../blog/

echo ""
echo "🚀 Ready to push! Run:"
echo "   git add . && git commit -m 'Update blog' && git push"
