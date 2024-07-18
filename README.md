# MEILISEARCH PROJECT USING STACK MEAN

## Descripción

Proyecto dedicado a la construcción de un buscador web utilizando la tecnologia "Meilisearch" y el stack MEAN (MongoDB, Express, Angular, NodeJS).

## Índice

- [Descripción](#descripción)
- [Instalación](#instalación)
- [Uso](#uso)
- [Características](#características)
- [Información](#información)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## Instalación

### Requisitos Previos

- Instalar [Docker Desktop](https://www.docker.com/) y ejecutarlo

### Pasos de Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/eliseovillaok/proyecto-web.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd proyecto
   ```
**IMPORTANTE** situarse en el mismo directorio que está el archivo _docker-compose.yml_
*(asegurarse de tener el Docker Desktop ó el Docker Engine activos):*

3. Levantar los servicios de Express para instalar las dependencias *node_modules*:
   ```bash
   docker-compose up express
   ```

4. Abrir **docker-compose.yml** y comentar la última linea, guardar el archivo.

5. Levantar todos los servicios restantes (meilisearch y mongodb):
   ```bash
   docker-compose up [-d]
   ```

6. Verificar que el servicio _Meilisearch_ y _Express_ se encuentran corriendo
   - Ir a el navegador y tipear [http://localhost:3000](http://localhost:3000) y [http://localhost:7700](http://localhost:7700)

## Información

1. https://www.meilisearch.com/docs/learn/getting_started/quick_start#add-documents
2. https://www.meilisearch.com/docs/reference/api/indexes
3. https://blog.logrocket.com/meilisearch-a-definitive-guide/#projectsetup
4. https://kinsta.com/es/blog/meilisearch/
5. https://flatirons.com/blog/understanding-and-implementing-gitignore-for-node_modules/
6. https://docs.github.com/es/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax
7. https://csvjson.com/csv2json

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para obtener más detalles.

## Contacto

Para cualquier consulta, puedes contactarnos en [eliseovilla10@gmail.com](mailto:eliseovilla10@gmail.com).
[tredolatti@proton.com](mailto:tredolatti@proton.com).
