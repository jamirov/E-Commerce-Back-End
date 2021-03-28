const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/',async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const allTag = await Tag.findAll({
      include: [
        {
        model: Product,
        },
      ],
    });
    // be sure to include its associated Products
    return res.status(200).json(allTag);
    } catch (err){
      res.status(500).json(err);
    };
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagById = await Tag.findByPk(req.params.id,{
  
      include: [
        {
        model: Product,
        }
      ],
      
    });
    return res.status(200).json(tagById);
  } catch (err){
    res.status(400).json(err);
  }


});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const newTag = await Tag.create(req.body);
    return res.status(200).json(newTag);
    } catch (err){
      res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const tagData = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where:{
          id: req.params.id
        }
      } 
    );
    if (!tagData) {
      res.status(404).json({message: 'Tag not found !'})
    }
    return res.status(200).json(tagData);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagDelData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagDelData){
      res.status(404).json({message: ' Category  not found !'})
    }
    return res.status(200).json(tagDelData);
  } catch (err){
    res.status(400).json(err);
  }
});

module.exports = router;
