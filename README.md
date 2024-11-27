# VPS Manager Bot

El **VPS Manager Bot** es un bot de Discord diseñado para ayudar a los administradores a monitorear y gestionar el estado de su VPS (Servidor Privado Virtual) directamente desde Discord. Este bot proporciona información sobre el uso de recursos del VPS, ejecuta comandos del sistema, muestra el estado del servidor en tiempo real y envía alertas si el uso de CPU o RAM supera los umbrales definidos en el código. Es una buena opción si se desea monitorear de manera remota y más facilmente.

## Características

- **Monitoreo en tiempo real del VPS**: Obtiene y muestra estadísticas como el uso de CPU, RAM, espacio en disco, temperatura de la CPU y más.
- **Ejecuta comandos del sistema**: Permite ejecutar comandos directamente desde Discord, lo que facilita la administración del servidor.
- **Alertas de alto uso de recursos**: Envia una alerta si el uso de CPU o RAM cundo se supera el limite definido (por defecto 90%).
- **Muestra procesos activos**: Muestra los primeros 20 procesos activos en el VPS.
- **Interacción fácil desde Discord**: Utiliza comandos simples para obtener información y ejecutar acciones en el VPS.

## Requisitos

Para ejecutar este bot en tu propio VPS o servidor, necesitas cumplir con los siguientes requisitos:

- [Node.js](https://nodejs.org/) (versión 16 o superior).
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/) para gestionar dependencias.
- Un token de bot de Discord. Si aún no tenés uno, [Acá podés crear un bot en Discord](https://discord.com/developers/applications).
- Instalar Screen en la VPS para dejar la terminal abierta. [Acá una guía de como instalarlo](https://www.ochobitshacenunbyte.com/2019/04/24/que-es-y-como-funciona-el-comando-screen-en-linux/)
- Un VPS o servidor donde se va a ejecutar el bot.

## Instalación

Sigue estos pasos para instalar y ejecutar el bot:

1. **Clona este repositorio en la VPS**:
   ```bash
   sudo git clone https://github.com/Masterez-1/VPS_Status_Bot.git
   cd VPS_Status_Bot

2. **Iniciar el screen en la terminal**:
   ```bash
   screen

3. **Iniciar el bot**:
   ```bash
   cd VPS_Status_Bot
   sudo node index.js

## Comandos disponibles
1. **Ver el estado de la VPS**:
   ```bash
   /estado
   
2. **Ver los procesos en la VPS**:
   ```bash
   /procesos

3. **Ejecutar comandos en la VPS**:
   ```bash
   /ejecutar <Comando>
   

## Librerias utilizadas
```Js
   node-fetch
   os-utils
   child_proces
   diskusage
   systeminformation

