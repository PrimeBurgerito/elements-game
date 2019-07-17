import { TOKEN_STORAGE_KEY } from '@constant/constants';
import { GameStateDispatcher, updateClientGameState } from '@page/GamePage/GameContext/GameState';
import * as StompJs from '@stomp/stompjs';
import { Client, IFrame, IMessage, StompSubscription } from '@stomp/stompjs';
import { IClientGameState } from '@type/ClientGameState';

const WS_BASE_URL = `ws://localhost:${7778}/start-session`;


class ElementsWebsocket {
  private readonly gameStateDispatcher: GameStateDispatcher;
  private client: Client;
  private subscription: StompSubscription;

  constructor(dispatcher: GameStateDispatcher) {
    this.gameStateDispatcher = dispatcher;
    this.client = new StompJs.Client({
      brokerURL: `${WS_BASE_URL}?access_token=${sessionStorage.getItem(TOKEN_STORAGE_KEY)}`,
      onWebSocketError: this.onWebSocketError,
      onWebSocketClose: this.onWebSocketClose,
      onStompError: this.onHandShakeError,
      onConnect: this.onSuccessfulHandShake
    });
    this.client.activate();
  }

  public disconnect = () => {
    this.client.deactivate();
    this.subscription.unsubscribe();
  }

  public getNewClientGameState = () => {
    this.client.publish({destination: '/session/game-state'});
  }

  public changeLocation = (locationName: string) => {
    this.client.publish({destination: '/session/change-location', body: locationName});
  }

  public nextScene = () => {
    this.client.publish({destination: '/session/update-event'});
  }

  private onWebSocketError = (e) => {
    console.log(e);
  }

  private onWebSocketClose = (e) => {
    console.log(e);
  }

  private onHandShakeError = (frame: IFrame) => {
    console.clear();
    console.log('%cBroker reported error: %c' + frame.headers.message, 'color: red', 'color: white');
    console.log('Additional details: ' + frame.body);
  }

  private onSuccessfulHandShake = async (receipt: IFrame) => {
    console.clear();
    console.log('%cWebsocket connection successful: %c' + receipt, 'color: green', 'color: white');
    this.subscription = this.client
      .subscribe(`/user/state/game`, (message: IMessage) => {
        const gameSession = JSON.parse(message.body) as IClientGameState;
        this.gameStateDispatcher(updateClientGameState(gameSession));
      });
  }
}

export default ElementsWebsocket;
