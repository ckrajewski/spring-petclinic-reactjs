import * as React from 'react';

import { IOwner, IPet, IVet, IPetType, IVisit, IError, IRouterContext } from '../../types';

import { url, submitForm } from '../../util';
import { NotEmpty } from '../form/Constraints';

import DateInput from '../form/DateInput';
import Input from '../form/Input';
import PetDetails from './PetDetails';
import VisitVetsList from './VisitVetsList';

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
  defaultStartTime ?: string;
  defaultEndTime ?: string;
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
    this.setVetId = this.setVetId.bind(this);
  }
getVisits() {

  const petId = this.props.params.petId;
  const { vetId, visit } = this.state;
  const request = {
      date:  visit.date,
      description: visit.description
    };
  const requestUrl = `/api/pet/${petId}/vet/${vetId}/findvisits`;
    submitForm('POST', requestUrl, request, (status, response) => {
        this.setState({ visits: response } );
    });
  }
componentDidMount() {
    const { params } = this.props;
    if (params && params.ownerId) {
      fetch(url(`/api/owner/${params.ownerId}`))
        .then(response => response.json())
        .then(owner => {
          const today = new Date();
          this.setState(
          {
            owner: owner,
            date : today,
            vetId: '',
            defaultStartTime: moment(today).hour(8).minute(0),
            defaultEndTime: moment(today).hour(9).minute(0),
            visit:
            {
              id: null,
              isNew: true,
              date: moment(today).format('YYYY/MM/DD'),
              description: '',
              appointmentStart: moment(today).hour(8).minute(0).format('YYYY/MM/DD HH:mm:ss'),
              appointmentEnd: moment(today).hour(9).minute(0).format('YYYY/MM/DD HH:mm:ss')
            }
          });
        }
        );
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const petId = this.props.params.petId;
    const { visit, owner, vetId } = this.state;
    if (!this.validateAppointmentTime(visit.appointmentStart)) {
      return;
    }
    const request = {
      date: visit.date,
      appointmentStart: visit.appointmentStart,
      appointmentEnd: visit.appointmentEnd,
      description: visit.description
    };
    const requestUrl = `/api/pet/${petId}/vet/${vetId}/createvisit`;
    submitForm('POST', requestUrl, request, (status, response) => {
      if (status !== 201) {
        alert(response.message);
      }
      else if (response) {
        alert('successfully created a visit!');
      } else {
        alert('There was a problem creating an appointment. Please see if someone has created one already');
      }
      this.getVisits();

    });
  }
  setVetId(vetId) {
    this.setState({ vetId: vetId });
  }
  onInputChange(name: string, value: string) {
    const { visit } = this.state;

    this.setState(
      { visit: Object.assign({}, visit, { [name]: value }) }
    );
  }

   noWeekends = ({date, view }) => {
    return date.getDay() === 0 || date.getDay() === 6;
  }

  onDateChange = date => {
    const formattedDate = moment(date).format('YYYY/MM/DD');
    const { visit } = this.state;
    this.setState({ date: date,
      visit: Object.assign({}, visit, { date: formattedDate }) });
  }

  onAppontmentStartTimeChange = time => {
    this.validateAppointmentTime(time);
    const { date, visit } = this.state;
    const formattedStartTime = moment(date).hour(time.hour()).minute(time.minute()).format('YYYY/MM/DD HH:mm:ss');
    this.setState({ visit: Object.assign({}, visit, { appointmentStart: formattedStartTime }) });
  }

  onAppontmentEndTimeChange = time => {
    this.validateAppointmentTime(time);
    const { date, visit } = this.state;
    const formattedEndTime = moment(date).hour(time.hour()).minute(time.minute()).format('YYYY/MM/DD HH:mm:ss');
    this.setState({ visit: Object.assign({}, visit, { appointmentEnd: formattedEndTime }) });
  }

  validateAppointmentTime(time) {
    const hour = moment(time).format('HH');
    if ( hour < 8 || hour > 17) {
      alert('Please choose a time between 8 AM and 5 PM');
      return false;
    }
    return true;
  }
  render() {

    if (!this.state) {
      return <h2>Loading...</h2>;
    }

    const { owner, error, visit, visits, defaultStartTime, defaultEndTime } = this.state;
   // const today = moment.format(date, 'MM/DD');
    const petId = this.props.params.petId;

    const pet = owner.pets.find(candidate => candidate.id.toString() === petId);
    return (
      <div>
        <h2>Visits</h2>
        <b>Pet</b>
        <PetDetails owner={owner} pet={pet} />
        <Calendar
        value={this.state.date}
        onChange={this.onDateChange}
        tileDisabled={this.noWeekends}
        />
    Select Appointment for
    <VisitVetsList onChange={this.setVetId}/>
        From
        <TimePicker
    showSecond={false}
    defaultValue={defaultStartTime}
    className='xxx'
    format={myformat}
    onChange={this.onAppontmentStartTimeChange}
    use12Hours
    inputReadOnly
    />
    Until
    <TimePicker
    showSecond={false}
    defaultValue={defaultEndTime}
    className='xxx'
    format={myformat}
    onChange={this.onAppontmentEndTimeChange}
    use12Hours
    inputReadOnly
    />
      <div>
      <Input object={visit} error={error} constraint={NotEmpty} label='Description' name='description' onChange={this.onInputChange} />
     <button className='btn btn-default' type='submit' onClick={this.onSubmit}>Add Visit</button>
      </div>
      </div>
    );
  }
}


