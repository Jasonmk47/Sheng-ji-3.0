export interface GameInfo {
  gameId: number;
  userIds: number[];
  usernames: Map<string, string>;
  userScores: Map<string, number>;
}
