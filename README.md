# ProjectShelf - Portfolio & Case Study Generator for Creatives

![ProjectShelf Logo](https://project-shelf.netlify.app/logo.png)

## Overview

ProjectShelf is a dynamic web application designed for designers, developers, and writers to create and showcase professional portfolios with modular case studies. The platform enables creative professionals to build impressive portfolios with detailed project showcases, customizable themes, and built-in analytics.

**Live Demo:** [https://project-shelf.netlify.app](https://project-shelf.netlify.app)

**Public Portfolio Example:** [https://project-shelf.netlify.app/user/shera](https://project-shelf.netlify.app/user/shera)

## Features

### Authentication & Portfolio Routing
- Personalized `/username` routes for public portfolio viewing
- Secure creator dashboard with editing access
- User authentication and authorization system

### Portfolio Builder
- Create comprehensive case studies with:
  - Project overview and descriptions
  - Media gallery (images, video links)
  - Development process timeline
  - Tools and technologies used
  - Project outcomes (metrics, testimonials)

### Theme Engine
- Select from multiple prebuilt themes
- Real-time preview of theme changes
- Customizable styling options

### Analytics Dashboard
- View portfolio traffic and engagement metrics
- Track visitor interest per case study
- Monitor click-through rates and user behavior

## Tech Stack

### Frontend
- React.js
- Redux for state management
- React Router for navigation
- Styled Components/CSS Modules for styling
- Axios for API communication

### Backend
- Java Spring Boot
- Spring Security for authentication
- JPA/Hibernate for database operations
- RESTful API architecture

### Database
- MySQL/PostgreSQL

### Deployment
- Frontend: Netlify
- Backend: AWS/Heroku

## Project Structure

```
Project_Shelf/
├── Frontend/       # React frontend application
├── Backend/        # Java Spring Boot backend
└── README.md       # Project documentation
```

## Setup Instructions

### Frontend Setup

```bash
# Navigate to frontend directory
cd Frontend

# Install dependencies
npm install

# Start development server
npm start
```

### Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Build with Maven
mvn clean install

# Run the application
mvn spring-boot:run
```

## API Documentation

API documentation is available at `/api/docs` when running the backend server.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Demo Credentials

To explore the full functionality of ProjectShelf, you can use these demo credentials:

- **URL:** [https://project-shelf.netlify.app](https://project-shelf.netlify.app)
- **Username:** rawatshubham1645@gmail.com
- **Password:** demo@123

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please contact the project maintainer.
