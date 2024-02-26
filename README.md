# Just Another Text Editor (JATE)

JATE is a simple text editor web application built with modern web technologies. It allows users to create and save notes or code snippets with or without an internet connection. The application features data persistence using IndexedDB, enabling users to reliably retrieve their content for later use, even when offline.

## Features

- Create and edit notes or code snippets
- Data persistence using IndexedDB
- Offline functionality
- Service worker for caching static assets
- Progressive Web Application (PWA) support
- Bundled with webpack
- Modern JavaScript (ES6+) syntax using babel
- User-friendly interface

## Installation

To run the JATE application locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory using your terminal.
3. Install dependencies using the following command: npm install
4. Build the application using webpack: npm run build
5. Start the server: npm start
6. Open your web browser and visit `http://localhost:3000` to access the application.

## Usage

Once the application is running, you can start using JATE to create, edit, and save your notes or code snippets. The application automatically saves your content to IndexedDB, ensuring data persistence even when offline.

## Technologies Used

- HTML
- CSS
- JavaScript (ES6+)
- IndexedDB
- Webpack
- Babel
- Workbox
- Express.js

## Contributing

Contributions are welcome! If you have suggestions for improvements or find any issues, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).



