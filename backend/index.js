const app = require("./app");
const { API_PORT } = process.env;
// Setting up port
const PORT = process.env.PORT || API_PORT;

//server listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
