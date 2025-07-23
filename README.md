# BookVinema - Movie Booking System

A Django-based movie ticket booking system that allows users to browse movies, select seats, and book tickets online.

## Features

- **Movie Browsing**: Browse available movies with detailed information
- **Seat Selection**: Interactive seat selection interface
- **Ticket Booking**: Complete booking process with user authentication
- **Responsive Design**: Mobile-friendly interface
- **User Authentication**: Secure login and registration system

## Project Structure

```
booKVinemamain/
├── authentication/          # Django app for user authentication
│   ├── migrations/         # Database migrations
│   ├── models.py          # Database models
│   ├── views.py           # View functions
│   └── urls.py            # URL routing
├── gfg/                   # Main Django project
│   ├── settings.py        # Project settings
│   ├── urls.py            # Main URL configuration
│   └── wsgi.py            # WSGI configuration
├── static/                # Static files
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   └── images/            # Image assets
├── templates/             # HTML templates
│   ├── index2.html        # Main page
│   ├── searchPage.html    # Movie search page
│   ├── bookingPage.html   # Seat booking page
│   └── ticket.html        # Ticket confirmation page
└── manage.py              # Django management script
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd booKVinemamain
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install django
   pip install pillow  # For image handling
   ```

4. **Run migrations**
   ```bash
   python manage.py migrate
   ```

5. **Create a superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

6. **Start the development server**
   ```bash
   python manage.py runserver
   ```

7. **Access the application**
   Open your browser and navigate to `http://127.0.0.1:8000/`

## Usage

### Main Features

1. **Home Page**: Browse featured movies and navigate to different sections
2. **Search Movies**: Search for specific movies and view details
3. **Book Tickets**: Select seats and complete the booking process
4. **View Tickets**: Confirm booking details and generate tickets

### Database Models

The application includes the following main models:

- **MovieRecord**: Stores movie information
- **FinalData**: Handles booking data and seat information
- **User Authentication**: Built-in Django user system

## File Descriptions

### Templates
- `index2.html`: Main landing page with movie showcase
- `searchPage.html`: Movie search and selection interface
- `bookingPage.html`: Interactive seat selection page
- `ticket.html`: Ticket confirmation and details page

### Static Files
- `indexPage.css`: Styles for the main page
- `searchPage1.css`: Styles for the search page
- `booking1.css`: Styles for the booking interface
- `ticket2.css`: Styles for the ticket page
- `mainPageJS.js`: JavaScript for main page functionality
- `searchPage.js`: JavaScript for search functionality
- `bookingPage.js`: JavaScript for seat selection
- `ticket.js`: JavaScript for ticket generation

## Technologies Used

- **Backend**: Django (Python web framework)
- **Frontend**: HTML5, CSS3, JavaScript
- **Database**: SQLite (default Django database)
- **Styling**: Custom CSS with responsive design
- **Icons**: Custom PNG icons for social media and UI elements

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request
