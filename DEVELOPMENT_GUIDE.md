# Development Guide - Trunk-Based Development

## Quick Start

### 1. Setup Environment
```bash
# Clone and install dependencies
git clone <repository-url>
cd todo-frontend
npm install

# Copy environment template
cp env.example .env.local

# Start development server
npm start
```

### 2. Enable Feature Flags
Edit `.env.local` to enable features:
```bash
REACT_APP_ENABLE_PRIORITY=true
REACT_APP_ENABLE_DARK_MODE=true
REACT_APP_ENABLE_CATEGORIES=true
```

## Development Workflow

### Starting New Work
```bash
# Always start from main
git checkout main
git pull origin main

# Create short-lived feature branch
git checkout -b feature/add-task-priority
```

### Making Changes
1. **Small commits**: Make frequent, small commits
2. **Feature flags**: Use feature flags for incomplete features
3. **Testing**: Write tests for new functionality
4. **Linting**: Ensure code passes linting rules

### Committing Changes
```bash
# Stage changes
git add .

# Commit with conventional format
git commit -m "feat(ui): add priority field to task form"

# Push branch
git push origin feature/add-task-priority
```

### Creating Pull Request
1. Create PR targeting `main` branch
2. Ensure CI passes
3. Request code review
4. Merge quickly after approval

### Cleanup
```bash
# After merge, cleanup
git checkout main
git pull origin main
git branch -d feature/add-task-priority
```

## Feature Flags

### Using Feature Flags
```javascript
import { isFeatureEnabled, FEATURE_FLAGS } from '../utils/featureFlags';

// Check if feature is enabled
if (isFeatureEnabled(FEATURE_FLAGS.PRIORITY_TASKS)) {
  // Show priority feature
}

// Conditional rendering
{isFeatureEnabled(FEATURE_FLAGS.DARK_MODE) && (
  <DarkModeToggle />
)}
```

### Available Feature Flags
- `PRIORITY_TASKS`: Task priority levels
- `DARK_MODE`: Dark theme support
- `NOTIFICATIONS`: Push notifications
- `TASK_CATEGORIES`: Task categorization
- `ADVANCED_FILTERING`: Advanced filter options
- `TASK_ATTACHMENTS`: File attachments
- `COLLABORATIVE_EDITING`: Real-time collaboration
- `ANALYTICS`: Usage analytics

## Code Quality

### Linting
```bash
# Check for linting issues
npm run lint

# Fix auto-fixable issues
npm run lint:fix
```

### Formatting
```bash
# Format code
npm run format

# Check formatting
npm run format:check
```

### Testing
```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in CI mode
npm run test:ci
```

### Pre-commit Hooks
Pre-commit hooks automatically run:
- ESLint checks
- Prettier formatting
- Test suite

## Branch Naming

### Conventions
- `feature/*`: New features (1-2 days max)
- `bugfix/*`: Bug fixes (1 day max)
- `hotfix/*`: Critical fixes (immediate)

### Examples
```
feature/add-task-priority
feature/implement-dark-mode
bugfix/fix-task-editing
hotfix/critical-ui-bug
```

## Commit Messages

### Format
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples
```
feat(ui): add task priority indicators
fix(tasks): resolve task editing bug
docs(readme): update installation instructions
refactor(api): extract API calls to service
test(components): add unit tests for TaskList
chore(deps): update react to v18.2.0
```

## CI/CD Pipeline

### Automated Checks
- **Linting**: ESLint rules enforcement
- **Formatting**: Prettier code formatting
- **Testing**: Jest test suite
- **Build**: Production build verification
- **Deployment**: Automatic deployment on merge

### Pipeline Stages
1. **Test**: Run linting, formatting, and tests
2. **Build**: Create production build
3. **Deploy Preview**: Deploy PR preview (if applicable)
4. **Deploy Production**: Deploy to production on main merge

## Best Practices

### 1. Keep Branches Short
- Maximum 1-2 days for features
- Maximum 1 day for bug fixes
- Merge incomplete features with feature flags

### 2. Commit Frequently
- Multiple commits per day
- Small, focused changes
- Clear commit messages

### 3. Use Feature Flags
- Hide incomplete features
- Enable gradual rollout
- Allow safe experimentation

### 4. Write Tests
- Unit tests for components
- Integration tests for workflows
- E2E tests for critical paths

### 5. Code Review
- Review every change
- Focus on code quality
- Share knowledge through reviews

## Troubleshooting

### Common Issues

#### Linting Errors
```bash
# Fix auto-fixable issues
npm run lint:fix

# Check specific file
npx eslint src/components/AddTask.js
```

#### Test Failures
```bash
# Run specific test
npm test -- --testNamePattern="AddTask"

# Run tests in watch mode
npm test
```

#### Build Issues
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Feature Flag Issues
```bash
# Check environment variables
echo $REACT_APP_ENABLE_PRIORITY

# Restart development server after env changes
npm start
```

### Getting Help
1. Check this guide first
2. Review the branching strategy documentation
3. Ask team members for help
4. Create an issue if you find a bug

## Environment Setup

### Required Tools
- Node.js 18+ or 20+
- npm or yarn
- Git
- Code editor (VS Code recommended)

### VS Code Extensions
- ESLint
- Prettier
- GitLens
- React snippets
- Auto Rename Tag

### Recommended Settings
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "javascriptreact"]
}
```

## Performance Considerations

### Bundle Size
- Use dynamic imports for large components
- Optimize images and assets
- Monitor bundle size with `npm run build:analyze`

### Runtime Performance
- Use React.memo for expensive components
- Implement proper key props for lists
- Avoid unnecessary re-renders

### Development Performance
- Use React DevTools
- Monitor performance with browser dev tools
- Profile components for bottlenecks

## Security Considerations

### Environment Variables
- Never commit `.env` files
- Use `.env.example` for documentation
- Validate environment variables at runtime

### Dependencies
- Keep dependencies updated
- Use `npm audit` to check for vulnerabilities
- Review dependency changes in PRs

### Code Security
- Validate user inputs
- Sanitize data before rendering
- Use HTTPS in production
