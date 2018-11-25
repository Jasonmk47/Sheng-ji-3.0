import { Query } from 'react-apollo';

interface Data {
    hand: number[];
};

interface Variables {
	matchId: number;
	userId: string;
};

export class HandQuery extends Query<Data, Variables> {}