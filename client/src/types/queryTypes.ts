import { Query } from 'react-apollo';

interface HandData {
	activeGame: {
		hand: number[];
	}
}

interface HandVariables {
  matchId: number;
  userId: string;
}

export class HandQuery extends Query<HandData, HandVariables> {}

interface FieldData {
  display: {
    cardIdsVisible: number[]
	}
}

export class FieldQuery extends Query<FieldData> {}