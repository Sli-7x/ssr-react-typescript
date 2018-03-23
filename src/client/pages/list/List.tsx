import * as React from 'react';
import { connect } from 'react-redux';
import { fetchFilters } from '../../redux/filters';
import { ErrorBoundary } from '../../components/errors/ErrorBoundary';
import { Filters } from '../../components/filters/Filters';

interface IListProps {
  filters: any;
  dispatch: any;
}

interface IListState {
  fetchData: any;
}

class List extends React.Component<IListProps, IListState> {
  constructor(props: IListProps) {
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
