import type { MetaFunction } from "react-router";

export namespace Route {
  export type MetaFunction = MetaFunction;
  
  export interface LoaderData {
    // Add loader data types here when needed
  }

  export interface ActionData {
    // Add action data types here when needed
  }

  export type LoaderArgs = {
    request: Request;
    params: {};
  };

  export type ActionArgs = {
    request: Request;
    params: {};
  };
} 