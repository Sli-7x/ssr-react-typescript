import * as React from 'react';
import { connect } from 'react-redux';
import { fetchFilters } from '../store/filters/actions';
// import { withError } from '../components/Errors/ErrorWrapper';
import { ErrorBoundary } from '../components/Errors/ErrorBoundary';
import Filters from '../components/Filters/Filters';

interface IProps {
  filters: any;
  dispatch: any;
}

interface IState {
  fetchData: any;
}

class List extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  static fetchData({ store }: { store: any }) {
    return store.dispatch(fetchFilters());
  }

  componentDidMount() {
    this.props.dispatch(fetchFilters());
  }

  render() {
    if (!this.props.filters || this.props.filters.length === 0) {
      return <h1>List page</h1>;
    }

    return (
      <div>
        <h1>Home page</h1>
        <ErrorBoundary>
          <Filters list={this.props.filters} />
        </ErrorBoundary>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({ filters: state.filters.filters });

export default connect(mapStateToProps)(List);
