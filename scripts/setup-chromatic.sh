#!/bin/bash

# Chromatic Setup Script for Free Visual Regression Testing

set -e

echo "🎨 Setting up Chromatic for free visual regression testing..."

# Check if chromatic is already installed
if ! npm list chromatic &> /dev/null; then
    echo "📦 Installing Chromatic..."
    npm install --save-dev chromatic
else
    echo "✅ Chromatic is already installed"
fi

echo ""
echo "🔑 Next steps to complete setup:"
echo ""
echo "1. 🌐 Visit https://www.chromatic.com/"
echo "2. 🔗 Sign in with your GitHub account"
echo "3. ➕ Add your repository: ruma-ui/ui"
echo "4. 📋 Copy your project token"
echo "5. 🔒 Add the token to GitHub repository secrets:"
echo "   - Go to: https://github.com/ruma-ui/ui/settings/secrets/actions"
echo "   - Click 'New repository secret'"
echo "   - Name: CHROMATIC_PROJECT_TOKEN"
echo "   - Value: [paste your token]"
echo ""
echo "🎉 Once setup is complete, your visual regression testing will be:"
echo "   ✅ Completely free for open source"
echo "   ✅ Integrated with your GitHub workflow"
echo "   ✅ Running on every Storybook deployment"
echo ""
echo "💡 Benefits over Argos CI:"
echo "   • Free forever for open source projects"
echo "   • Better GitHub integration"
echo "   • More generous free tier limits"
echo "   • No usage restrictions"
echo ""
echo "🔍 To manually run Chromatic locally:"
echo "   npx chromatic --project-token=<your-token>"
echo ""
