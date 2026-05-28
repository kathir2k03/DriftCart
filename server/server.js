const app = require('./app');
const connectDatabase = require('./config/database');

connectDatabase();

// LOCAL ONLY
if (process.env.NODE_ENV !== "production") {

    const PORT = process.env.PORT || 8000;

    app.listen(PORT, () => {
        console.log(`Server is listening on port : ${PORT}`);
    });

}

module.exports = app;