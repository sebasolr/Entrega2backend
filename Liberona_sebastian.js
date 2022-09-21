const fs = require('fs');//Traer el modulo fs
//crear clase contenedor
class Contenedor  {
    nombreArchivo = ""
    constructor(nombreArchivo) {
        this.nombreArchivo = `./${nombreArchivo}.json`; //defino la ruta para ahorrar tiempo
    };
    async save(obj) {
        let id =1;//defino un id
        if(await this.getAll() ===undefined ){ //si el archivo no existe crea el primer documento
          try {
            obj.id =id;
            obj=[obj];
            const strings = JSON.stringify(obj); //trasnformo el archivo a string
            await fs.promises.writeFile(`${this.nombreArchivo}`, strings );//creo el documento
            console.log("Primer Archivo Creado"); //utilizo el log como un callback para saber si el archivo se creo
          }    
          catch (error) {
                console.log("No fue posible crear el archivo", error);
          }
         }
        else { //si el documento existe
            const  archivos = await this.getAll();
            if(archivos.id ==1){//si el id es igual a 1 (solo funciona en el primer caso)
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
            }else{//como no encuentra el id igual a 1, hace lo siguiente.
            let id = archivos[archivos.length-1].id
            id++;
            obj.id = id; //defino el id nuevo
            archivos.push(obj) //agrego el objeto al array.
            const archivoString = JSON.stringify(archivos)
            await fs.promises.writeFile(`${this.nombreArchivo}`, archivoString );//escribo el archivo con la nueva informacion.
            console.log("done");  //
           }
    }
}
    async getById(id) {
        try {
            const leerById = await fs.promises.readFile(`${this.nombreArchivo}/`,'utf-8');//abro el archivo
            const leerbyIdObjt = JSON.parse(leerById)//lo transformo en objeto
            const encontrado = leerbyIdObjt.find(item => item.id === id)//busco en base al id
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
// producto.save({ modelo: 'Jordans', precio: 400, link:'www.jordans.com'
//   });
producto.save({ modelo:"Convers",precio:200,link:"www.nikeclprod.vteximg.com"
 });
 producto.save({modelo:"Air",precio:300,link:"www.nikeclprod.vteximg.com"
 });
 producto.save({ modelo:"Zyco",precio:999,link:"www.nikeclprod.vteximg.com"
 });
 producto.save({modelo:"NewBalance",precio:350,link:"www.nikeclprod.vteximg.com"
 });

//producto.getAll(); //funciona
//producto.getById(3); //funciona
//producto.deleteById(2); //funciona
//producto.deleteAll(); //funciona
