const MessageLog = require('../models/messageLog');

exports.createMessageLog = async (req, res) => {
    const { senderNumber, receiverNumber, message, characterCount, balanceDeducted, clientId } = req.body;

    try {
        const messageLog = await MessageLog.create({
            senderNumber,
            receiverNumber,
            message,
            characterCount,
            balanceDeducted,
            clientId,
        });
        return res.status(201).json({
            status: 201,
            success: true,
            message: "Message Log Created Successfully",
            data: messageLog
        });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: error.message
        });
    }
};

exports.getClientMessageLogs = async (req, res) => {
    try {
        const logs = await MessageLog.find({ clientId: req.params.clientId }).populate('clientId', 'name number');
        if (!logs.length) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'No Message Logs Found for This Client'
            });
        }
        return res.status(200).json({
            status: 200,
            success: true,
            data: logs
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        });
    }
};

exports.getMessageLog = async (req, res) => {
    try {
        const log = await MessageLog.findById(req.params.id);
        if (!log) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Message Log Not Found'
            });
        }
        return res.status(200).json({
            status: 200,
            success: true,
            data: log
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        });
    }
};

exports.getAllMessageLogs = async (req, res) => {
    try {
        const logs = await MessageLog.find().populate('clientId', 'name number');
        if (!logs.length) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'No Message Logs Found'
            });
        }
        return res.status(200).json({
            status: 200,
            success: true,
            data: logs
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        });
    }
};

exports.deleteMessageLog = async (req, res) => {
    try {
        const log = await MessageLog.findByIdAndDelete(req.params.id);
        if (!log) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Message Log Not Found'
            });
        }
        return res.status(200).json({
            status: 200,
            success: true,
            message: 'Message Log Deleted Successfully'
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        });
    }
};
