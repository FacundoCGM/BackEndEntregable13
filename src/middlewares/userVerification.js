export const checkUserRole = (role) => {
    return (req, res, next) => {
        if (req.isAuthenticated() && req.user.role === role) {
            return next();
        } else {
            return res.status(403).json({ message: "Acceso no autorizado." })
        }
    }
}