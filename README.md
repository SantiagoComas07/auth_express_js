# Auth express project

## Descripción
API RESTful desarrollada en *Node.js + TypeScript* for the process of register and login in an app web. This is a simple way to build an auth implementation with express.js 
Incluye manejo de usuarios productos categorías y órdenes con integración de *PostgreSQL* mediante *Sequelize*  
Cuenta con documentación de endpoints en *Swagger*

## Tecnologies used
- Node.js  
- TypeScript  
- Express  
- Sequelize  
- PostgreSQL    
 

## Instalación

1 Clone the repo:
```bash
   git clone "http..."
``` 
2 Install dependencies
  ```bash
  npm install
``` 
3 Config the environment's variables whitin a .env file.

**DB_NAME=xxxx**

**DB_USER=xxxx**

**DB_PASSWORD=xxxx**

**DB_HOST=xxxx**

**PORT=xxxx**

**JWT_SECRET=xxxx**

## Scripts enables

- Development
```bash
   npm run start:dev
```

- Build 
```bash
   npm run build
```
 
- Production  
```bash
   npm run start
```

Autor: Santiago Comas D.



