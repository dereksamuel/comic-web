# ComicWeb
Esta es una aplicacion que consume el API de xkcd y tiene como objetivo el calificar esos comics. El link del ComicWeb lo puede encontrar aqui: https://comic-web-sage.vercel.app/

## Para usar la aplicacion
1. Para poder correr el proyecto localmente(en un entorno de desarrollo dev) en la terminal escriba el siguiente comando:

````shell
  npm run dev
````

2. Al visitar la url(http://localhost:5173) se encontrara con el apartado para calificar el comic de 0 a 5 estrellas(cabe recalcar por ejemplo que si desea quitar la calificacion de 4 estrellas a 0 **debe seleccionar nuevamente** las 4 estrellas).

3. Para **guardar** esa calificacion no solo basta con seleccionar las estrellas, debe presionar el boton: "Guardar calificacion"

4. En este punto le aparecera una alerta diciendo que se ha guardado con exito su calificacion. **Puede seguirla modificando** repetiendo los pasos 2 y 3; o de lo contrario, **puede eliminar dicha calificacion** haciendo clic en la x que ve en el apartado de "Calificados"; tambien **puede eliminar todas las calificaciones** que haya hecho haciendo clic en el icono de basura.

5. Si no quiere ver el comic actual puede hacer clic en el boton: "Ver otro comic" y hara peticion API a xkcd por un comic aleatorio pero distinto del que ya tenia.

## Herramientas principales implementadas
* **Vuex**: Para el manejo del estado de la aplicacion y la comunicacion sencilla entre varios componentes.

* **localStorage**: Para el almacenamiento de las calificaciones.

* **Sass**: Para un codigo CSS mas limpio y sin reitaracion entre selectores.
