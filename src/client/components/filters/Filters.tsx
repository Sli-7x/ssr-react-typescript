import * as React from 'react';
import styled from 'styled-components';

export interface IFiltersProps {
  list: any[];
}

const Title = styled.span`
  color: #555;
`;

export class Filters extends React.Component<IFiltersProps, any> {
  render() {
    return (
      <>
        {this.props.list.map((filter: any) => (
          <div key={filter.id}>
            <Title>{filter.title}</Title>
          </div>
        ))}
      </>
    );
  }
}
