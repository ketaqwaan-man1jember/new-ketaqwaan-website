# 🤝 Contributing Guide - Ketaqwaan Website

## 📋 Table of Contents
1. [Getting Started](#getting-started)
2. [Development Workflow](#development-workflow)
3. [Code Standards](#code-standards)
4. [Commit Guidelines](#commit-guidelines)
5. [Pull Request Process](#pull-request-process)
6. [Testing Guidelines](#testing-guidelines)
7. [Documentation Standards](#documentation-standards)
8. [Issue Reporting](#issue-reporting)
9. [Code Review Process](#code-review-process)
10. [Release Process](#release-process)

---

## 🚀 Getting Started

### Prerequisites
Before contributing, ensure you have:
- Node.js >= 18.0.0
- MongoDB >= 5.0
- Git
- Code editor (VS Code recommended)

### Development Setup
```bash
# 1. Fork the repository
# Click "Fork" on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/ketaqwaan-website.git
cd ketaqwaan-website

# 3. Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/ketaqwaan-website.git

# 4. Install dependencies
npm run install:all

# 5. Setup environment
cp backend/.env.example backend/.env
cp admin-frontend/.env.example admin-frontend/.env
cp client-frontend/.env.example client-frontend/.env

# 6. Start development
npm run dev
```

### Project Structure Understanding
```
ketaqwaan-website/
├── 📁 backend/                 # Node.js API server
│   ├── 📁 config/             # Database & service configs
│   ├── 📁 middleware/         # Express middleware
│   ├── 📁 models/             # MongoDB schemas
│   ├── 📁 routes/             # API endpoints
│   └── 📁 scripts/            # Utility scripts
├── 📁 admin-frontend/         # React admin panel
│   ├── 📁 src/components/     # Reusable components
│   ├── 📁 src/pages/          # Page components
│   └── 📁 src/services/       # API services
├── 📁 client-frontend/        # React public website
│   ├── 📁 src/components/     # UI components
│   └── 📁 src/pages/          # Page components
└── 📁 docs/                   # Documentation
```

---

## 🔄 Development Workflow

### Branch Strategy
We use **Git Flow** branching model:

```
main                    # Production-ready code
├── develop            # Integration branch
├── feature/feature-name    # New features
├── hotfix/fix-name        # Critical fixes
└── release/version-number  # Release preparation
```

### Creating a Feature Branch
```bash
# 1. Switch to develop branch
git checkout develop

# 2. Pull latest changes
git pull upstream develop

# 3. Create feature branch
git checkout -b feature/hero-section-enhancement

# 4. Work on your feature
# ... make changes ...

# 5. Commit changes
git add .
git commit -m "feat: enhance hero section with animations"

# 6. Push to your fork
git push origin feature/hero-section-enhancement

# 7. Create Pull Request on GitHub
```

### Branch Naming Convention
```bash
# Features
feature/user-management
feature/image-upload-optimization
feature/dashboard-analytics

# Bug fixes
bugfix/login-validation-error
bugfix/image-upload-timeout

# Hotfixes
hotfix/security-vulnerability
hotfix/database-connection-issue

# Documentation
docs/api-documentation
docs/deployment-guide

# Refactoring
refactor/auth-middleware
refactor/database-queries
```

---

## 📝 Code Standards

### JavaScript/React Standards

#### 1. Naming Conventions
```javascript
// Variables and functions: camelCase
const userName = 'john_doe';
const getUserData = () => {};

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Components: PascalCase
const UserProfile = () => {};
const ImageUploadModal = () => {};

// Files: kebab-case or PascalCase for components
user-service.js
UserProfile.jsx
api-client.js
```

#### 2. Code Structure
```javascript
// ✅ Good: Clear, readable structure
const UserService = {
  async getUser(id) {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('User fetch failed');
    }
  },

  async updateUser(id, userData) {
    const validatedData = validateUserData(userData);
    return await api.put(`/users/${id}`, validatedData);
  }
};

// ❌ Bad: Unclear, hard to maintain
const getUser = (id) => api.get(`/users/${id}`).then(r => r.data).catch(e => { throw e; });
```

#### 3. React Component Standards
```jsx
// ✅ Good: Well-structured component
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useApi } from '../hooks/useApi';
import LoadingSpinner from './LoadingSpinner';

const UserProfile = ({ userId, onUpdate }) => {
  const { data: user, loading, error } = useApi(
    () => userService.getUser(userId),
    [userId]
  );

  const handleUpdate = async (userData) => {
    try {
      await userService.updateUser(userId, userData);
      onUpdate?.(userData);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      {/* Component content */}
    </div>
  );
};

UserProfile.propTypes = {
  userId: PropTypes.string.isRequired,
  onUpdate: PropTypes.func
};

export default UserProfile;
```

#### 4. Error Handling
```javascript
// ✅ Good: Comprehensive error handling
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    
    // Re-throw with context
    throw new Error(`Failed to fetch data from ${endpoint}: ${error.message}`);
  }
};

// ❌ Bad: Silent failures
const apiCall = async (endpoint) => {
  try {
    return await fetch(endpoint).then(r => r.json());
  } catch (e) {
    return null; // Silent failure
  }
};
```

### CSS/Styling Standards

#### 1. Tailwind CSS Usage
```jsx
// ✅ Good: Semantic, maintainable classes
<div className="card p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
  <h2 className="heading-primary text-gray-900 mb-4">Title</h2>
  <p className="text-body text-gray-600 leading-relaxed">Content</p>
</div>

// ❌ Bad: Too many utility classes
<div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 mb-4">
```

#### 2. Custom CSS Organization
```css
/* ✅ Good: Organized, BEM methodology */
.user-profile {
  @apply bg-white rounded-lg shadow-md;
}

.user-profile__header {
  @apply p-6 border-b border-gray-200;
}

.user-profile__title {
  @apply text-xl font-semibold text-gray-900;
}

.user-profile__content {
  @apply p-6;
}

/* ❌ Bad: Unorganized, unclear naming */
.profile {
  background: white;
  padding: 20px;
}

.title {
  font-size: 18px;
}
```

### Backend Standards

#### 1. API Route Structure
```javascript
// ✅ Good: Clear, RESTful structure
const express = require('express');
const { body, validationResult } = require('express-validator');
const { auth, adminAuth } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// GET /api/users
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });
    
    res.json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/users
router.post('/', [
  auth,
  adminAuth,
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').trim().isLength({ min: 2 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Implementation...
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
```

#### 2. Database Model Standards
```javascript
// ✅ Good: Well-defined schema with validation
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      message: 'Invalid email format'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'super_admin'],
      message: 'Role must be either admin or super_admin'
    },
    default: 'admin'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { 
    transform: (doc, ret) => {
      delete ret.password;
      delete ret.__v;
      return ret;
    }
  }
});

// Pre-save middleware
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance methods
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

---

## 📝 Commit Guidelines

### Commit Message Format
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Commit Types
```bash
feat:     # New feature
fix:      # Bug fix
docs:     # Documentation changes
style:    # Code style changes (formatting, etc.)
refactor: # Code refactoring
test:     # Adding or updating tests
chore:    # Maintenance tasks
perf:     # Performance improvements
ci:       # CI/CD changes
build:    # Build system changes
```

### Examples
```bash
# Feature commits
feat: add user profile management
feat(auth): implement JWT token refresh
feat(admin): add bulk user operations

# Bug fix commits
fix: resolve image upload timeout issue
fix(api): handle database connection errors
fix(ui): correct responsive layout on mobile

# Documentation commits
docs: update API documentation
docs(readme): add installation instructions
docs(security): document authentication flow

# Refactoring commits
refactor: optimize database queries
refactor(components): extract reusable UI components
refactor(auth): simplify middleware structure

# Breaking changes
feat!: redesign user authentication system
BREAKING CHANGE: authentication now requires email verification
```

### Commit Message Best Practices
```bash
# ✅ Good: Clear, descriptive messages
feat: add image compression for uploads
fix: resolve memory leak in file processing
docs: update deployment guide with Docker instructions

# ❌ Bad: Vague, unclear messages
fix: bug
update: stuff
change: files
```

---

## 🔄 Pull Request Process

### Before Creating a PR

#### 1. Self-Review Checklist
- [ ] Code follows project standards
- [ ] All tests pass
- [ ] Documentation updated if needed
- [ ] No console.log statements in production code
- [ ] Environment variables documented
- [ ] Security considerations addressed

#### 2. Testing Checklist
- [ ] Unit tests written for new features
- [ ] Integration tests updated
- [ ] Manual testing completed
- [ ] Cross-browser testing (if frontend changes)
- [ ] Mobile responsiveness verified

### PR Template
```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots to help explain your changes.

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes

## Related Issues
Closes #123
Fixes #456
```

### PR Review Process

#### 1. Automated Checks
- ✅ All CI/CD tests pass
- ✅ Code coverage maintained
- ✅ Security scan passes
- ✅ Build succeeds

#### 2. Manual Review
- **Code Quality**: Readability, maintainability, performance
- **Security**: Vulnerability assessment, input validation
- **Functionality**: Feature works as expected
- **Documentation**: Adequate documentation provided

#### 3. Review Guidelines for Reviewers
```markdown
## Review Checklist

### Code Quality
- [ ] Code is readable and well-structured
- [ ] Functions are small and focused
- [ ] Variable names are descriptive
- [ ] No code duplication
- [ ] Error handling is appropriate

### Security
- [ ] Input validation implemented
- [ ] No hardcoded secrets
- [ ] Authentication/authorization correct
- [ ] SQL injection prevention
- [ ] XSS protection in place

### Performance
- [ ] No obvious performance issues
- [ ] Database queries optimized
- [ ] Large files handled efficiently
- [ ] Caching implemented where appropriate

### Testing
- [ ] Adequate test coverage
- [ ] Tests are meaningful
- [ ] Edge cases considered
- [ ] Integration tests updated
```

---

## 🧪 Testing Guidelines

### Testing Strategy
```
Unit Tests (70%)     # Individual functions/components
Integration Tests (20%)  # API endpoints, component integration
E2E Tests (10%)      # Full user workflows
```

### Backend Testing

#### 1. Unit Tests
```javascript
// tests/unit/auth.test.js
const { generateToken, verifyToken } = require('../../utils/auth');
const jwt = require('jsonwebtoken');

describe('Auth Utils', () => {
  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      const userId = '64f8a1b2c3d4e5f6a7b8c9d0';
      const token = generateToken(userId);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      
      const decoded = jwt.decode(token);
      expect(decoded.userId).toBe(userId);
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token', () => {
      const userId = '64f8a1b2c3d4e5f6a7b8c9d0';
      const token = generateToken(userId);
      
      const decoded = verifyToken(token);
      expect(decoded.userId).toBe(userId);
    });

    it('should throw error for invalid token', () => {
      expect(() => {
        verifyToken('invalid-token');
      }).toThrow('Invalid token');
    });
  });
});
```

#### 2. Integration Tests
```javascript
// tests/integration/auth.test.js
const request = require('supertest');
const app = require('../../server');
const User = require('../../models/User');

describe('Auth API', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      // Create test user
      const user = new User({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      });
      await user.save();

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe('test@example.com');
    });

    it('should reject invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Invalid credentials');
    });
  });
});
```

### Frontend Testing

#### 1. Component Tests
```jsx
// tests/components/UserProfile.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserProfile } from '../UserProfile';
import * as userService from '../../services/userService';

