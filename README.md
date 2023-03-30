# ComicWeb
Esta es una aplicación que consume la API de xkcd y tiene como objetivo el calificar esos comics. El link del ComicWeb lo puede encontrar aquí: https://comic-web-sage.vercel.app/

## Para usar la aplicación
1. Para poder correr el proyecto localmente(en un entorno de desarrollo dev) en la terminal escriba el siguiente comando:

````shell
  npm run dev
````

2. Al visitar la url(http://localhost:5173) se encontrará con el apartado para calificar el comic de 0 a 5 estrellas(cabe recalcar por ejemplo que si desea quitar la calificación de 4 estrellas a 0 **debe seleccionar nuevamente** las 4 estrellas).

3. Para **guardar** esa calificación no solo basta con seleccionar las estrellas, debe presionar el botón: "Guardar calificación"

4. En este punto le aparecerá una alerta diciendo que se ha guardado con éxito su calificación. **Puede seguirla modificando** repitiendo los pasos 2 y 3; o de lo contrario, **puede eliminar dicha calificación** haciendo clic en la x que ve en el apartado de "Calificados"; también **puede eliminar todas las calificaciones** que haya hecho haciendo clic en el icono de basura.

5. Si no quiere ver el comic actual puede hacer clic en el botón: "Ver otro comic" y hará otra petición API a xkcd por un comic aleatorio, pero distinto del que ya tenía.

## Herramientas principales implementadas
* **Vuex**: Para el manejo del estado de la aplicación y la comunicación sencilla entre varios componentes.

* **localStorage**: Para el almacenamiento de las calificaciones.

* **Sass**: Para un código CSS más limpio y sin reiteración entre selectores.