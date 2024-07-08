# CSV Visualizer App (NODE-Repository-REST-API + UI)

An application to upload CSV files and visualize the data within it. Can also sort the data and see the bar graph for each column (only if the column has numeric data). Backend built with the repository-API pattern. Simple frontend build with html, css, js and bootstrap for the interaction.

## Table of Contents

- [Backend Features](#backend-features)
- [Frontend Features](#frontend-features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Backend Features

- Add
- Get by id
- Get all
- Delete

## Frontend Features

1. Input to upload a csv file.

- Can upload only CSV files.

2. Section to see the files available.

- After upload, you can see the file name here.
- On clicking any of these files names, the data will appear in the next section.

3. Section to see the file data in table format

- On selecting any file, you can see the data here in the table format.
- Each column has the features: sort(ascending & descending) and chart the column data

4. Search box to search the content of the table works for the first data column.

- A search box to filter the table content.(applied only for the first data column\*)

5. Pagination for the table data

- Each page is limited to 100 rows.
- You can select the pagination numbers to get the pages you want.

## Prerequisites

- Node.js (>=14.x)
- npm (>=6.x)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kirankumar-Matham96/CSV-Visualizer-App.git

   ```

2. Install the dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:

- Create a `.env` file in the root directory and add the following:
  ```bash
    URL=<db_url>
  ```

4. Start the application:

- if dev:

```bash
npm run dev
```

- if production

```bash
 npm run start
```

5. Open your browser and navigate to `http://localhost:3000`

- NOTE: If you want to run the app locally, you need to comment the live url in /public/index.js(You can see the comment in the file to follow).

6. Open index.html from the public folder using live server to interact with UI.

## Project Structure

    CSV Visualizer App
    ├── public/
    | ├── index.css
    | ├── index.html
    | └──index.js
    ├── src/
    │ ├── config/
    │ │ └── db.config.js
    │ ├── features/
    │ │ └── CSV/
    │ │   ├── csv.controller.js
    │ │   ├── csv.repository.js
    │ │   ├── csv.routes.js
    │ │   └── csv.schema.js
    | └── middlewares/
    │   ├── errorHandler.middleware.js
    │   ├── formValidation.middleware.js
    │   ├── multer.middleware.js
    │   └── unknownPathHandler.middleware.js
    ├── uploads/
    ├── .env
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── server.js

## API Endpoints

### Postman Collection

```bash
  https://www.postman.com/kirankumar96/workspace/kirankumar-matham-public-workspace/collection/15920123-ea4612f6-489f-4ee0-bda4-d29626454a8f?action=share&creator=15920123
```

### Backend Routes

- `POST /api/csv/`: Add a file
- `GET /api/csv`: Get all files
- `GET /api/csv/<file_id>`: Get a file by id
- `DELETE /api/csv/<file_id>`: Delete a file by id

## Technologies Used

- Node.js
- Express
- MongoDB (DataBase)
- mongoose
- dotenv
- cors
- csv-parser
- multer
- REST Full API

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
