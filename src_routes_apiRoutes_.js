

const express = require("express");
const router = express.Router();
let dishes = require("../models/dishModel");


router.get("/dishes", (req, res) => {
  try {
    res.status(200).json({
      status: 200,
      message: "Dishes retrieved successfully",
      data: dishes
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      data: null
    });
  }
});


router.get("/dishes/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const dish = dishes.find(d => d.id === id);

    if (!dish) {
      return res.status(404).json({
        status: 404,
        message: "Dish not found",
        data: null
      });
    }

    res.status(200).json({
      status: 200,
      message: "Dish retrieved successfully",
      data: dish
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      data: null
    });
  }
});


router.post("/dishes", (req, res) => {
  try {
    const { name, price, category } = req.body;

   
    if (!name || !price || !category) {
      return res.status(400).json({
        status: 400,
        message: "Missing required fields: name, price, category",
        data: null
      });
    }

    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).json({
        status: 400,
        message: "Price must be a positive number",
        data: null
      });
    }

    const newDish = {
      id: Math.max(...dishes.map(d => d.id), 0) + 1,
      name,
      price,
      category
    };

    dishes.push(newDish);

    res.status(201).json({
      status: 201,
      message: "Dish created successfully",
      data: newDish
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      data: null
    });
  }
});


router.put("/dishes/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, price, category } = req.body;

   
    const dishIndex = dishes.findIndex(d => d.id === id);
    if (dishIndex < 0) {
      return res.status(404).json({
        status: 404,
        message: "Dish not found",
        data: null
      });
    }

   
    if (!name || !price || !category) {
      return res.status(400).json({
        status: 400,
        message: "Missing required fields: name, price, category",
        data: null
      });
    }

    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).json({
        status: 400,
        message: "Price must be a positive number",
        data: null
      });
    }

   
    dishes[dishIndex] = { id, name, price, category };

    res.status(200).json({
      status: 200,
      message: "Dish updated successfully",
      data: dishes[dishIndex]
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      data: null
    });
  }
});


router.delete("/dishes/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const dishIndex = dishes.findIndex(d => d.id === id);

    if (dishIndex < 0) {
      return res.status(404).json({
        status: 404,
        message: "Dish not found",
        data: null
      });
    }

    const deletedDish = dishes.splice(dishIndex, 1)[0];

    res.status(200).json({
      status: 200,
      message: "Dish deleted successfully",
      data: deletedDish
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      data: null
    });
  }
});

module.exports = router;