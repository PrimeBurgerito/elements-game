import { IFrame } from '@stomp/stompjs';

class ElementsWebsocketUtil {
  public static onHandShakeError = (frame: IFrame) => {
    console.error('Broker reported error: ', frame.headers.message);
    console.error('Additional details: ', frame.body);
  };

  public static onWebSocketError = (e) => {
    console.error(e);
  };

  public static onWebSocketClose = (e) => {
    console.error(e);
  };
}

export default ElementsWebsocketUtil;
