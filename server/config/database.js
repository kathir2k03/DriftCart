const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${con.connection.host}`);
    } catch (err) {
        console.error("DB CONNECTION ERROR:", err.message);
    }
};

module.exports = connectDatabase;