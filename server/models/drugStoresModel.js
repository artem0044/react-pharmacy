import mongoose from "mongoose";

const drugSchema = new mongoose.Schema({
    name: String,
    price: String,
    img: String,
});

const drugStoresSchema = new mongoose.Schema({
    name: String,
    drugs: [drugSchema],
});

export default mongoose.model('drugstorescolellections', drugStoresSchema);