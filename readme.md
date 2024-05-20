
# Failsafe

A music bot written in Typescript utilising discord.js and lavaclient. Powered by Lavalink.


## Features

- Playable music from a variety of sources such as Spotify
- Integrated Queue via lavaclient plugin
- A variety of music effects such as nightcore



## Requirements

In order for this project to run, you will need to the following:

```bash
  NodeJS LTS
```
```bash
  Java 17 LTS
```
```bash
  Lavalink v4 (Included with this project)
```


## Setup

Clone the project

```bash
  git clone https://github.com/AlphaLupine/failsafe.git
```

Go to the project directory

```bash
  cd failsafe
```

Install dependencies

```bash
  npm install
```

Configure environment variables in the .env file **remember to rename the file to remove .example**. You will need a discord bot token which you can get from [here](https://discord.com/developers/applications) by creating a discord application. To get the guildId you will need to enable developer options in discord and right click the icon of your discord server and copy its ID.

Configure your application.yml for your lavalink server. **rename your application.yml file to remove .example**. Most of the settings are self explanatory, the default settings included in the example file should run okay.




## Run Project

Compile TypeScript

```bash
  tsc
```

Start your lavalink server

```bash
java -jar /path/to/lavalink.jar
```

Run failsafe

```bash
npm run start-bot
```

## Usage

Go to your discord server and type a '/' into the message field. You should see a list of commands appear for failsafe


## Acknowledgements

- [lavaclient](https://github.com/lavaclient/lavaclient)
- [lavalink](https://github.com/lavalink-devs/Lavalink)