// Mock the service
jest.mock('../../services/userService');

describe('UserProfile', () => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com'
  };

  beforeEach(() => {
    userService.getUser.mockResolvedValue(mockUser);
  });

  it('renders user information', async () => {
    render(<UserProfile userId="1" />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });
  });

  it('handles update user action', async () => {
    const onUpdate = jest.fn();
    userService.updateUser.mockResolvedValue({});

    render(<UserProfile userId="1" onUpdate={onUpdate} />);

    const editButton = await screen.findByText('Edit');
    await userEvent.click(editButton);

    const nameInput = screen.getByDisplayValue('John Doe');
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Jane Doe');

    const saveButton = screen.getByText('Save');
    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(userService.updateUser).toHaveBeenCalledWith('1', {
        name: 'Jane Doe'
      });
      expect(onUpdate).toHaveBeenCalled();
    });
  });
});
```

#### 2. Hook Tests
```jsx
// tests/hooks/useApi.test.js
import { renderHook, waitFor } from '@testing-library/react';
import { useApi } from '../useApi';

describe('useApi', () => {
  it('should fetch data successfully', async () => {
    const mockApiFunction = jest.fn().mockResolvedValue({ data: 'test' });

    const { result } = renderHook(() => useApi(mockApiFunction));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual({ data: 'test' });
      expect(result.current.error).toBe(null);
    });
  });

  it('should handle errors', async () => {
    const mockApiFunction = jest.fn().mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useApi(mockApiFunction));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBe(null);
      expect(result.current.error).toEqual(new Error('API Error'));
    });
  });
});
```

### Test Commands
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- UserProfile.test.jsx

# Run integration tests only
npm run test:integration

# Run E2E tests
npm run test:e2e
```

