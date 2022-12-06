function isAdmin(req, res, next) {
    if (req.auth.role !== "ADMIN") {
        return res.status(403).json({msg: "Usuário não autorizado para esta rota!"})
    }
    next()
}

export default isAdmin