const mongoose = require("mongoose");

const PurchaseModel = new mongoose.Schema(
    {
        stripeId: {
            type: String,
            index: true,
            unique: true
        },
        items:[
            {
                itemId:{
                    type: String
                },
                quantity: {
                    type: Number
                },
                unitPrice:{
                    type: Number
                },
            }
        ],
        stage:{
            type: String,
            default: "processing"
        },
    },{
        timestamps: true
    });

module.exports =  mongoose.models.Purchase || mongoose.model("Purchase",PurchaseModel);