---

## 📚 Documentation Standards

### Code Documentation

#### 1. JSDoc Comments
```javascript
/**
 * Authenticates a user and returns a JWT token
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<Object>} Authentication result with token and user data
 * @throws {Error} When authentication fails
 * @example
 * const result = await authenticateUser('user@example.com', 'password123');
 * console.log(result.token); // JWT token
 */
const authenticateUser = async (email, password) => {
  // Implementation...
};

/**
 * User profile component
 * @component
 * @param {Object} props - Component props
 * @param {string} props.userId - ID of the user to display
 * @param {Function} [props.onUpdate] - Callback when user is updated
 * @returns {JSX.Element} User profile component
 */
const UserProfile = ({ userId, onUpdate }) => {
  // Implementation...
};
```

#### 2. README Files
Each major directory should have a README.md:

```markdown
# Component Name

Brief description of what this component/module does.

## Usage

```jsx
import { ComponentName } from './ComponentName';

<ComponentName 
  prop1="value1"
  prop2="value2"
  onAction={handleAction}
/>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| prop1 | string | Yes | - | Description of prop1 |
| prop2 | number | No | 0 | Description of prop2 |

## Examples

### Basic Usage
```jsx
<ComponentName prop1="example" />
```

### Advanced Usage
```jsx
<ComponentName 
  prop1="example"
  prop2={42}
  onAction={(data) => console.log(data)}
/>
```
```

### API Documentation
```markdown
# API Endpoint

