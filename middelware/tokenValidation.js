const jwt = require("jsonwebtoken");

const validate = async (req, res, next) => {
    try {
        const auth = req.headers.authorization || req.headers.Authorization;
       

        if (!auth || !auth.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = auth.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            req.user = decode;
            next(); // Move to the next middleware/controller
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = validate;
