# Todo Frontend

A modern React frontend for the Todo application, designed to demonstrate Git branching strategies and commit message conventions.

## 🚀 Features

- **Modern React**: Built with functional components and hooks
- **Responsive Design**: Mobile-first approach with beautiful UI
- **Real-time Updates**: Live task management with backend API
- **Task Management**: Add, edit, delete, and toggle task completion
- **Statistics**: Track total, completed, and remaining tasks
- **Error Handling**: User-friendly error messages and loading states

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <your-frontend-repo-url>
cd todo-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will be available at `http://localhost:3000`

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

## 🌿 Git Branching Strategy

This project follows the **Git Flow** branching strategy:

### Main Branches

- **`main`**: Production-ready code
- **`develop`**: Integration branch for features

### Supporting Branches

- **`feature/*`**: New features (branch from `develop`)
- **`release/*`**: Release preparation (branch from `develop`)
- **`hotfix/*`**: Critical bug fixes (branch from `main`)

### Branch Naming Conventions

```
feature/add-task-priority
feature/implement-dark-mode
bugfix/fix-task-editing
hotfix/critical-ui-bug
release/v1.2.0
```

## 📝 Commit Message Conventions

We follow the **Conventional Commits** specification:

### Format
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples
```
feat(ui): add task priority indicators
fix(tasks): resolve task editing bug
docs(readme): update installation instructions
style(components): format code with prettier
refactor(api): extract API calls to service
test(components): add unit tests for TaskList
chore(deps): update react to v18.2.0
```

### Breaking Changes
Use `!` after type/scope to indicate breaking changes:
```
feat(api)!: change task data structure
```

## 🔄 Workflow Example

1. **Create feature branch**:
```bash
git checkout develop
git pull origin develop
git checkout -b feature/add-task-priority
```

2. **Make changes and commit**:
```bash
git add .
git commit -m "feat(ui): add priority field to task form"
git commit -m "feat(components): implement priority-based task sorting"
```

3. **Push and create PR**:
```bash
git push origin feature/add-task-priority
# Create Pull Request to develop
```

4. **Merge and cleanup**:
```bash
git checkout develop
git pull origin develop
git branch -d feature/add-task-priority
```

## 🧪 Testing

```bash
npm test
```

## 📦 Production Build

```bash
npm run build
```

## 🚀 Deployment

The app can be deployed to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: Connect your GitHub repository
- **GitHub Pages**: `npm run deploy`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Header.js          # App header component
│   ├── AddTask.js         # Task creation form
│   └── TaskList.js        # Task display and management
├── App.js                 # Main app component
├── App.css               # Global styles
└── index.js              # App entry point
```

## 🤝 Contributing

1. Follow the branching strategy
2. Use conventional commit messages
3. Write meaningful commit descriptions
4. Test your changes before pushing
5. Create descriptive pull requests

## 📄 License

MIT License - see LICENSE file for details