## POST /api/users

Creates a new user account.

### Request

```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe",
  "role": "admin"
}
```

### Response

**Success (201)**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "admin",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error (400)**
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### Authentication
Requires `Authorization: Bearer <token>` header.

### Permissions
- `super_admin`: Can create any user
- `admin`: Cannot create super_admin users
```

---

## 🐛 Issue Reporting

### Bug Report Template
```markdown
**Bug Description**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. iOS]
 - Browser [e.g. chrome, safari]
 - Version [e.g. 22]
 - Node.js version: [e.g. 18.17.0]

**Additional Context**
Add any other context about the problem here.

**Logs**
```
Paste relevant logs here
```
```

### Feature Request Template
```markdown
**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.

**Implementation Ideas**
If you have ideas about how this could be implemented, please share them.
```

### Issue Labels
```
Type:
- bug: Something isn't working
- enhancement: New feature or request
- documentation: Improvements or additions to documentation
- question: Further information is requested

Priority:
- critical: System is broken
- high: Important issue
- medium: Normal priority
- low: Nice to have

Status:
- needs-triage: Needs initial review
- in-progress: Currently being worked on
- blocked: Cannot proceed
- ready-for-review: Ready for code review
```

---

## 👀 Code Review Process

### Review Checklist

#### For Authors
- [ ] Self-review completed
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] Breaking changes documented
- [ ] Performance impact considered

#### For Reviewers
- [ ] Code quality and readability
- [ ] Security considerations
- [ ] Performance implications
- [ ] Test coverage adequate
- [ ] Documentation sufficient

### Review Guidelines

#### 1. Constructive Feedback
```markdown
# ✅ Good feedback
"Consider using a Map instead of an object here for better performance with frequent lookups."

"This function is doing too many things. Could we split it into smaller, focused functions?"

"Great implementation! One suggestion: we could add error handling for the edge case where..."

