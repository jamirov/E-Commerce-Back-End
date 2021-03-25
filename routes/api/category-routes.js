const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try{
  const allCat = await Category.findAll({
    include: [
      {
      model: Product,
      }
    ],
  });
  // be sure to include its associated Products
  return res.status(200).json(allCat);
  } catch (err){
    res.status(500).json(err);
  };
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try{
  const catById = await Category.findByPk(req.params.id,{

    include: [
      {
      model: Product,
      }
    ],
    
  });
  return res.status(200).json(catById);
} catch (err){
  res.status(400).json(err);
}
  
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try{
  const newCat = await Category.create(req.body);
  return res.status(200).json(newCat);
  } catch (err){
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
  const catData = await Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where:{
        id: req.params.id
      }
    } 
  );
  if (!catData) {
    res.status(404).json({message: ' Category  not found !'})
  }
  return res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
  const catDelData = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
  if (!catDelData){
    res.status(404).json({message: ' Category  not found !'})
  }
  return res.status(200).json(catDelData);
} catch (err){
  res.status(400).json(err);
}
});

module.exports = router;
