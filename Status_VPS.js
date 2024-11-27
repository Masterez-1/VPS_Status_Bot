const { Client, GatewayIntentBits, MessageActionRow, MessageButton, EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders'); 
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const os = require('os-utils');
const { exec } = require('child_process');
const diskusage = require('diskusage');
const si = require('systeminformation');


const TOKEN = 'Token_De_Tu_Bot';
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
    ],
});
async function obtenerEstadoVPS() {
    const cpuUso = await new Promise((resolve) => os.cpuUsage((v) => resolve((v * 100).toFixed(2))));
    const ramUso = ((1 - os.freememPercentage()) * 100).toFixed(2);
    const ipPublica = await fetch('https://api.ipify.org?format=json').then((res) => res.json()).then((data) => data.ip);
    const uptime = os.sysUptime();
    const tiempoEncendido = `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${uptime % 60}s`;
    const disco = await diskusage.check('/');
    const espacioTotal = (disco.total / 1e9).toFixed(2) + ' GB';
    const espacioLibre = (disco.free / 1e9).toFixed(2) + ' GB';
    const temperaturaCPU = (await si.cpuTemperature()).main || 'N/A';
    const usuariosConectados = await ejecutarComando('who').catch(() => 'No disponible');

    return {
        cpuUso,
        ramUso,
        ipPublica,
        tiempoEncendido,
        plataforma: os.platform(),
        cargaPromedio: os.loadavg(1).toFixed(2),
        espacioTotal,
        espacioLibre,
        temperaturaCPU,
        usuariosConectados,
    };
}

function verificarUsoRecursos() {
    obtenerEstadoVPS().then((estado) => {
        if (estado.cpuUso > 90 || estado.ramUso > 90) {
            client.users.fetch('Tu_ID_De_Discord').then((user) => {
                user.send(`⚡ ¡Alerta! El uso de recursos del VPS es alto: CPU: ${estado.cpuUso}%, RAM: ${estado.ramUso}%`);
            });
        }
    });
}

setInterval(verificarUsoRecursos, 60000);  // Verificar cada minuto el uso

async function crearEmbedEstado() {
    const estado = await obtenerEstadoVPS();
    const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('🌐 Estado del VPS')
        .addFields(
            { name: 'CPU', value: `${estado.cpuUso}%`, inline: true },
            { name: 'RAM', value: `${estado.ramUso}%`, inline: true },
            { name: 'Carga Promedio', value: `${estado.cargaPromedio}`, inline: true },
            { name: 'Plataforma', value: estado.plataforma, inline: true },
            { name: 'IP Pública', value: estado.ipPublica, inline: false },
            { name: 'Tiempo Encendido', value: estado.tiempoEncendido, inline: false },
            { name: 'Espacio Total', value: estado.espacioTotal, inline: true },
            { name: 'Espacio Libre', value: estado.espacioLibre, inline: true },
            { name: 'Temperatura CPU', value: `${estado.temperaturaCPU}Â°C`, inline: true },
            { name: 'Usuarios Conectados', value: estado.usuariosConectados || 'No disponible', inline: false },
        )
        .setFooter({ text: 'Bot VPS Manager By Masterez', iconURL: 'https://cdn-icons-png.flaticon.com/512/2919/2919600.png' })
        .setTimestamp();
    return embed;
}

function ejecutarComando(comando) {
    return new Promise((resolve, reject) => {
        exec(comando, (error, stdout, stderr) => {
            if (error) {
                reject(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                reject(`Advertencia: ${stderr}`);
                return;
            }
            resolve(stdout || 'Comando ejecutado sin salida.');
        });
    });
}

async function obtenerProcesos() {
    try {
        const procesos = await ejecutarComando('ps aux --sort=-%mem | head -n 10');  // Muestra los 10 procesos más demandantes en memoria.
        return procesos;
    } catch (error) {
        return `Error al obtener los procesos: ${error}`;
    }
}

client.once('ready', async () => {
    console.log(`Bot conectado como ${client.user.tag}`);
    const commands = [
        new SlashCommandBuilder().setName('estado').setDescription('Muestra el estado del VPS'),
        new SlashCommandBuilder().setName('ejecutar').setDescription('Ejecuta un comando en el VPS').addStringOption(option => option.setName('comando').setDescription('El comando a ejecutar').setRequired(true)),
        new SlashCommandBuilder().setName('procesos').setDescription('Muestra los 10 procesos más consumidos en el VPS'),
        new SlashCommandBuilder().setName('ayuda').setDescription('Muestra la lista de comandos disponibles'),
    ];

    await client.application.commands.set(commands);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'estado') {
        const embed = await crearEmbedEstado();
        await interaction.reply({ embeds: [embed] });
    }

    if (commandName === 'ejecutar') {
        const comando = interaction.options.getString('comando');
        try {
            const resultado = await ejecutarComando(comando);
            await interaction.reply(`\`\`\`${resultado}\`\`\``);
        } catch (error) {
            await interaction.reply(`\`\`\`${error}\`\`\``);
        }
    }

    if (commandName === 'procesos') {
        const procesos = await obtenerProcesos();
        const embedProcesos = new EmbedBuilder()
            .setColor('#00ff00')
            .setTitle('🔎 Procesos del VPS')
            .setDescription('Los 10 procesos máss consumidos en el VPS:')
            .addFields(
                { name: 'Procesos', value: `\`\`\`${procesos}\`\`\``, inline: false },
            )
            .setFooter({ text: 'Bot VPS Manager By Masterez', iconURL: 'https://cdn-icons-png.flaticon.com/512/2919/2919600.png' })
            .setTimestamp();
        await interaction.reply({ embeds: [embedProcesos] });
    }

    if (commandName === 'ayuda') {
        const embedAyuda = new EmbedBuilder()
            .setColor('#ffa500')
            .setTitle('✅ Comandos Disponibles')
            .addFields(
                { name: '/estado', value: 'Muestra el estado del VPS.', inline: false },
                { name: '/ejecutar <comando>', value: 'Ejecuta un comando en el VPS.', inline: false },
                { name: '/procesos', value: 'Muestra los 10 procesos mÃ¡s consumidos en el VPS.', inline: false },
                { name: '/ayuda', value: 'Muestra esta lista de comandos.', inline: false },
            )
            .setFooter({ text: 'Bot VPS Manager By Masterez', iconURL: 'https://cdn-icons-png.flaticon.com/512/2919/2919600.png' })
            .setTimestamp();
        await interaction.reply({ embeds: [embedAyuda] });
    }
});

client.login(TOKEN);
