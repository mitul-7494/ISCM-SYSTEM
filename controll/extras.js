const items = require('../model/items');
const it = items.items;

exports.additems = async (req, res) => {
    const { data } = req.body
    try {
        for (let index = 0; index < data.length; index++) {
            const {id,title,price,thumbnail} = data[index];
            await it.create({
            id,
            title,
            price,
            thumbnail
        })
        }
            res.status(200).json({
              message: "admin successfully created"
            })
      
    } catch (err) {
      res.status(401).json({
        message: "User not successful created",
        error: err.mesage
      })
    }
}