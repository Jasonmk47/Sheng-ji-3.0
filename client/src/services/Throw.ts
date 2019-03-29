import {
  ShouldNeverGetHereException,
  ArgumentException,
  NotImplementedException,
} from './Error';

/**
 * A utility class for argument checking and error handling
 */
export class Throw {
  public static shouldNeverGetHere(message?: string): never {
    throw new ShouldNeverGetHereException(message);
  }

  public static notImplemented(message: string): never {
    throw new NotImplementedException(message);
  }

  /**
   * Throws an {@link ArgumentException} if @param condition is true
   */
  public static if(condition: boolean, message: string) {
    if (condition) {
      throw new ArgumentException(message);
    }
  }
}

export const assertHasValue = <T>(
  object: T | undefined,
  message: string,
): T => {
  if (object === undefined) {
    throw new Error(message);
  }

  return object;
};

export const assertNotNull = <T>(object: T | null, message: string): T => {
  if (object === null) {
    throw new Error(message);
  }

  return object;
};
