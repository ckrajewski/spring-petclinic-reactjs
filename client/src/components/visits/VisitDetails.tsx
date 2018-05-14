import * as React from 'react';

import { IVisit } from '../../types';

interface IVisitsDetailsPageState {}
interface IVisitsDetailsPageProps {
  visits ?: IVisit[];
}
export default class VisitDetails extends React.Component<IVisitsDetailsPageProps, IVisitsDetailsPageState> {

  render() {
    const { visits } = this.props;
    if (!visits) {
      return;
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
        <td>{visit[0].firstName} {visit[0].lastName}</td>
        <td>{visit[1].date}</td>
        <td>{visit[1].appointmentStart}</td>
        <td>visit[2].appointmentEnd</td>
      </tr>
      ))}
    </tbody>
  </table>
    );
  }
}