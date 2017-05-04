interface Function {
    displayName: string;
    childContextTypes: any;
    contextTypes: any;
    propTypes: any;
    defaultProps: any;
}

interface String {
  toUrlName(): string;
  safeFilePath(): string;
}

declare var System: any;
// declare class EventEmitter {};