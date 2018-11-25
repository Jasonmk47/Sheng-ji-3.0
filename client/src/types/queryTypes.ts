import { Query } from 'react-apollo';

interface Data {
  allPeople: {
    people: Array<{ name: string }>;
  };
}

interface Variables {
  first: number;
}

export class HandQuery extends Query<Data, Variables> {}
