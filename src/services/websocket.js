import { Client } from "@stomp/stompjs";

let client = null;

export const connectWebSocket = (onRideUpdate) => {

    if (client?.active) {
        return client;
    }

    client = new Client({
        brokerURL: "ws://localhost:8080/ws",
        reconnectDelay: 5000,

        onConnect: () => {

            console.log("WebSocket Connected");

            client.subscribe(
                "/topic/rides",
                (message) => {

                    try {

                        const data =
                            JSON.parse(message.body);

                        onRideUpdate?.(data);

                    } catch {

                        onRideUpdate?.(
                            message.body
                        );
                    }
                }
            );

            client.subscribe(
                "/topic/pending-rides",
                () => {

                    onRideUpdate?.({
                        refresh:true
                    });

                }
            );
        }
    });

    client.activate();

    return client;
};

export const disconnectWebSocket = () => {

    if(client){

        client.deactivate();

        client = null;
    }
};