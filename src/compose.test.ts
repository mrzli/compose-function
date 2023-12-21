import { describe, expect, it } from '@jest/globals';
import { Fn1 } from '@gmjs/generic-types';
import { compose, composeMono } from './compose';

const ADD_3 = (input: number): number => input + 3;
const MULTIPLY_BY_2 = (input: number): number => input * 2;
const CONCAT_3 = (input: string): string => input + 3;
const NUMBER_TO_STRING = (input: number): string => input.toString();
const STRING_TO_NUMBER = (input: string): number => Number.parseFloat(input);

describe('compose', () => {
  describe('compose()', () => {
    interface Example<T, U> {
      readonly input: {
        readonly value: T;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        readonly fns: readonly Fn1<any, any>[];
      };
      readonly expected: U;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const EXAMPLES: readonly Example<any, any>[] = [
      {
        input: {
          value: 1,
          fns: [],
        },
        expected: 1,
      },
      {
        input: {
          value: 1,
          fns: [MULTIPLY_BY_2],
        },
        expected: 2,
      },
      {
        input: {
          value: 1,
          fns: [NUMBER_TO_STRING, CONCAT_3, STRING_TO_NUMBER, MULTIPLY_BY_2],
        },
        expected: 26,
      },
      {
        input: {
          value: '11',
          fns: [CONCAT_3, MULTIPLY_BY_2, NUMBER_TO_STRING],
        },
        expected: '226',
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const actual = compose(...example.input.fns)(example.input.value);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('composeMono()', () => {
    interface Example {
      readonly input: {
        readonly value: number;
        readonly fns: readonly Fn1<number, number>[];
      };
      readonly expected: number;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: 1,
          fns: [],
        },
        expected: 1,
      },
      {
        input: {
          value: 1,
          fns: [MULTIPLY_BY_2],
        },
        expected: 2,
      },
      {
        input: {
          value: 11,
          fns: [MULTIPLY_BY_2, ADD_3, MULTIPLY_BY_2],
        },
        expected: 50,
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = composeMono(...example.input.fns)(example.input.value);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
