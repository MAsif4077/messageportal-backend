const Client = require('../models/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

exports.createSuperAdmin = async (req, res) => {
    const { name, email, number, address, password } = req.body;

    const lowercaseEmail = email.toLowerCase();

    try {
        const superAdminData = {
            name,
            email: lowercaseEmail,
            number,
            address,
            role: 'SuperAdmin',
            password 
        };

        const superAdmin = await Client.create(superAdminData);

        return res.status(200).json({
            status: 200,
            success: true,
            message: "SuperAdmin Created Successfully",
            data: superAdmin
        });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: error.message
        });
    }
};




exports.superAdminLogin = async (req, res) => {
    let { email, password } = req.body;
    email = email.toLowerCase();
    password = password.trim();
    console.log("body",req.body)
   
    try {
        if (!email || !password) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'Email and password are required.'
            });
        }

        const superAdmin = await Client.findOne({ email: email, role: 'superAdmin' });
console.log("super admin",superAdmin)
        if (!superAdmin) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Super Admin not found.'
            });
        }

        const isMatch = await bcrypt.compare(password, superAdmin.password);

        if (!isMatch) {
            return res.status(401).json({
                status: 401,
                success: false,
                message: 'Invalid password.'
            });
        }

        const token = jwt.sign({ id: superAdmin._id, role: superAdmin.role }, process.env.jwt_secret, { expiresIn: '1h' });

        return res.status(200).json({
            status: 200,
            success: true,
            message: 'Login successful.',
            data: {
                id: superAdmin._id,
                name: superAdmin.name,
                email: superAdmin.email,
                role: superAdmin.role,
                token 
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        });
    }
};



exports.createClient = async (req, res) => {
    const { name, email, number, address, parentClient, role } = req.body;
    console.log("Bodey........",req.body)

    try {
        if (role === 'SubClient' && !parentClient) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'SubClient must have a parent client.'
            });
        }

        if (role === 'SuperAdmin') {
            return res.status(400).json({
                status: 400,
                success: false,
                message: 'SuperAdmin cannot be created here.'
            });
        }

        const clientData = {
            name,
            email,
            number,
            address,
            role: role || 'Client'
        };

        if (role === 'SubClient') {
            clientData.parentClient = parentClient;
        }

        const client = await Client.create(clientData);

        return res.status(200).json({
            status: 200,
            success: true,
            message: `${role} Created Successfully`,
            data: client
        });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: error.message
        });
    }
};




exports.getAllClients = async (req, res) => {
    try {
        const clients = await Client.find();

        if (!clients.length) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'No Clients Found'
            });
        }

        const users = {
            all: clients,
            superAdmin: clients.filter(client => client.role === 'superAdmin'),
            clients: clients.filter(client => client.role === 'client'),
            subClients: clients.filter(client => client.role === 'subClient')
        };

        return res.status(200).json({
            status: 200,
            success: true,
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        });
    }
};


exports.updateClient = async (req, res) => {
    console.log("body",req.body)
    console.log("req id",req.params.id)
    try {
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log("Cllllllll",client)
        if (!client) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Client Not Found'
            });
        }
        return res.status(200).json({
            status: 200,
            success: true,
            message: 'Client Updated Successfully',
            data: client
        });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: error.message
        });
    }
};
exports.getClient = async (req, res) => {
    try {
        const clients = await Client.find({_id:req.params.id});
        if (!clients.length) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'No Clients Found'
            });
        }
        return res.status(200).json({
            status: 200,
            success: true,
            data: clients
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        });
    }
};
exports.deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Client Not Found'
            });
        }
        return res.status(200).json({
            status: 200,
            success: true,
            message: 'Client Deleted Successfully'
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        });
    }
};

exports.banClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(req.params.id, { isBanned: true }, { new: true });
        if (!client) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: 'Client Not Found'
            });
        }
        return res.status(200).json({
            status: 200,
            success: true,
            message: 'Client Banned Successfully',
            data: client
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: error.message
        });
    }
};
