TiendaGo

Tienda permite crear un perfil de usuario, con los atributos de una tienda online. 

el proyecto consiste en lo siguiente: 

Base de datos postgreSQL

controladores y servidor web golang(gin) 

modelo de datos en golang, usando el orm (gorm) 

rutas con las operaciones crud en la tabla. 

vistas(frontend) escrito en next.ts, utilizando typescript como lenguaje 


El proyecto se encuentra en un ambiente de produccion, se lo puede usar desde cualquier computador. 

* la base de datos se encuentra en aws, usando una instancia del servicio elephantsql: https://www.elephantsql.com/
* las vistas, se encuentran desplegadas en vercel: https://vercel.com/
* los controladores y modelo de datos se encuentran desplegadas en Railway: https://railway.app/

/**************************************************************************************************************************************************************************************/
Para observar el proyecto: 

ingresar al url: https://konyapa-com.vercel.app/

al ser un usuario nuevo, se mostrara una pantalla de login. 

se puede escoger entre ingresar con oauth2, conectando la cuenta github, simplemente se debe presionar el boton e ingresar con github. 
se puede tambien ingresar con un password preestablecido. El mismo es: usuario:Jose,clave:password. 

Una vez dentro, estaras en tu pantalla de perfil, y luego podras navegar a la pantalla en la que se manejan los registros. 




