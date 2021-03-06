# Prueba Técnica

## Instalar paquetes
```
npm install
```

## Levantar aplicación PM2
```
pm2 start ./app.js
```

## ENDPOINTS

### Consultar creditos usuario.

```
http://ec2-3-131-83-130.us-east-2.compute.amazonaws.com/getCreditosUsuario
```

Se debe enviar como parametro el correo a consultar 
```
{
    "correo": "vejarcarolina.95@gmail.com"
}
```

Respuesta esperada
```
{
    "correo": "vejarcarolina.95@gmail.com",
    "credito": 600,
    "nombre_tienda": "Tienda A",
    "id_tienda": 1
},
{
    "correo": "vejarcarolina.95@gmail.com",
    "credito": 105,
    "nombre_tienda": "Tienda B",
    "id_tienda": 2
}
```

## Agregar creditos al usuario
```
http://ec2-3-131-83-130.us-east-2.compute.amazonaws.com/agregarCreditos
```

Se deben enviar como parametros el correo, el identificador de la tienda y la cantidad de creditos
```
{
    "correo_usuario": "vejarcarolina.95@gmail.com",
    "id_tienda": 1,
    "creditos": 1000
}
```
Respuesta esperada
```
{
    "res": "Información actualizada"
}
```

## Consultar creditos del usuario por tienda
```
http://ec2-3-131-83-130.us-east-2.compute.amazonaws.com/getCreditosUsuarioTienda
```

Se debe enviar como parametro el correo y identificador de la tienda a consultar 
```
{
    "correo": "vejarcarolina.95@gmail.com", 
    "id_tienda": 1
}
```

Respuesta esperada 

```
[
    {
        "correo": "vejarcarolina.95@gmail.com",
        "credito": 62324,
        "nombre_tienda": "Tienda A",
        "id_tienda": 1
    }
]
```
## Quitar creditos al usuario
```
http://ec2-3-131-83-130.us-east-2.compute.amazonaws.com/quitarCreditos
```

Se deben enviar como parametros el correo, el identificador de la tienda y la cantidad de creditos
```
{
    "correo_usuario": "vejarcarolina.95@gmail.com",
    "id_tienda": 1,
    "creditos": 1000
}
```
Respuesta esperada
```
{
    "res": "Información actualizada"
}
```

## Desarrollo de la solución

* Cree mi repositorio en GitHub: https://github.com/carolinavejar/Prueba-SoluNegocios

* Para desarrollar la solución creé una aplicación en NodeJS (14.15.2) con express que tuviera acceso a los diferentes métodos requeridos (agregar, descontar y consultar creditos). 

* En los métodos de agregar y descontar hice inicialmente un solo metodo al cual se le pasaban como parametros el correo del usuario, identificador de la tienda (numérico) y los creditos, diferenciandose en que para agregar usuarios se debía pasar un número positivo y para descontar creditos se debía enviar un número negativo en los creditos. Acá valida inicialmente si existe el usuario asociado con la tienda enviada, si es así realiza un update, si no inserta un nuevo registro.

* Igualmente luego cree 2 endpoints aparte para cada una de las acciones, pero que al momento de ejecutarse la actualización utilizan la misma lógica.

* Para almacenar los datos utilicé SQLite.

* Implementé mi solución en AWS con Ubuntu.

* Levante la API con PM2.

* Cree 2 páginas de prueba para poder consultar y editar la información de los creditos

  +  http://ec2-3-131-83-130.us-east-2.compute.amazonaws.com/creditos_usuario.html -> Para consultar creditos del usuario.

  +  http://ec2-3-131-83-130.us-east-2.compute.amazonaws.com/creditos_tienda.html -> Para consultar creditos por tienda y detallar los usuarios con credito.

* Para la modificación masiva cree un archivo ejecutable en Node que se llama actualizacionMasiva.js, que actualiza desde un archivo csv que ahora está en el mismo proyecto. Para manejar los datos del csv utilicé csvtojson para poder transformar la información en JSON y colocarle nombre a los valores, de esta manera pude utilizar la misma función de actualización de creditos, porque los parametros llegan igual.
La estructura del csv consta de un encabezado (define nombre de los atributos) y la información a actualizar: correo , creditos y id_tienda.
Para saber si el monto se suma o se resta a los creditos le puse un número negativo a los creditos que se descontaban.

Lo ejecute así en la consola.
```
    node actualizacionMasiva.js
```
## Mejoras sugeridas 

* Para ayudar a mejorar la optimización cambiaría el tipo de identificador del cliente , colocando un ID numérico para hacer las consultas mas rapidas.

* Realizaría un control de logs al código , tanto como para guardar los logs y para guardar los errores que puedan ocurrir. Usaría winston para esta acción.

* En una tabla se podrían registrar todas las acciones realizadas a los creditos del usuario para poder mantener un historial de esta información.

* Crear un dashoard para poder ver información reelevante como los usuarios y tiendas con mas credito, actualizaciones de credito realizadas entre otros.

*  Ver si existe la posibilidad de realizar procedimientos en la db que realicen las validaciones correspondientes , ejemplo en el caso de actualizar creditos que valide si existe ahí y luego actualice.

* Realicé páginas para porbar el funcionamiento de la API

* Guardar resultado de actualizaciones masivas para ver el estado por cada dato ingresado.

* Realizar actualizaciones masivas con gran número de datos a actualizar en horarios de bajo tráfico