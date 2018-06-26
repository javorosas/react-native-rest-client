// Type definitions for react-native-rest-client v0.1.1
// Project: https://github.com/javorosas/react-native-rest-client
// Definitions by: Nick Hope <https://github.com/nicktoony/>

declare module "react-native-rest-client" {
    class RestClient {
        constructor(baseUrl?: string, options?: 
            { headers?: object, devMode?: boolean, simulatedDelay?: number });

        GET<T>(route: string, query?: object, body?: object): Promise<T>;
        POST<T>(route: string, query?: object, body?: object): Promise<T>;
        PUT<T>(route: string, query?: object, body?: object): Promise<T>;
        DELETE<T>(route: string, query?: object, body?: object): Promise<T>;
    }

    export = RestClient;
}