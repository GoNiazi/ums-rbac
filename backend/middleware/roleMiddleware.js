import Role from '../models/Role.js';

export default (permission) => async (req, res, next) => {
    try {
        const userRoles = await Role.find({ _id: { $in: req.user.roles } }).populate('permissions');
        const hasPermission = userRoles.some(role =>
            role.permissions.some(p => p.name === permission)
        );
        if (!hasPermission) return res.status(403).json({ message: 'Permission denied' });
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};