/// <reference path="Delivery.d.ts" />
/// <reference path="../Commands/Commands.d.ts" />

import * as Delivery from 'Delivery';
import * as Commands from '../Commands';

export default class CommandRunner {
  static Feats = Commands.Feats;

  static getServerResponse(
    message: Delivery.SocketClientMessage
  ): Delivery.SocketServerMessage {
    const commandFeats : Array<String> = Object.values(Commands.Feats);
    const commandIndex = commandFeats.indexOf(message.command);

    if (commandIndex === -1) {
      return (new Commands.NotUnderstood()).getSocketMessage();
    }

    const instruction = Object.keys(Commands.Feats)[commandIndex];

    return (new Commands[instruction](message)).getSocketMessage();
  }

  static getServerCommand(
    command: Commands.Feats
  ): Delivery.SocketServerMessage {
    const commandFeats : Array<String> = Object.values(Commands.Feats);
    const commandIndex = commandFeats.indexOf(command);

    if (commandIndex === -1) {
      return (new Commands.NotUnderstood()).getSocketMessage();
    }

    const instruction = Object.keys(Commands.Feats)[commandIndex];

    return (new Commands[instruction]()).getSocketMessage();
  }
}
