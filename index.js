const Container  = require('./Liberona_sebastian.js');

const producto = new  Container('producto'
)
 producto.save({ modelo: 'Jordans', precio: 400, link:'www.jordans.com'
   })
   .then((id) => console.log({id}))
   .catch((err) => console.log({err}));
// producto.save({ modelo:"Convers",precio:200,link:"www.nikeclprod.vteximg.com"
//  });
// producto.save({modelo:"Air",precio:300,link:"www.nikeclprod.vteximg.com"
// });
// producto.save({ modelo:"Zyco",precio:999,link:"www.nikeclprod.vteximg.com"
//  });
// producto.save({modelo:"NewBalance",precio:350,link:"www.nikeclprod.vteximg.com"
//  });

producto.getAll()
.then((data) =>console.log({data}))
.catch((err)=>console.log({ err })); //funciona
//producto.getById(3); //funciona
//producto.deleteById(2); //funciona
//producto.deleteAll(); //funciona
