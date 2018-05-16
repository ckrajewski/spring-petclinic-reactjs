import * as React from 'react';

import { Link } from 'react-router';
import { IOwner, IPet, IBasicOnCLickHandler } from '../../types';
const moment = require('moment');

const VisitsTable = ({ownerId, pet }: { ownerId: number, pet: IPet }) => (
  <table className='table-condensed'>
    <thead>
      <tr>
        <th>Vet Name</th>
        <th>Visit Date</th>
        <th>Start Time</th>
        <th>End Time</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {pet.visits.map(visit => (
        <tr key={visit.id}>
          <td>{visit.vet.firstName} {visit.vet.lastName}</td>
          <td>{visit.date}</td>
          <td>{moment(visit.appointmentStart).format('hh:mm a')}</td>
          <td>{moment(visit.appointmentEnd).format('hh:mm a')}</td>
          <td>{visit.description}</td>
          <td> <button name={visit.id.toString()}> Delete Visit </button> </td>
        </tr>
      ))}
      <tr>
        <td>
          <Link to={`/owners/${ownerId}/pets/${pet.id}/edit`}>Edit Pet</Link>
        </td>
        <td>
          <Link to={`/owners/${ownerId}/pets/${pet.id}/visits/new`}>Add Visit</Link>
        </td>
      </tr>
    </tbody>
  </table>
);

export default ({owner, onClick}: { owner: IOwner, onClick: IBasicOnCLickHandler}) => {
  const handleOnClickDelete = event => {
    event.stopPropagation();
    const value  = event.target.name;
    // invoke callback
    onClick(value);
  };
  return (
  <section>
    <h2>Pets and Visits</h2>
    <table className='table table-striped'>
      <tbody>
        {owner.pets.map(pet => (
          <tr key={pet.id}>
            <td style={{ 'verticalAlign': 'top' }}>
              <dl className='dl-horizontal'>
                <dt>Name</dt>
                <dd>{pet.name}</dd>
                <dt>Birth Date</dt>
                <dd>{pet.birthDate}</dd>
                <dt>Type</dt>
                <dd>{pet.type.name}</dd>
              </dl>
            </td>
            <td style={{ 'verticalAlign': 'top' }} onClick={handleOnClickDelete}>
              <VisitsTable ownerId={owner.id} pet={pet} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);
};