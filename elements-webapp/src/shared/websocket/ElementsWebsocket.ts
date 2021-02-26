import { TOKEN_STORAGE_KEY } from '@constant/constants';
import { GameStateAction, GameStateDispatcher } from '@page/GamePage/GameContext/GameState';
import * as StompJs from '@stomp/stompjs';
import { Client, IFrame, IMessage, StompSubscription } from '@stomp/stompjs';
import * as qs from 'qs';
import { IGameStateResource } from '@type/GameStateResource';
import ElementsWebsocketUtil from '@shared/websocket/ElementsWebsocketUtil';


const WS_BASE_URL = `ws://localhost:${7778}/start-session`;

class ElementsWebsocket {
  private client: Client;
  private subscription: StompSubscription;

  constructor(private readonly gameStateDispatcher: GameStateDispatcher) {
    this.client = new StompJs.Client({
      brokerURL: `${WS_BASE_URL}?${qs.stringify({access_token: sessionStorage.getItem(TOKEN_STORAGE_KEY)})}`,
      connectHeaders: {
        Authorization: `Bearer ${sessionStorage.getItem(TOKEN_STORAGE_KEY)}`
      },
      onWebSocketError: ElementsWebsocketUtil.onWebSocketError,
      onWebSocketClose: ElementsWebsocketUtil.onWebSocketClose,
      onStompError: ElementsWebsocketUtil.onHandShakeError,
      onConnect: this.onSuccessfulHandShake,
    });
    this.client.activate();
  }

  public disconnect = (): void => {
    this.client.deactivate();
    this.subscription.unsubscribe();
  };

  public getNewClientGameState = (): void => {
    this.client.publish({destination: '/session/game-state'});
  };

  public changeLocation = (locationName: string): void => {
    this.client.publish({destination: '/session/change-location', body: locationName});
  };

  public nextScene = (): void => {
    this.client.publish({destination: '/session/update-event'});
  };

  public chooseSceneOption = (idx: number): void => {
    this.client.publish({destination: '/session/update-event', body: idx.toString()});
  };

  private onSuccessfulHandShake = (receipt: IFrame): void => {
    console.debug('Websocket connection successful: ', receipt);
    this.subscription = this.client.subscribe('/user/state/game', (message: IMessage) => {
      const gameSession = JSON.parse(message.body) as IGameStateResource;
      this.gameStateDispatcher(GameStateAction.updateClientGameState(gameSession));
    });
  };
}

export default ElementsWebsocket;
