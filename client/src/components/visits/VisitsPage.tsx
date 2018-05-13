import * as React from 'react';

import { IOwner, IPet, IPetType, IVisit, IError, IRouterContext } from '../../types';

import { url, submitForm } from '../../util';
import { NotEmpty } from '../form/Constraints';

import DateInput from '../form/DateInput';
import Input from '../form/Input';
import PetDetails from './PetDetails';

const TimePicker = require('rc-time-picker');
const format = 'h:mm a';

import Calendar from 'react-calendar';
const moment = require('moment');

import { IVet } from '../../types';
import 'rc-time-picker/assets/index.css';

const myformat = 'h:mm a';

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
  time ?: string;
  vetId ?: string;
  vetDates ?: Date[];
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
      .then(vets => {
        let firstVetId = '';
        if (vets.length > 0) {
          firstVetId = vets[0].id;
        }
        this.setState({ vets:  vets, vetId : firstVetId } ); });
    }

getVetTimes(index) {
    const vetId = this.state.vets[index].id;
    const requestUrl = url(`/api/visits/${vetId}`);
    fetch(requestUrl)
      .then(response => response.json())
      .then(vetInfo => this.setState(
        {
          vetDates: vetInfo.map((vet) => vet.date)
        })
      );
  }

  componentDidMount() {
    this.setState({date : new Date()});
    this.setState({time : moment().hour(9).minute(0)});
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
    const { owner, visit, vetId, date, time } = this.state;
    const appointmentDate = moment(date).format('MM/DD/YYYY');
    const request = {
      date: visit.date,
      description: visit.description
    };

    const url = '/api/owners/' + owner.id + '/pets/' + petId + '/visit/' + vetId + '/date/' + appointmentDate + '/time/' + time;
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
  setVetId(event) {
    this.setState({ vetId : event.currentTarget.value});
  }
  onInputChange(name: string, value: string) {
    const { visit } = this.state;

    this.setState(
      { visit: Object.assign({}, visit, { [name]: value }) }
    );
  }

  onDateChange = date => this.setState({ date });
  onTimeChange = time => {
    this.setState({ time });
  }
  render() {

    if (!this.state) {
      return <h2>Loading...</h2>;
    }

    const { owner, error, visit, vets, time } = this.state;
   // const today = moment.format(date, 'MM/DD');
    const petId = this.props.params.petId;

    const pet = owner.pets.find(candidate => candidate.id.toString() === petId);
    if (vets.length !== 0) {
      // this.getVetTimes(0);
    }
    return (
      <div>
        <h2>Visits</h2>
        <b>Pet</b>
        <PetDetails owner={owner} pet={pet} />
        <Calendar
        value={this.state.date}
        onChange={this.onDateChange}
        />
    Select Appointment for
    <select onChange ={this.setVetId}>
        {vets.map(vet => (
              <option value={vet.id.toString()}>
              {vet.firstName} {vet.lastName}</option>
              ))}
        </select>
        At
        <TimePicker
    showSecond={false}
    defaultValue={time}
    className='xxx'
    format={myformat}
    onChange={this.onTimeChange}
    use12Hours
    inputReadOnly
    />
      <div>
     <button className='btn btn-default' type='submit' onClick={this.onSubmit}>Add Visit</button>
      </div>
      </div>
    );
  }
}


