export const isAdmin = async (err, req, res, next) => {
    if (req.user.role !== 'admin') {
        console.error('Unauthorized access attempt detected:', err);
        return res.status(403).json({ message: 'Forbidden - Admin access required' });
    }
    next();
}