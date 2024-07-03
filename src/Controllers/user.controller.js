// controllers/user.controller.js

const User = require('../models/user.model');
const logger = require('../utils/logger');

exports.changeUserRole = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findById(uid);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const requiredDocuments = ['Identificación', 'Comprobante de domicilio', 'Comprobante de estado de cuenta'];
    const uploadedDocuments = user.documents.map(doc => doc.name);

    if (user.role === 'user') {
      const hasAllDocuments = requiredDocuments.every(doc => uploadedDocuments.includes(doc));
      if (!hasAllDocuments) {
        return res.status(400).json({ message: 'User has not uploaded all required documents' });
      }
      user.role = 'premium';
    } else {
      user.role = 'user';
    }

    await user.save();
    res.status(200).json({ message: `User role updated to ${user.role}` });
    logger.info(`User role updated to ${user.role} for user ${user.email}`);
  } catch (error) {
    logger.error('Error updating user role:', error);
    res.status(500).json({ message: error.message });
  }
};
