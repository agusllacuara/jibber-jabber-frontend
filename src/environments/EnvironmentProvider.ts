export class EnvironmentProvider {
  static getGatewayURL(){
    return 'http://192.168.0.203:8080'
  }

  static getChatUrl() {
    return 'ws://192.168.0.203:8084'
  }
}
