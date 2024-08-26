import app from './app';  // Import the app from the server file

const port = process.env.PORT || 3000;  // You can set the port via an environment variable or default to 3000

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});