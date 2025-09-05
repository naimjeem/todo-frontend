# Trunk-Based Development Strategy

## Overview

This project follows **Trunk-Based Development (TBD)**, a source-control branching model where developers collaborate on code in a single branch called `main` (the "trunk"), resisting any pressure to create other long-lived development branches.

## Core Principles

### 1. Single Source of Truth
- **`main`** branch is the single source of truth
- Always deployable and production-ready
- No long-lived development branches

### 2. Short-Lived Feature Branches
- Feature branches live for **maximum 1-2 days**
- Bug fix branches live for **maximum 1 day**
- Hotfix branches are merged **immediately**

### 3. Continuous Integration
- Every commit to `main` triggers CI/CD pipeline
- Automated testing, linting, and deployment
- Fast feedback loop for developers

### 4. Feature Flags
- Use feature flags for incomplete features
- Allows merging incomplete features safely
- Enables gradual rollout and A/B testing

## Branch Types

### Main Branch
- **`main`**: Production-ready code, always deployable

### Short-Lived Branches
- **`feature/*`**: New features (1-2 days max)
- **`bugfix/*`**: Bug fixes (1 day max)
- **`hotfix/*`**: Critical production fixes (immediate)

## Workflow

### 1. Starting Work
```bash
# Always start from main
git checkout main
git pull origin main

# Create short-lived feature branch
git checkout -b feature/add-task-priority
```

### 2. Development
- Make small, focused commits
- Commit frequently (multiple times per day)
- Keep branches short-lived
- Use feature flags for incomplete work

### 3. Integration
```bash
# Push branch
git push origin feature/add-task-priority

# Create Pull Request to main
# Ensure CI passes before merging
```

### 4. Merge and Cleanup
```bash
# After PR is approved and merged
git checkout main
git pull origin main
git branch -d feature/add-task-priority
```

## Feature Flags Implementation

### Environment Variables
```bash
# .env.local
REACT_APP_ENABLE_PRIORITY=true
REACT_APP_ENABLE_DARK_MODE=false
REACT_APP_ENABLE_NOTIFICATIONS=true
```

### Usage in Components
```javascript
const ENABLE_PRIORITY = process.env.REACT_APP_ENABLE_PRIORITY === 'true';

function TaskForm() {
  return (
    <form>
      <input type="text" placeholder="Task name" />
      {ENABLE_PRIORITY && (
        <select>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      )}
    </form>
  );
}
```

## Commit Message Convention

We follow **Conventional Commits**:

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
```

## Benefits of Trunk-Based Development

### 1. Reduced Integration Complexity
- No merge conflicts from long-lived branches
- Continuous integration reduces bugs
- Faster feedback loop

### 2. Improved Code Quality
- Frequent commits encourage smaller changes
- Continuous testing catches issues early
- Code review happens more frequently

### 3. Faster Delivery
- No waiting for feature branches to mature
- Continuous deployment possible
- Reduced time to market

### 4. Better Collaboration
- All developers work on same codebase
- Knowledge sharing happens naturally
- Reduced silos between team members

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

### 4. Automate Everything
- CI/CD pipeline for every commit
- Automated testing and deployment
- Fast feedback for developers

### 5. Code Review
- Review every change
- Focus on code quality
- Share knowledge through reviews

## Migration from Git Flow

If migrating from Git Flow:

1. **Rename branches**: `master` → `main`, remove `develop`
2. **Update CI/CD**: Point to `main` branch
3. **Train team**: Educate on TBD principles
4. **Implement feature flags**: For incomplete features
5. **Gradual transition**: Start with shorter-lived branches

## Tools and Automation

### Required Tools
- **CI/CD Pipeline**: GitHub Actions, GitLab CI, etc.
- **Feature Flags**: LaunchDarkly, Split.io, or custom solution
- **Code Quality**: ESLint, Prettier, SonarQube
- **Testing**: Jest, Cypress, Playwright

### Recommended Tools
- **Branch Protection**: Require PR reviews and CI checks
- **Automated Deployment**: Deploy on every commit to main
- **Monitoring**: Track feature flag usage and performance
- **Documentation**: Keep docs updated with code changes

## Troubleshooting

### Common Issues

1. **Long-lived branches**: Enforce maximum branch lifetime
2. **Merge conflicts**: Encourage frequent rebasing
3. **Incomplete features**: Use feature flags
4. **Slow CI**: Optimize pipeline performance
5. **Team resistance**: Provide training and support

### Solutions

1. **Branch policies**: Set up branch protection rules
2. **Automation**: Automate repetitive tasks
3. **Training**: Provide team education
4. **Monitoring**: Track metrics and improvements
5. **Iteration**: Continuously improve the process
