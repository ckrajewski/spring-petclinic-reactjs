import * as React from 'react';

import { IVisit } from '../../types';

import { url } from '../../util';

interface IDeleteVisitPageState {}
interface IDeleteVisitPageProps {
  visit ?: IVisit;
}
export default class DeleteVisit extends React.Component<IDeleteVisitPageProps, IDeleteVisitPageState> {

  constructor(props) {
    super(props);
    this.deleteVisit = this.deleteVisit.bind(this);
  }
  deleteVisit(event) {
    const { visit } = this.props;
    if (visit) {
      fetch(url(`/api/visit/${visit.id}/delete`))
        .then(response => response.json());
    }
  }
  render() {
    return(
      <button className='btn btn-default' onClick={this.deleteVisit}> Delete Visit </button>
    );
  }
}