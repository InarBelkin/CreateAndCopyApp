export class LoadSuccess<T> {
  public get discriminator(): 'success' {
    return 'success';
  }

  #value: T;

  public get value() {
    return this.#value;
  }

  constructor(value: T) {
    this.#value = value;
  }
}

export class LoadLoading<T> {
  public get discriminator(): 'loading' {
    return 'loading';
  }

  #value?: T;

  public get value() {
    return this.#value;
  }

  constructor(value?: T) {
    this.#value = value;
  }
}

export class LoadError<T> {
  public get discriminator(): 'error' {
    return 'error';
  }

  #value?: T;

  public get value() {
    return this.#value;
  }

  #error: Error;

  public get error() {
    return this.#error;
  }

  constructor(error: Error, value?: T) {
    this.#value = value;
    this.#error = error;
  }
}

export type ValueHolder<T> = LoadSuccess<T> | LoadLoading<T> | LoadError<T>;

export type ResultHolder<T> = LoadSuccess<T> | LoadError<T>;
