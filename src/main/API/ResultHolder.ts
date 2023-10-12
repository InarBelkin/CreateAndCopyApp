export class LoadSuccess<T> {
  readonly discriminator = 'success';

  readonly value: T;

  constructor(value: T) {
    this.value = value;
  }
}

export class LoadLoading<T> {
  readonly discriminator = 'loading';

  readonly value?: T;

  constructor(value?: T) {
    this.value = value;
  }
}

export class LoadError<T> {
  readonly discriminator = 'error';

  readonly value?: T;

  readonly error: Error;

  readonly message?: string;

  constructor(error: Error, message?: string, value?: T) {
    this.value = value;
    this.error = error;
    this.message = message;
  }
}

export type ValueHolder<T> = LoadSuccess<T> | LoadLoading<T> | LoadError<T>;

export type ResultHolder<T> = LoadSuccess<T> | LoadError<T>;
