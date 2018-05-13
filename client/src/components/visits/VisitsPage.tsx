import * as React from 'react';

import { IOwner, IPet, IVet, IPetType, IVisit, IError, IRouterContext } from '../../types';

import { url, submitForm } from '../../util';
import { NotEmpty } from '../form/Constraints';

import DateInput from '../form/DateInput';
import Input from '../form/Input';
import PetDetails from './PetDetails';
import VisitDetails from './VisitDetails';


const TimePicker = require('rc-time-picker');

import Calendar from 'react-calendar';
const moment = require('moment');

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
  visits ?: IVisit[];
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

  getVets(owner) {
    const requestUrl = url('api/vets');
    // var owner = owner;
    fetch(requestUrl)
      .then(function(response,owner) { return response.json(); })
      .then(vets => {
        let firstVetId = '';
        if (vets.length > 0) {
          firstVetId = vets[0].id;
        }
        this.setState({ vets:  vets, vetId : firstVetId } );
      });
  }

getVisits() {
  console.log('test');
  const petId = this.props.params.petId;
  const { vetId, date } = this.state;
  const formattedDate = moment(date).format('YYYY/MM/DD');
  const request = {
      date:  formattedDate,
      description: 'NotNull'
    };
  const requestUrl = `/api/pet/${petId}/vet/${vetId}/findvisits`;
    submitForm('POST', requestUrl, request, (status, response) => {
        this.setState({ visits: response } );
    });
  }
  componentDidMount() {
    this.setState({date : new Date()});
    this.setState({time : moment().hour(9).minute(0)});
    const { params } = this.props;
    if (params && params.ownerId) {
      fetch(url(`/api/owner/${params.ownerId}`))
        .then(response => response.json())
        .then(owner => this.getVets(owner));
    }
  }

  onSubmit(event) {
    event.preventDefault();

    const petId = this.props.params.petId;
    const { owner, visit, vetId, date, time, } = this.state;
    const formattedTime = moment(time).format('HH:MM');
    const formattedDate = moment(date).format('YYYY/MM/DD');
    const day = moment(formattedDate + ' ' + formattedTime);
    const formattedStart = moment(day).format('YYYY/MM/DD HH:mm:ss');
    const formattedEnd = moment(day).add(1, 'hours').format('YYYY/MM/DD HH:mm:ss');
    const request = {
      date: formattedDate,
      appointmentStart: formattedStart,
      appointmentEnd: formattedEnd,
      description: 'testing'
    };
    const requestUrl = `/api/pet/${petId}/vet/${vetId}/createvisit`;
    submitForm('POST', requestUrl, request, (status, response) => {
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
    this.getVisits();
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

    const { owner, error, visit, vets, time, visits } = this.state;
   // const today = moment.format(date, 'MM/DD');
    const petId = this.props.params.petId;

    const pet = owner.pets.find(candidate => candidate.id.toString() === petId);
    return (
      <div>
        <h2>Visits</h2>
        <b>Pet</b>
        <PetDetails owner={owner} pet={pet} />
        <VisitDetails visits={visits} />
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
    onChange={this.onInputChange}
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


