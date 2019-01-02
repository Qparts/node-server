const data = require('../../../partsForm.json');

const getData = (req, res) => {
 const { product, makeId } = req.params;
 const findProducts = data.filter(productId => makeId === productId.makeId);
 let result;

 if (findProducts.length <= 0 || !product) return res.send(result);

 result = findProducts.find(serverProduct => serverProduct.partNumber === product);


 res.send(result)

}


module.exports = {
 getData
}