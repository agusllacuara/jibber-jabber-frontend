import {environment} from "./environment";

export class EnvironmentProvider {

  static getGatewayURL(){
    return environment.backend;
  }

  static getChatUrl() {
    return environment.chatUrl;
  }
}
