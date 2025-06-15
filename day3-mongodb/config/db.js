// vscode
// mongodb+srv://mallikarjunaannigeri27:<db_password>@cluster0.qxnxcgw.mongodb.net/

const { default: mongoose } = require("mongoose");

// drivers
// mongodb+srv://mallikarjunaannigeri27:<db_password>@cluster0.qxnxcgw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const connectDB = async () => {
    mongoose.connect("mongodb+srv://mallikarjuna27:Ajju_2748@cluster0.xzom9qc.mongodb.net/todosApp").then(() => {
        console.log("db connection successful");
    }).catch((err) => {
        console.log("db connection failed", err);
    });
}

module.exports = connectDB;