import express from 'express';
import connectToDB from './db.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import drugStores from './models/drugStoresModel.js';
import ordersModel from './models/ordersModel.js';
import mocketStores from './mocketStores.js';

const app = express();
const PORT = process.env.PORT || 3001;

connectToDB();

const checkCollection = async () => {
  const count = await drugStores.countDocuments({});

  if (!count) {
    for (let mockedStore of mocketStores) {
      const newDrugStores = new drugStores(mockedStore);
      await newDrugStores.save();
    };
  }
}

checkCollection();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`Listening port ${PORT}`)
});

const getOrderDTO = async (order) => {
  const products = [];

  for (let productModel of order.products) {
    const store = await drugStores.findOne({ _id: productModel.storeId });

    const product = store.drugs.find(product => productModel.productId === product._id.toString());

    products.push({ name: product.name, price: product.price, img: product.img, productId: product._id, count: productModel.count, store: { name: store.name, _id: store._id } });
  }

  const totalPrice = products.reduce((acc, { price, count }) => acc + price * count, 0);

  return Promise.resolve({ ...order, products, totalPrice });
}

app.get("/api/store", async (req, res) => {
  const store = await drugStores.find({});
  res.json(store);
});

app.get("/api/store/:storeId", async (req, res) => {
  const store = await drugStores.find({ _id: req.params.storeId });
  res.json(store);
});

app.get("/api/order/draft", async (req, res) => {
  let order = await ordersModel.findOne({ status: "draft" });

  if (!order) {
    const newOrder = new ordersModel({
      status: 'draft',
      name: '',
      email: '',
      phone: '',
      address: '',
      products: [],
    });

    order = await newOrder.save();
  }

  const orderDTO = await getOrderDTO(order);
  res.json(orderDTO);
});

app.get("/api/order/all", async (req, res) => {
  const orders = await ordersModel.find({ status: 'order' });

  const orderDTOs = [];

  for (let order of orders) {
    const orderDTO = await getOrderDTO(order);
    orderDTOs.push(orderDTO);
  }

  res.json(orderDTOs);
});

app.patch('/api/order/edit-cart', async (req, res) => {
  const order = await ordersModel.findOne({ status: "draft" });
  const { storeId, productId, count } = req.body;

  if (!order) {
    return res.status(400).end();
  }

  const products = [...order.products];

  let productIndex = order.products.findIndex(product => product.storeId === storeId && product.productId === productId);

  if (productIndex < 0) {
    productIndex = products.length;
  }

  if (count === 0) {
    products.splice(productIndex, 1);
  } else {
    products[productIndex] = { storeId, productId, count };
  }

  const updatedOrder = await ordersModel.findOneAndUpdate({ _id: order.id }, { products }, { new: true });
  
  const orderDTO = await getOrderDTO(updatedOrder);

  res.json(orderDTO);
});

app.put('/api/order/place-order', async (req, res) => {
  const { name, email, phone, address } = req.body;

  const order = await ordersModel.findOne({ status: "draft" });

  if (!order) {
    return res.status(400).end();
  }

  const updatedOrder = await ordersModel.findOneAndUpdate({ _id: order.id }, { name, email, phone, address, status: "order" }, { new: true });

  const orderDTO = await getOrderDTO(updatedOrder);

  res.json(orderDTO);
});