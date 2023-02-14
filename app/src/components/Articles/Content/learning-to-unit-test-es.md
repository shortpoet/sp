# <p align="center">Aprendiendo Testing Unitario</p>
<p align="center">
    No he vuelto a estar tan emocionado por codificar desde el campamento de entrenamiento
</p>

<p align="center">
    <img alt="GIF of cannonball pool scene from film The Sandlot" src="https://media.giphy.com/media/3ohzdLFxnwyFeNhtTO/giphy.gif" />
</p>

---

> *RPV*

> *aprende a cocinar un huevo correctamente, ama tus tests unitarios, y en el proceso encuentra tu voz*

---

## Trasfondo

Eso puede sonar como un pedazo de ciberanzuelo, pero la euforia es real, damas y caballeros de los medios sociales.

Tan pronto como me despidieron de Boeing tras el golpe del coronavirus, me dispuse a mejorar mi pagina de curriculum vitae y mi presencia en la red. Ha sido un gran viaje de descubrimiento, tanto de uno mismo como del código. Ese código comenzó como un [diseño simple](https://codeburst.io/how-i-created-seo-friendly-portfolio-cv-website-and-hosted-it-on-github-d5c4da43cf2f). Como los desarrolladores suelen hacer, se añadieron [características](https://dev.to/amruthpillai/ever-dreamed-of-a-free-and-open-source-resume-builder-that-doesn-t-store-your-data-meet-reactive-resume-1dpl) e incluso elementos de diseño encontrados al mirar los [documentos](https://html2canvas.hertzen.com/) tecnicos de dichas características.

Eventualmente fue alojado en Azure. Para mantenerme dentro de los límites de mi presupuesto (¡el alojamiento es caro!), tuve que ser creativo para poder tener tanto entornos de [prueba](https://https://shortpoet-test.azurewebsites.net/) como de [producción](https://shortpoet.azurewebsites.net/), así como [mi URL](https://shortpoet.com) que en realidad está alojada en páginas GitHub y simplemente apunta al la terminal de la API de datos servida por la aplicación en Azure.

Cientos de [commit](https://github.com/shortpoet/Shortpoet/commits/dev) después, entrada en vivo.  Una simple aplicación, pero con muchos puntos de posible fracaso, y yo sólo había experimentado unos pocos. Entra las fase del testing unitario. Finalmente empecé a entender las cosas después de arremangarme y escribir algunas de mis primeras funciones de fabrica de pruebas de unidades.

Y fue en ese momento que me inspiré a poner pensamientos en el teclado y armé el marco de este artículo.

Darme cuenta de que he escrito código que me impide cambiar arbitrariamente los nombres de los métodos hace que vuelva al patio el niño al que le gustaba jugar contando las líneas saltadas con cada pie.

Estoy escribiendo por 3 razones:

- [SEO](https://es.wikipedia.org/wiki/Posicionamiento_en_buscadores) (posicionamiento en buscadores) de [LinkedIn](https://www.linkedin.com/in/carlos-soriano/)

- Así recuerdo lo feliz que te hace sentir el éxito la próxima vez que esté listo para rendirme al aprender algo nuevo

- Ofrecer una o dos pepitas de sabiduría al futuro Carlos u otros buscadores de información

---

Con la mirada perdida en el esqueleto de un borrador, perdido en la desesperación, pensando

> Por eso me empezó a desagradar la escuela, grrr, ¡¡Odio escribir!!!

Argh, y también, un poco patético lol. Estoy seguro de que todos sufrimos de bloqueo de escritor. Es una forma de miedo escénico, en realidad. Una sensación que, como antiguo "actor", no me es desconocida. Todos hemos escuchado el consejo - imagina a tu público en ropa interior. No estoy seguro de que sea menos intimidatorio, pero  si hay algo de sabiduría que sonsacar. Como siempre, es todo una cuestión de perspectiva.

Bueno, eso es más fácil si tú:

1) tienes un público
2) puedes dirigirte a ellos directamente a voluntad

Por suerte, en esta situación, me di cuenta en la ducha, tengo ambas cosas. Oh espera, olvidé mencionar...

Así que hice lo que uno debe hacer cuando sufre de bloqueo de escritor - me duché y me preparé para una cita en un supermercado - amor en tiempos de corona eh. Fue entonces que se me ocurrio..

Sólo tengo que decidir quién es mi público, ¡obvio! 🙄 Bueno. Ahora, ¿recuerdame, quien eres?

- ¿Son mis amigos cercanos y mi familia que (sólo se puede esperar) leerán para apoyar?

- ¿Otro reclutador 'random' enviando solicitudes para trabajos con requisitos específicos que no coinciden con mis habilidades, preguntándome si tengo tiempo para conectar?

- ¿Eres alguien que tambien está buscando de forma activa el SEO en [LinkedIn](https://www.linkedin.com/in/carlos-soriano/) , y aquí te encuentras?

- Quién sabe realmente. Tal vez buscaste en Google los tests unitarios y esperabas encontrar el santo grial que hace de tu código una bestia con constitución de [adamantium](https://es.wikipedia.org/wiki/Adamantium).

En cualquier caso, si una cosa parece segura, es que sería una tontería intentar complacerlos a todos.

Así que aquí estoy, encontrando eso, que supongo que estoy escribiendo para mí mismo:

- El yo del pasado que no lo hizo
- El yo de ahora que quiere zanjar con esto
- Y el yo del futuro que sin duda se avergonzará, pero se dará cuenta de que el viaje valió la pena

Bueno, ya que voy a publicar esto, la esperanza es inspirar a otros nodos de conocimiento que deseen expandir su alcance.

---

## Tests Unitarios

Bien, vayamos al grano. Entonces, ¿qué son los tests unitarios y por qué me encantan?

1) Escribes un código que hace una cosa. 

2) Escribes otro código que hace otra cosa.

3) Sigues haciendo esto hasta que hay tantas cosas, a menudo dependiendo unas de otras, que eventualmente una nueva cosa lo rompe todo.

Piensa en el castillo de naipes. Sí, más software del que te gustaría saber se parece a un castillo de naipes. Bueno, las pruebas de unidad son comprobaciones, piensa en ello como pegamento, que mantienen las cosas unidas. Un contrato que haces con el yo del futuro (o colaboradores) que esta UNIDAD de código hace una cosa y sólo esa cosa.

La cosa de la unidad es la parte difícil y también la belleza. Tuve que refactorizar gran parte de mi código en unidades más definidas para ser fácilmente comprobable. Esto me hizo aprender tanto, que como un desarollador en gran parte autodidacta, me había saltado por el camino.

La mayoría podría hervir un huevo. El día que te aburras y decidas sacar el cronómetro (el que tienes en el teléfono te servirá de sobra si tienes el tiempo en tus manos 😉). Aprendes exactamente la diferencia que puede hacer un minuto, o quizás el empezar con agua fría u hirviendo. Las variaciones podrían ser interminables, como con el código. Así que pruebas, encuentras tu preferencia, y estableces un contrato con tu futuro yo para hacerlo bien. Eventualmente, se convierte en una segunda naturaleza. La memoria, como sabemos, es tanto física como metafísica.

---

Una anécdota - en una versión de mis métodos, el código que causaba que el navegador se colgara se debía a que no se había detectado una diferencia en las extensiones de los archivos.  Lógicamente, el PNG estaba ocupando mucho más espacio que el JPEG y, por tanto, el colgado. Me habia imaginado que se debía a las dependencias, o tal vez a una mala configuración por mi parte.  No. Sólo una extensión de archivo. Bueno, en el futuro, ese test me mantendrá cuerdo.

Para el yo del [futuro](https://www.shortpoet.com) (¡porque por fin esto parece un post sólido!)...

Esa extensión de archivo es una gran oportunidad para practicar lo que se conoce como [TDD](https://es.wikipedia.org/wiki/Desarrollo_guiado_por_pruebas) o el desarrollo guiado por pruebas.  Básicamente, uno escribiría un test que comprobaría un método permitiendo a la API cambiar entre las extensiones de archivo - ¡que tan característica! Y la forma en que eso funcionará (¡futuro Carlos!) es que se escribirá el caso de prueba que debe pasar (el huevo hierve a temperatura perfecta) y luego se escribirá el código que asegure esa acción (la prueba pasa - un huevo perfecto).

Así que en conclusión, aprende a cocinar un huevo correctamente, ama tus pruebas de unidad, y en el proceso encuentra tu [voz](https://www.shortpoet.com/articles).

--- 

Publicado orignalmente en: 
https://www.shortpoet.com/articles/learning-to-unit-test-es

---

[Traducción al inglés](https://www.shortpoet.com/articles/learning-to-unit-test-ene)