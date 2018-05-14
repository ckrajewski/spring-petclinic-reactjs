import * as React from 'react';

import { url } from '../../util';
import { IVet, IBasicInputChangeHandler} from '../../types';

interface IVisitVetListPageState {
    vets ?: IVet[];
}
interface IVisitVetListPageProps {
  onChange: IBasicInputChangeHandler;
}
export default class VisitVetList extends React.Component<IVisitVetListPageProps, IVisitVetListPageState> {

componentDidMount() {
    const requestUrl = url('api/vets');
    fetch(requestUrl)
      .then(response => response.json())
      .then(vets => {
        this.setState({ vets:  vets } );
      });
  }

  render() {
    if (!this.state) {
      return <h2> </h2>;
    }
    const { onChange } = this.props;
    const handleOnChange = event => {
    const { value } = event.currentTarget;
    // invoke callback
    onChange(value);
  };
    const { vets } = this.state;
    return(
  <select onChange={handleOnChange}>
  <option> Please choose a Vet </option>
        {vets.map(vet => (
              <option value={vet.id.toString()}>
              {vet.firstName} {vet.lastName}</option>
              ))}
        </select>
    );
  }
}