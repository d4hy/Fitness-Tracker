Hi! My application is a website that uses SQL, CORS, and Express to let you record your reps, weight, and sets for your workouts. You can create entries, edit them, view them, delete them, and track your personal records for the highest weight you’ve lifted for each exercise.

The app uses my personal dataset, which I imported as an SQL file. To run it locally, you’ll need to use a service like XAMPP to provide the MySQL database (you won’t need to use Apache, since Express serves the app directly).

After launching XAMPP and starting MySQL, navigate to the backend directory and run:

npm install
npm start
