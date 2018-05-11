import * as React from 'react';

import { IOwner, IPet, IPetType, IVisit, IError, IRouterContext } from '../../types';

import { url, submitForm } from '../../util';
import { NotEmpty } from '../form/Constraints';

import DateInput from '../form/DateInput';
import Input from '../form/Input';
import PetDetails from './PetDetails';

import Calendar from 'react-calendar';
import { IVet } from '../../types';

interface IVisitsPageProps {
  params: {
    ownerId: string,
    petId: string
  };
}

interface IVisitsPageState {
  visit?: IVisit;
  owner?: IOwner;
  error?: IError;
  vets ?: IVet[];
  date ?: Date;
}

export default class VisitsPage extends React.Component<IVisitsPageProps, IVisitsPageState> {

 context: IRouterContext;

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };


  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  getVets() {
    const requestUrl = url('api/vets');

    fetch(requestUrl)
      .then(response => response.json())
      .then(vets => { console.log('vets', vets); this.setState({ vets:  vets } ); });
  }

  componentDidMount() {
    const { params } = this.props;

    if (params && params.ownerId) {
      fetch(url(`/api/owner/${params.ownerId}`))
        .then(response => response.json())
        .then(owner => this.setState(
          {
            owner: owner,
            visit: { id: null, isNew: true, date: null, description: '' }
          })
        );
    }
    this.getVets();
  }

  onSubmit(event) {
    event.preventDefault();

    const petId = this.props.params.petId;
    const { owner, visit } = this.state;

    const request = {
      date: visit.date,
      description: visit.description
    };

    const url = '/api/owners/' + owner.id + '/pets/' + petId + '/visits';
    submitForm('POST', url, request, (status, response) => {
      if (status === 204) {
        this.context.router.push({
          pathname: '/owners/' + owner.id
        });
      } else {
        console.log('ERROR?!...', response);
        this.setState({ error: response });
      }
    });
  }

  onInputChange(name: string, value: string) {
    const { visit } = this.state;

    this.setState(
      { visit: Object.assign({}, visit, { [name]: value }) }
    );
  }

  onChange = date => this.setState({ date })

  render() {

    if (!this.state) {
      return <h2>Loading...</h2>;
    }

    const { owner, error, visit, vets } = this.state;
    const petId = this.props.params.petId;

    const pet = owner.pets.find(candidate => candidate.id.toString() === petId);

    return (
      <div>
        <h2>Visits</h2>
        <b>Pet</b>
        <PetDetails owner={owner} pet={pet} />
        <select>
        {vets.map(vet => (
              <option>
              {vet.firstName} {vet.lastName}</option>
              ))}
        </select>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
        <form className='form-horizontal' method='POST' action={url('/api/owner')}>
          <div className='form-group has-feedback'>
            <DateInput object={visit} error={error} label='Date' name='date' onChange={this.onInputChange} />
            <Input object={visit} error={error} constraint={NotEmpty} label='Description' name='description' onChange={this.onInputChange} />
          </div>
          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-10'>
              <button className='btn btn-default' type='submit' onClick={this.onSubmit}>Add Visit</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}


