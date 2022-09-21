//Iniciar nodejs npm init -y
//Traer el modulo fs
const { log } = require('console');
const fs = require('fs');

class Contenedor  {
    nombreArchivo = ""
    constructor(nombreArchivo) {
        this.nombreArchivo = `./${nombreArchivo}.json`;
  
    };
    //valor id 
    //Recibe un objeto, lo guarda en el archivo, y devuelve el id asignado
    async save(obj) {
      let id =1;
     // console.log(this.getAll());
      if(await this.getAll() ===undefined ){
          try {
            obj.id =id;
            obj=[obj];
            const strings = JSON.stringify(obj); //trasnformo el archivo a string
            await fs.promises.writeFile(`${this.nombreArchivo}`, strings );
            console.log("done"); 
          }    
          catch (error) {
                console.log("No fue posible crear el archivo", error);
          }
         }
     else {
            const  archivos = await this.getAll();
            if(archivos.id ==1){
                try{
                let id =archivos.id++
                obj.id =id;  
                const strings = JSON.stringify(archivos); //trasnformo 
                const result = strings.concat(JSON.stringify(obj)); 
                await fs.promises.writeFile(`${this.nombreArchivo}`, result);
                console.log("archivo 2 agregado");
                }catch (error) {
                    console.log("no se pudo agregar el archivo 2");
                }
               
            }else{
            console.log(archivos.length);
            let id = archivos[archivos.length-1].id
            id++;
            obj.id = id;
            archivos.push(obj)

           const archivoString = JSON.stringify(archivos)
           await fs.promises.writeFile(`${this.nombreArchivo}`, archivoString );
            console.log("done");  //

            
           }
            
    }
}

    //recibe un id y devuelve el objeto con ese id, o null si no existe
    async getById(number) {
        try {
            const leerById = await fs.promises.readFile(`${this.nombreArchivo}/`,'utf-8');
            const leerbyIdObjt = JSON.parse(leerById)
            const encontrado = leerbyIdObjt.find(item => item.id === number)
            if(encontrado === undefined){
                console.log("Id no Valido");
            }else{
                console.log(encontrado);
            }
        } catch (error) {
            console.log("Id no valido!");
        }
    };

    //Devuelve todo los objetos presentes
    async getAll() {
        try{
            const leer = await fs.promises.readFile(`${this.nombreArchivo}`, "utf-8") || "{}";
            const leerObj = JSON.parse(leer);
            console.log(leerObj);
            return leerObj;
        }catch (error){
        const leer = undefined
            return leer; //
        }

    };

    //void Borra un objeto del archivo con el id.
    async deleteById(id) {
        try {
            const leer = await fs.promises.readFile(`${this.nombreArchivo}`, "utf-8");
            const leerObj = JSON.parse(leer);
            const encontrado = leerObj.filter(item => item.id !== id)
            //console.log("archivo:",encontrado);
            if(!encontrado){
                console.log("no existe ese archivo");
            }else{
                const encontradoString = JSON.stringify(encontrado);
                await fs.promises.writeFile(`${this.nombreArchivo}`, encontradoString);
                console.log("archivo eliminado correctamente, Documento nuevo: ",encontrado);
            }

        } catch (error) {
            console.log("archivo3:",error);
        }
    };

    //void Borra todo los objetos presentes
    async deleteAll() {
       try {
        await fs.promises.unlink(`${this.nombreArchivo}`);
        console.log("Documento Eliminado!");
       } catch (error) {
        console.log("Error: " + error);
       }
    }; 

};
const producto = new  Contenedor('producto'  
)
//    producto.save({
//        modelo: 'Jordans', 
//        precio: 400, 
//        link:'https://nikeclprod.vteximg.com.br/arquivos/ids/430617-1000-1000/553558_163_A_PREM.jpg?v=637842644141630000'
//   });

//producto.getAll(); //funciona

//producto.getById(3); //funciona

producto.deleteById(2);

producto.getAll();

producto.deleteAll();
// producto.save({
//     modelo: 'MSI', 
//     precio: 1200, 
//     link:'https://nikeclprod.vteximg.com.br/arquivos/ids/430617/553558_163_A_PREM.jpg?v=637842644140'
// });
//producto.getAll();
/*const objetos =[{
    modelo: 'Jordans', 
    precio: 400, 
    link:'https://nikeclprod.vteximg.com.br/arquivos/ids/430617-1000-1000/553558_163_A_PREM.jpg?v=637842644141630000'
},
{
    modelo: 'MSI', 
    precio: 1200, 
    link:'https://nikeclprod.vteximg.com.br/arquivos/ids/430617/553558_163_A_PREM.jpg?v=637842644140'
}];*/