# ❌ Poor feedback
"This is wrong."
"Bad code."
"Change this."
```

#### 2. Review Comments
```markdown
# Severity levels
**MUST FIX**: Critical issues that block merge
**SHOULD FIX**: Important improvements
**CONSIDER**: Suggestions for improvement
**NITPICK**: Minor style/preference issues
**PRAISE**: Positive feedback for good code
```

#### 3. Response to Reviews
```markdown
# Author responses
✅ "Fixed in commit abc123"
✅ "Good point! I've refactored this in commit def456"
✅ "I disagree because... but I'm open to discussion"

❌ "Fixed" (without explanation)
❌ "Whatever"
❌ Ignoring feedback without response
```

---

## 🚀 Release Process

### Version Numbering
We follow [Semantic Versioning](https://semver.org/):

```
MAJOR.MINOR.PATCH

MAJOR: Breaking changes
MINOR: New features (backward compatible)
PATCH: Bug fixes (backward compatible)
```

### Release Workflow
```bash
# 1. Create release branch
git checkout develop
git pull upstream develop
git checkout -b release/v1.2.0

# 2. Update version numbers
npm version minor  # or major/patch

# 3. Update CHANGELOG.md
# Add release notes

# 4. Create PR to main
# Title: "Release v1.2.0"

# 5. After merge, tag release
git checkout main
git pull upstream main
git tag -a v1.2.0 -m "Release version 1.2.0"
git push upstream v1.2.0

# 6. Merge back to develop
git checkout develop
git merge main
git push upstream develop
```

### Changelog Format
```markdown
# Changelog

## [1.2.0] - 2024-01-15

### Added
- User profile management interface
- Image upload with compression
- Bulk operations for admin users

### Changed
- Improved authentication flow
- Updated UI components for better accessibility
- Enhanced error handling across the application

### Fixed
- Memory leak in file processing
- Responsive layout issues on mobile devices
- Database connection timeout handling

### Security
- Updated dependencies to fix security vulnerabilities
- Improved input validation for all forms
- Enhanced rate limiting for API endpoints

### Deprecated
- Old authentication API (will be removed in v2.0.0)

### Removed
- Legacy user management interface
```

### Release Notes Template
```markdown
# Release v1.2.0

## 🎉 What's New
- **User Management**: Complete overhaul of user management interface
- **Performance**: 40% faster page load times
- **Security**: Enhanced security measures and vulnerability fixes

## 🐛 Bug Fixes
- Fixed memory leak in file processing
- Resolved mobile layout issues
- Improved error handling

## 🔧 Technical Changes
- Updated to Node.js 18
- Migrated to new authentication system
- Improved database query performance

## 📖 Documentation
- Updated API documentation
- Added deployment guide
- Enhanced contributing guidelines

## 🚨 Breaking Changes
- Authentication API endpoints have changed
- User role structure updated
- Configuration file format modified

## 📦 Migration Guide
For users upgrading from v1.1.x:
1. Update configuration files
2. Run migration script: `npm run migrate`
3. Update client applications to use new API endpoints

## 🙏 Contributors
Thanks to all contributors who made this release possible!
- @contributor1
- @contributor2
- @contributor3
```

---

## 📞 Getting Help

### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and discussions
- **Email**: dev@ketaqwaan.com for private matters

### Development Resources
- **Documentation**: `/docs` directory
- **API Reference**: `/docs/API.md`
- **Deployment Guide**: `/docs/DEPLOYMENT.md`
- **Security Guide**: `/docs/SECURITY.md`

### Mentorship Program
New contributors can request mentorship:
1. Comment on an issue with `@mentor-request`
2. Experienced contributors will provide guidance
3. Pair programming sessions available

---

## 🏆 Recognition

### Contributor Levels
- **First-time Contributor**: First merged PR
- **Regular Contributor**: 5+ merged PRs
- **Core Contributor**: 20+ merged PRs + significant features
- **Maintainer**: Trusted with repository access

### Hall of Fame
Contributors who have made significant impacts:
- **@founder**: Project creator and lead maintainer
- **@security-expert**: Security improvements and audits
- **@ui-designer**: UI/UX enhancements and design system

---

**Thank you for contributing to the Ketaqwaan Website project! 🙏**

*This guide is a living document. Please suggest improvements via pull requests.*

---

**© 2024 SIE 1 KETAQWAAN MAN 1 JEMBER. All rights reserved.**