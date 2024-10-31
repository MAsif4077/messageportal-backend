const Number = require('../models/number');

exports.createNumber = async (req, res) => {
    try {
        const { clientId, number } = req.body;
        const newNumber = await Number.create({ clientId, number });
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Number Created Successfully",
            data: newNumber
        });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: error.message
        });
    }
};

exports.getNumbersByClientId = async (req, res) => {
    try {
        const numbers = await Number.find({ clientId: req.params.clientId });
        if (!numbers.length) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "No Numbers Found for This Client"
            });
        }
        return res.status(200).json({
            status: 200,
            success: true,
            data: numbers
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        });
    }
};

exports.getAllNumbers = async (req, res) => {
    try {
        const num = await Number.find().populate('clientId');

        if (!num.length) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "No Numbers Found"
            });
        }

        const numbers = num.map(number => ({
            _id: number._id,
            number: number.number,
            clientName: number.clientId?.name || 'N/A', 
            clientEmail: number.clientId?.email || 'N/A',
            
        }));

        return res.status(200).json({
            status: 200,
            success: true,
            data: numbers
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        });
    }
};


exports.updateNumber = async (req, res) => {
    try {
        const updatedNumber = await Number.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedNumber) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Number Not Found"
            });
        }
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Number Updated Successfully",
            data: updatedNumber
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        });
    }
};

exports.deleteNumber = async (req, res) => {
    try {
        const number = await Number.findByIdAndDelete(req.params.id);
        if (!number) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Number Not Found"
            });
        }
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Number Deleted Successfully"
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        });
    }
};
