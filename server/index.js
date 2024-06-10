const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Contact = require("./model/schema");
const bodyParser = require('body-parser');
const {upload} = require("./middleware/middleware");
const path = require('path');



require("dotenv").config();

const port = process.env.PORT || "3002";
const MONGO_URL = process.env.MONGO_URL;
// const profile = 'http://localhost:5000/static/profile.png';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use('/static', express.static(path.join(__dirname, 'public')));

//Get contact by ID
app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getContact = await Contact.findById(id);
    res.status(200).json(getContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Get all contacts
app.get("/", async (req, res) => {
  try {
    const allContact = await Contact.find({});
    res.status(200).json(allContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create/Add new contacts
app.post("/create", upload.single('image'), async (req, res) => {
  try {
    // const imagePicker = req.file ? req.file.path : null ;

    const createContact = new Contact({
      
      name: req.body.name,
      address:req.body.address,
      email: req.body.email,
      number: req.body.number,
      image: req.file.buffer, 
      imageType: req.file.mimetype
    });

    const createdContact = await createContact.save();

    res.status(200).json(createdContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update contacts
app.put("/update/:id", upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    // const imagePicker = req.file ? req.file.path : null ;
    const updateContact = await Contact.findByIdAndUpdate(
      { _id: id },
      {
        // _id: req.body.id,
        name: req.body.name,
        address:req.body.address,
        email: req.body.email,
        number: req.body.number,
        image: req.file.buffer, 
        imageType: req.file.mimetype
      },
      { new: true }
    );

    if (!id) {
      return res
        .status(400)
        .json({ message: `Can not find any contact with ${id}` });
    }
    // const updatedContact = await Contact.findById(id);
    res.status(200).json(updateContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Contacts
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteContact = await Contact.findByIdAndDelete(id);
    if (!id) {
      return res
        .status(400)
        .json({ message: `Can not find contact with ${id}` });
    }

    res.status(200).json(deleteContact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// mongoose.connect(MONGO_URL)

// const db = mongoose.connection

// db.on('error', (error) => console.log(error));
// db.once('open', () => console.log('Database connected successfully'))

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Database connection error:", error.message);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});




// I want to create this type of form https://talent.testgorilla.com/profile/create