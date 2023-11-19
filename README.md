# Aplicación Node.js - Gestión de Envíos y Compañías

Este proyecto utiliza Node.js y MySQL para gestionar información sobre trabajadores, envíos y compañías.

## Configuración Inicial

1. **Base de Datos**: Importa el archivo SQL llamado `invent_bd.sql` en un gestor de base de datos MySQL. Asegúrate de tener un usuario root sin contraseña y que la base de datos se llame `invent_bd`.

2. **Backend**: Desde la consola, navega a la carpeta `backend` y ejecuta el siguiente comando para iniciar el servidor Node.js:

    ```bash
    node app.js
    ```

3. **Frontend**: En otra terminal, navega a la carpeta `frontend` y ejecuta el siguiente comando para iniciar la aplicación Angular:

    ```bash
    ng serve
    ```

4. Accede a la aplicación en [http://localhost:4200](http://localhost:4200).

## Endpoints del Backend

### 1. Autenticación de Usuario

- **Endpoint**: `/login` (POST)
- **Uso**: Autentica a un usuario mediante nombre y contraseña.

### 2. Consulta de Trabajadores

- **Endpoint**: `/workers` (GET)
- **Uso**: Obtiene información sobre los trabajadores registrados.

### 3. Consulta de Envíos

- **Endpoint**: `/shipments` (GET)
- **Uso**: Obtiene información sobre los envíos registrados.

### 4. Añadir Envío

- **Endpoint**: `/add_shipment` (POST)
- **Uso**: Añade un nuevo envío a la base de datos.

### 5. Borrar Envío

- **Endpoint**: `/delete_shipment/:id_shipment` (DELETE)
- **Uso**: Borra un envío específico de la base de datos.

### 6. Consulta de Compañías

- **Endpoint**: `/companies` (GET)
- **Uso**: Obtiene información sobre las compañías registradas.

### 7. Consulta de Compañía por ID

- **Endpoint**: `/company/:id_company` (GET)
- **Uso**: Obtiene información de una compañía específica según su ID.

### 8. Añadir Compañía

- **Endpoint**: `/add_company` (POST)
- **Uso**: Añade una nueva compañía a la base de datos.

### 9. Borrar Compañía

- **Endpoint**: `/delete_company/:id_company` (DELETE)
- **Uso**: Borra una compañía específica de la base de datos.

### 10. Modificar Compañía

- **Endpoint**: `/modify_company/:id_company` (PUT)
- **Uso**: Modifica una compañía específica en la base de datos.

### 11. Consulta de Compañía por Código Postal

- **Endpoint**: `/get_company_by_postal_code/:postal_code` (GET)
- **Uso**: Obtiene el nombre de la compañía que coincide con un código postal.

**Nota**: Asegúrate de tener todas las dependencias instaladas y la base de datos configurada antes de iniciar la aplicación.

