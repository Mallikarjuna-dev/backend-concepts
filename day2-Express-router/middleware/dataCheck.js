// Middleware to check the required fields
const dataCheck = (req, res, next) => {
    let { name, instructor, duration } = req.body;
    if (!name || !instructor || !duration) {
        return res.status(406).json({ msg: "Please provide all required fields: name, instructor, and duration." });
    }
    next();
}

module.exports = dataCheck;