module.exports = {
  branches: [
    "+([0-9])?(.{+([0-9]),x}).x",
    "main",
    { name: "alpha", prerelease: true },
    { name: "beta", prerelease: true },
    { name: "rc", prerelease: true },
  ],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
        releaseRules: [
          { type: "feat", release: "minor" },
          { type: "fix", release: "patch" },
          { type: "perf", release: "patch" },
          { type: "revert", release: "patch" },
          { type: "docs", release: "patch" },
          { type: "style", release: "patch" },
          { type: "refactor", release: "patch" },
          { type: "test", release: "patch" },
          { type: "build", release: "patch" },
          { type: "ci", release: "patch" },
          { type: "chore", release: false },
          { breaking: true, release: "major" },
        ],
        parserOpts: {
          noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"],
        },
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
        presetConfig: {
          types: [
            { type: "feat", section: "🚀 Features" },
            { type: "fix", section: "🐛 Bug Fixes" },
            {
              type: "perf",
              section: "⚡ Performance Improvements",
            },
            { type: "revert", section: "⏪ Reverts" },
            { type: "docs", section: "📚 Documentation" },
            { type: "style", section: "💄 Styles" },
            { type: "refactor", section: "♻️ Code Refactoring" },
            { type: "test", section: "✅ Tests" },
            { type: "build", section: "🔧 Build System" },
            { type: "ci", section: "👷 Continuous Integration" },
          ],
        },
      },
    ],
    "@semantic-release/changelog",
    [
      "@semantic-release/npm",
      {
        npmPublish: true,
        pkgRoot: "dist/ui",
      },
    ],
    "@semantic-release/github",
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "package.json"],
        message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
  ],
};
