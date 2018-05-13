import * as React from 'react';

import { IVisit } from '../../types';

interface IVisitsDetailsPageState {}
interface IVisitsDetailsPageProps {
  visits ?: IVisit[];
}
export default class VisitDetails extends React.Component<IVisitsDetailsPageProps, IVisitsDetailsPageState> {

  render() {
    const { visits } = this.props;
    if (visits.length === 0) {
      return <h2> No Current Visits</h2>;
    }
    return(
  <table className='table table-striped'>
    <thead>
      <tr>
        <th>Vet Name</th>
        <th>Date</th>
        <th>Start Time</th>
        <th>End Time</th>
      </tr>
    </thead>
    <tbody>
    {visits.map(visit => (
      <tr>
        <td>Some Vet</td>
        <td>{visit.date}</td>
        <td>{visit.appointmentStart}</td>
        <td>visit.appointmentEnd</td>
      </tr>
      ))}
    </tbody>
  </table>
    );
  }
}