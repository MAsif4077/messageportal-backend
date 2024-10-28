const RateCard = require('../models/rateCard');

exports.createRateCard = async (req, res) => {
    const { prefix, rate } = req.body;
    try {
        const rateCard = await RateCard.create({ prefix, rate });
        return res.status(201).json({
            status: 201,
            success: true,
            message: "Rate Card Created Successfully",
            data: rateCard
        });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: error.message
        });
    }
};

exports.getRateCards = async (req, res) => {
    try {
        const rateCards = await RateCard.find();
        if (!rateCards.length) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "No Rate Cards Found"
            });
        }
        return res.status(200).json({
            status: 200,
            success: true,
            data: rateCards
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        });
    }
};

exports.getRateCardById = async (req, res) => {
    try {
        const rateCard = await RateCard.findById(req.params.id);
        if (!rateCard) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Rate Card Not Found"
            });
        }
        return res.status(200).json({
            status: 200,
            success: true,
            data: rateCard
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        });
    }
};

exports.updateRateCard = async (req, res) => {
    try {
        const rateCard = await RateCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!rateCard) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Rate Card Not Found"
            });
        }
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Rate Card Updated Successfully",
            data: rateCard
        });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: error.message
        });
    }
};

exports.deleteRateCard = async (req, res) => {
    try {
        const rateCard = await RateCard.findByIdAndDelete(req.params.id);
        if (!rateCard) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Rate Card Not Found"
            });
        }
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Rate Card Deleted Successfully"
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        });
    }
};
