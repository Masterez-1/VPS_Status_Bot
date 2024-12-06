# VPS Manager Bot

El **VPS Manager Bot** es un bot de Discord diseñado para ayudar a los administradores a monitorear y gestionar el estado de su VPS (Servidor Privado Virtual) directamente desde Discord. 

Este bot proporciona:
- Información sobre el uso de recursos del VPS.
- Ejecución de comandos del sistema.
- Monitoreo en tiempo real del estado del servidor.
- Alertas si el uso de CPU o RAM supera los umbrales definidos en el código.

Es una herramienta ideal para monitoreo remoto de servidores de manera fácil y eficiente.

---

## Imágenes de ejemplo

### Estado del servidor:
![Estado](https://media.discordapp.net/attachments/995115932756217887/1311157170103910471/image.png?ex=6747d5c5&is=67468445&hm=fe3516502ac70a19c47b3465a4332267993c5181afca0970b88fa559509de017&=&format=webp&quality=lossless&width=333&height=358)

### Monitoreo de procesos:
![Procesos](https://media.discordapp.net/attachments/1104825443015737526/1311284502739423312/image.png?ex=67484c5b&is=6746fadb&hm=5fb94a113d73c2c0aa09ec4be5047b6d20ba630f093b4c81cd691e7deb45e468&=&format=webp&quality=lossless&width=449&height=472)

### Alertas:
![Alertas](https://media.discordapp.net/attachments/995115932756217887/1311144904482881617/image.png?ex=6747ca59&is=674678d9&hm=e5f3d69601858d771d6f6b18aad78f9f41a76333aaf7571e4d9dc7c9674dca07&=&format=webp&quality=lossless&width=495&height=172)



## Características

- **Monitoreo en tiempo real del VPS**: Obtiene y muestra estadísticas como el uso de CPU, RAM, espacio en disco, temperatura de la CPU y más.
- **Ejecuta comandos del sistema**: Permite ejecutar comandos directamente desde Discord, lo que facilita la administración del servidor.
- **Alertas de alto uso de recursos**: Envia una alerta si el uso de CPU o RAM cundo se supera el limite definido (por defecto 90%).
- **Muestra procesos activos**: Muestra los primeros 10 procesos activos en el VPS que más consuman.
- **Interacción fácil desde Discord**: Utiliza comandos simples para obtener información y ejecutar acciones en el VPS.

## Requisitos

Para ejecutar este bot en tu propio VPS o servidor, necesitas cumplir con los siguientes requisitos:

- [Node.js](https://nodejs.org/) (versión 16 o superior).
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/) para gestionar dependencias.
- Un token de bot de Discord. Si todavía no tenés uno, [Acá podés crear un bot en Discord](https://discord.com/developers/applications).
- Instalar Screen en la VPS para dejar la terminal abierta. [Acá una guía de como instalarlo](https://www.ochobitshacenunbyte.com/2019/04/24/que-es-y-como-funciona-el-comando-screen-en-linux/)
- Un VPS o servidor donde se va a ejecutar el bot.

## Instalación

Seguí estos pasos para instalar y ejecutar el bot en la VPS:

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
   sudo node Status_VPS.js

## Comandos disponibles
1. **Ver el estado de la VPS**:
   ```bash
   /estado
   /procesos
   /ayuda
   /ejecutar <Comando>
   
## Enviar alerta del uso del CPU/RAM
1. **Esto se configura en el código**
   ```Js
   function verificarUsoRecursos() {
    obtenerEstadoVPS().then((estado) => {
        if (estado.cpuUso > 90 || estado.ramUso > 90) {
            client.users.fetch('Acá_ID_De_Tu_Discord').then((user) => {
                user.send(`⚠️ ¡Alerta! El uso de recursos del VPS es alto: CPU: ${estado.cpuUso}%, RAM: ${estado.ramUso}%`);
            });
        }
    });
   }


## Librerias utilizadas
1. Instalar las librerias en la VPS
   ```JavaScript
   sudo npm node-fetch
   sudo npm os-utils
   sudo npm child_proces
   sudo npm diskusage
   sudo npm systeminformation

## Errores al hacer las importaciones
1. En caso de que de problemas las importaciones remplazar los siguiente, varia según la VPS
```Js
const { Client, GatewayIntentBits, MessageActionRow, MessageButton, EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders'); 
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const os = require('os-utils');
const { exec } = require('child_process');
const diskusage = require('diskusage');
const si = require('systeminformation');
