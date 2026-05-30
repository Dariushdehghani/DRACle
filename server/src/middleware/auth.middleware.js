export const verifyAuth = async (req, res) => {
    try {
        req.jwtVerify()
    } catch {
        return reply
        .status(401)
        .send({
            message: "Unauthorized"
        })
    }
}