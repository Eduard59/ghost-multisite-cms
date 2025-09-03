#!/bin/bash

# DentalPrice Blog Deployment Script
# This script prepares and deploys the Ghost blog to Render

echo "🚀 DentalPrice Blog Deployment Script"
echo "====================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📝 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial Ghost blog setup for DentalPrice.ai"
fi

# Create GitHub repository
echo ""
echo "📦 Next steps to deploy:"
echo ""
echo "1. Create a GitHub repository:"
echo "   gh repo create dentalprice-blog --public --source=. --remote=origin --push"
echo ""
echo "   Or manually:"
echo "   - Go to https://github.com/new"
echo "   - Create repository named 'dentalprice-blog'"
echo "   - Run: git remote add origin https://github.com/YOUR_USERNAME/dentalprice-blog.git"
echo "   - Run: git branch -M main"
echo "   - Run: git push -u origin main"
echo ""
echo "2. Deploy to Render:"
echo "   - Go to https://dashboard.render.com"
echo "   - Click 'New +' → 'Blueprint'"
echo "   - Connect your GitHub account"
echo "   - Select 'dentalprice-blog' repository"
echo "   - Render will auto-detect render.yaml"
echo ""
echo "3. Configure DNS:"
echo "   - After deployment, go to Settings → Custom Domains"
echo "   - Add domain: blog.dentalprice.ai"
echo "   - Add CNAME record in your DNS:"
echo "     CNAME blog.dentalprice.ai → [your-service].onrender.com"
echo ""
echo "4. Set up Ghost Admin:"
echo "   - Visit: https://blog.dentalprice.ai/ghost"
echo "   - Create admin account"
echo "   - Complete setup wizard"
echo ""
echo "5. Configure integrations:"
echo "   - In Ghost Admin → Settings → Integrations"
echo "   - Create 'DentalPrice Marketing' integration"
echo "   - Copy Content API Key"
echo "   - Add to marketing site .env:"
echo "     GHOST_CONTENT_API_KEY=<your-key>"
echo ""
echo "6. Set up webhook for rebuilds:"
echo "   - Get Deploy Hook from Render Dashboard (marketing site)"
echo "   - In Ghost Admin → Settings → Integrations → Webhooks"
echo "   - Add webhook:"
echo "     - Event: Post published"
echo "     - URL: [Render Deploy Hook URL]"
echo ""
echo "✅ Ready for deployment!"