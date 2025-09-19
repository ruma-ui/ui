## Description

Please include a summary of the changes and the related issue. Please also include relevant
motivation and context. List any dependencies that are required for this change.

Fixes #(issue)

## Type of change

Please delete options that are not relevant.

- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📚 Documentation update
- [ ] 🛠️ Refactor (no functional changes)
- [ ] 🎨 Style changes (formatting, etc.)
- [ ] 🧪 Test updates
- [ ] 🔒 Security fix
- [ ] ⚡ Performance improvement

## Changes Made

- [ ] Added new component: ComponentName
- [ ] Fixed issue with existing component: ComponentName
- [ ] Updated documentation
- [ ] Added tests
- [ ] Updated dependencies
- [ ] Added Storybook stories
- [ ] Other: (please describe)

## How Has This Been Tested?

Please describe the tests that you ran to verify your changes. Provide instructions so we can
reproduce. Please also list any relevant details for your test configuration.

- [ ] Unit tests pass (`pnpm test`)
- [ ] Integration tests pass
- [ ] Component renders correctly in Storybook
- [ ] Accessibility checks pass (WCAG 2.1 AA)
- [ ] TypeScript compilation succeeds (`pnpm typecheck`)
- [ ] Linting passes (`pnpm lint`)
- [ ] Build succeeds (`pnpm build`)
- [ ] Bundle size check passes (`pnpm size`)

**Test Configuration**:

- Node.js version: [e.g., 20.x]
- Browser: [e.g., Chrome 120, Firefox 120, Safari 17]
- OS: [e.g., macOS 14.0, Windows 11, Ubuntu 22.04]

## Component Changes

If this PR adds or modifies components, please check all that apply:

- [ ] New component added to `src/components/`
- [ ] Component exported in `src/components/index.ts`
- [ ] TypeScript types properly defined
- [ ] Storybook stories created/updated
- [ ] JSDoc documentation added
- [ ] Accessibility attributes included (ARIA, roles, etc.)
- [ ] Keyboard navigation support
- [ ] Responsive design implemented
- [ ] Dark mode support added
- [ ] Unit tests created/updated
- [ ] Visual regression tests added (if applicable)

## Breaking Changes

If this PR introduces breaking changes, please describe them here and provide migration instructions:

- **What breaks**: Description of what functionality changes
- **Migration path**: How users should update their code
- **Deprecation timeline**: When old functionality will be removed (if applicable)

## Screenshots/Videos

If applicable, add screenshots or videos to help explain your changes.

## Performance Impact

- [ ] No performance impact
- [ ] Positive performance impact (please describe)
- [ ] Negative performance impact (please describe and justify)
- [ ] Bundle size impact measured and within acceptable limits

## Accessibility

- [ ] Components are keyboard accessible
- [ ] Components work with screen readers
- [ ] Color contrast meets WCAG AA standards
- [ ] Components have appropriate ARIA labels
- [ ] Focus management is properly implemented
- [ ] Accessibility tested with assistive technologies

## Checklist

### Code Quality

- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] My changes generate no new warnings or errors

### Testing

- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] I have tested the changes in multiple browsers
- [ ] I have tested keyboard navigation

### Documentation

- [ ] I have made corresponding changes to the documentation
- [ ] I have updated JSDoc comments
- [ ] I have added/updated Storybook stories
- [ ] I have updated the CHANGELOG.md (if using manual changelog)

### Release

- [ ] I have created a changeset (`pnpm changeset`)
- [ ] I have used conventional commit messages
- [ ] Any dependent changes have been merged and published in downstream modules

## Additional Notes

Add any other notes about the pull request here, including:

- Links to relevant issues or discussions
- Special considerations for reviewers
- Follow-up work that may be needed
