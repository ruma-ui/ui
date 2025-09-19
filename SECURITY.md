# Security Policy

## Supported Versions

We actively support the following versions of @ruma/ui with security updates:

| Version | Supported    |
| ------- | ------------ |
| 1.x.x   | ✅ Yes       |
| 0.x.x   | ❌ No (Beta) |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security vulnerability within @ruma/ui, please follow these steps:

### 1. **Do Not** Create a Public Issue

Please do not report security vulnerabilities through public GitHub issues, discussions, or pull requests.

### 2. Report Privately

Instead, please report security vulnerabilities by email to:
**security@ruma-ui.dev**

Include the following information in your report:

- Type of issue (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

### 3. Response Timeline

You can expect the following timeline for vulnerability reports:

- **24 hours**: Initial response acknowledging receipt
- **72 hours**: Initial assessment and severity classification
- **7 days**: Detailed response with planned fix timeline
- **30 days**: Security fix released (for critical vulnerabilities)

### 4. Disclosure Policy

- We request that you give us reasonable time to investigate and fix the issue before any public disclosure
- We will acknowledge your responsible disclosure
- We may include your name in our security credits (with your permission)

## Security Measures

### Development

- All dependencies are regularly updated and scanned for vulnerabilities
- Code is reviewed by multiple maintainers before merging
- Automated security scanning is part of our CI/CD pipeline
- We follow secure coding practices and guidelines

### Build & Distribution

- All releases are built in a secure CI environment
- Package integrity is verified through checksums
- We use npm's two-factor authentication for publishing

### Dependencies

- We regularly audit our dependencies for security vulnerabilities
- We use tools like `npm audit` and `snyk` for vulnerability scanning
- Dependencies are updated promptly when security issues are discovered

## Security Features

### CSP (Content Security Policy)

When using @ruma/ui in your applications, we recommend implementing proper Content Security Policies:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; style-src 'self' 'unsafe-inline';"
/>
```

### XSS Protection

All components are designed to prevent XSS attacks:

- User input is properly sanitized
- HTML injection is prevented through React's built-in protections
- No `dangerouslySetInnerHTML` usage without explicit sanitization

## Best Practices for Users

When using @ruma/ui in your applications:

1. **Keep Updated**: Always use the latest version of @ruma/ui
2. **Audit Dependencies**: Regularly audit your project's dependencies
3. **Validate Props**: Validate component props, especially those from user input
4. **CSP Headers**: Implement proper Content Security Policy headers
5. **HTTPS**: Always serve your applications over HTTPS in production

## Security Credits

We appreciate the security research community and would like to thank the following individuals for their responsible disclosure of security vulnerabilities:

<!-- Security researchers will be listed here after responsible disclosure -->

---

Thank you for helping keep @ruma/ui and our users safe!
