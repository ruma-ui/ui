#!/bin/bash

# Script to set up branch protection rules for the 5-branch release strategy
# Run this script with a GitHub token that has admin permissions on the repository

set -e

REPO_OWNER="ruma-ui"
REPO_NAME="ui"
GITHUB_TOKEN="${GITHUB_TOKEN:-}"

if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Error: GITHUB_TOKEN environment variable is required"
    echo "Please set it to a GitHub token with admin permissions on the repository"
    exit 1
fi

echo "🔧 Setting up branch protection rules for $REPO_OWNER/$REPO_NAME"

# Function to create branch protection rule
create_protection_rule() {
    local branch=$1
    local required_reviews=$2
    local dismiss_stale_reviews=$3
    local require_code_owner_reviews=$4
    local allow_force_pushes=$5
    local allow_deletions=$6

    echo "🛡️  Setting up protection for '$branch' branch..."

    curl -s -X PUT \
        -H "Authorization: Bearer $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/branches/$branch/protection" \
        -d "{
            \"required_status_checks\": {
                \"strict\": true,
                \"checks\": [
                    {\"context\": \"main\", \"app_id\": null}
                ]
            },
            \"enforce_admins\": false,
            \"required_pull_request_reviews\": {
                \"required_approving_review_count\": $required_reviews,
                \"dismiss_stale_reviews\": $dismiss_stale_reviews,
                \"require_code_owner_reviews\": $require_code_owner_reviews,
                \"require_last_push_approval\": true
            },
            \"restrictions\": null,
            \"allow_force_pushes\": $allow_force_pushes,
            \"allow_deletions\": $allow_deletions,
            \"block_creations\": false,
            \"required_conversation_resolution\": true
        }" > /dev/null

    if [ $? -eq 0 ]; then
        echo "✅ Branch protection set for '$branch'"
    else
        echo "❌ Failed to set protection for '$branch'"
    fi
}

# Set protection rules for each branch
echo ""
echo "📋 Branch Protection Rules:"
echo "  dev    - Default branch, 1 review required, allows force pushes (for development)"
echo "  alpha  - 1 review required, no force pushes"
echo "  beta   - 1 review required, no force pushes"
echo "  rc     - 2 reviews required, no force pushes"
echo "  main   - 2 reviews required, no force pushes, no deletions"
echo ""

# dev branch (default) - more relaxed for active development
create_protection_rule "dev" 1 true false true false

# alpha branch - experimental releases
create_protection_rule "alpha" 1 true false false false

# beta branch - feature-complete testing
create_protection_rule "beta" 1 true false false false

# rc branch - release candidates, stricter
create_protection_rule "rc" 2 true true false false

# main branch - production, most strict
create_protection_rule "main" 2 true true false true

echo ""
echo "🎉 Branch protection rules have been configured!"
echo ""
echo "📝 Next steps:"
echo "  1. Create the alpha, beta, rc branches from dev"
echo "  2. Set dev as the default branch in GitHub repository settings"
echo "  3. Test the CI/CD pipeline with a test merge"
echo ""
echo "🔗 You can view the protection rules at:"
echo "   https://github.com/$REPO_OWNER/$REPO_NAME/settings/branches"
