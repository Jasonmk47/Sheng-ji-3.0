import { Query } from 'react-apollo';

interface Data {
    hand: number[];
  };
  
export class HandQuery extends Query<Data> {}