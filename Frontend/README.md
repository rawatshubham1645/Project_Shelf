# Visual Form Builder Application

A sophisticated form builder platform that enables users to design, publish, and analyze multi-step forms with conditional logic and comprehensive analytics.

## 🎯 Overview

### User Roles
- **Form Designers**: Authenticated users who create and manage forms
- **Respondents**: Anonymous users who can submit form responses

## 🚀 Core Features

### Visual Form Designer
- **Field Types Support**:
  - Text, Email, Number inputs
  - Dropdown selections
  - Checkbox groups
  - 5-point Rating scale
- **Advanced Form Logic**:
  - Conditional field visibility
  - Multi-page form support
  - Progress tracking
  - Real-time form preview

### Form Management
- **Publishing Controls**:
  - Unique shareable URLs
  - Form status management (Open/Closed/Scheduled)
  - Optional access password
  - Drag-and-drop field ordering

### Response Collection
- **Data Capture**:
  - Anonymous submissions
  - Optional email collection
  - Field validation enforcement
  - Duplicate submission prevention

### Analytics Dashboard
- **Visualization Tools**:
  - Raw response table view
  - Bar charts for choices
  - Numerical data histograms
  - Text response word clouds
  - Date-based filtering

### Export & Integration
- **Data Portability**:
  - CSV/XLSX export
  - Webhook integration
  - Real-time data sync

## 🔐 Authentication

```plaintext
/api/users/register/request-otp  # OTP request for registration
/api/users/register              # Complete registration
/api/users/login                 # User authentication
```

## 🛣️ API Routes

### Form Management
```plaintext
/api/forms/create         # Create new form
/api/forms               # Form CRUD operations
/api/forms/access        # Form access control
/api/forms/validate      # Form validation
```

### Response Handling
```plaintext
/api/responses/submit    # Submit form response
/api/forms/responses     # View form responses
```

### Analytics
```plaintext
/api/dashboard/analytics # Analytics data
/api/dashboard/forms     # Forms overview
/api/dashboard/export/excel # Export responses
```

## 🛠️ Tech Stack

- **Core**: React 19, Vite 6
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **UI Components**: 
  - Radix UI primitives
  - Tremor
  - Lucide React icons
- **Styling**: 
  - TailwindCSS
  - Class Variance Authority
  - Tailwind Merge
- **Data Visualization**:
  - Recharts
  - D3.js
  - React WordCloud
- **Form Handling**:
  - React Hook Form
  - Yup validation
- **Development Tools**:
  - ESLint
  - PostCSS
  - Autoprefixer

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 📝 Project Structure

- `/src`
  - `/components` - Reusable UI components
  - `/hooks` - Custom React hooks
  - `/functions` - Utility functions
  - `/imports` - API and other imports

## 🎨 Design System

The application uses a consistent design system with:
- Slate colors for borders
- Blue accents for focus states
- Smooth animations for interactions
- Accessible color contrasts
- Responsive layouts
