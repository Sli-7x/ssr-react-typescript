declare module 'react-loadable/webpack';
declare module '*.json';
import 'react-redux';

declare global {
  interface Window {
    __INITIAL_STATE__: any;
    main: any;
  }
}

declare module 'react-redux' {
  export interface InferableComponentDecorator<TOwnProps> {
    <T extends Component<TOwnProps>>(component: T): T;
  }

  export interface Connect {
    <TStateProps = any, TDispatchProps = any, TOwnProps = any, TMergedProps = any>(
      mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps>,
      mapDispatchToProps?: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
      mergeProps?: MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>,
      options?: Options
    ): InferableComponentDecorator<TOwnProps>;
  }
}
