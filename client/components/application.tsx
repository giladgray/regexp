import * as React from "react";

require("./application.scss");

interface ApplicationProps extends React.Props<Application> {
}

export class Application extends React.Component<ApplicationProps, {}> {
  public render() {
    return <h1 className="we did it">success</h1>;
  }
}
