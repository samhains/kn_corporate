/*eslint-disable max-nested-callbacks, no-unused-expressions*/

import {Effects} from 'redux-loop';
import sinon from 'sinon';
import {describe, it, beforeEach, afterEach} from 'mocha';
import {expect} from 'chai';
import {initialState, dispatch} from '../../../../test/state';
import * as ServiceSearchStateActions from '../ServiceSearchState';

describe('ServiceSearchState', () => {

  // Example of how to test multiple dispatches in series
  describe('increment', () => {
    const getValue = state => state.getIn(['serviceSearch', 'value']);

    it('should increment the value property by one', () => {
      const [secondState] = dispatch(initialState, ServiceSearchStateActions.increment());
      expect(getValue(secondState)).to.equal(getValue(initialState) + 1);

      const [thirdState] = dispatch(secondState, ServiceSearchStateActions.increment());
      expect(getValue(thirdState)).to.equal(getValue(secondState) + 1);
    });
  });

  describe('reset', () => {
    it('should reset the service search state to initial value', () => {
      // create an incremented state to test against
      const [modifiedState] = dispatch(initialState, ServiceSearchStateActions.increment());
      expect(modifiedState.get('serviceSearch')).to.not.equal(initialState.get('serviceSearch'));

      // reset to original and verify it === initial state
      const [resetState] = dispatch(modifiedState, ServiceSearchStateActions.reset());
      expect(resetState.get('serviceSearch')).to.equal(initialState.get('serviceSearch'));
    });
  });

  // Example of how to test side effects returned from reducers
  describe('random', () => {

    const [nextState, effects] = dispatch(initialState, ServiceSearchStateActions.random());

    it('should update loading bit', () => {
      expect(nextState.getIn(['serviceSearch', 'loading'])).to.equal(true);
    });

    it('should trigger a requestRandomNumber side effect', () => {
      expect(effects).to.eql(
        Effects.promise(ServiceSearchStateActions.requestRandomNumber)
      );
    });
  });

  // Example of how to test async action creators
  describe('requestRandomNumber', () => {

    // randomizer uses timeouts to delay response, let's make it execute
    // instantly to improve test speed
    const sandbox = sinon.sandbox.create();
    beforeEach(() => sandbox.stub(global, 'setTimeout', setImmediate));
    afterEach(() => sandbox.restore());

    it('should generate a random number and dispatch it', async () => {
      const action = await ServiceSearchStateActions.requestRandomNumber();
      expect(action.payload).to.be.a('number');

      const [nextState] = dispatch(initialState, action);
      expect(nextState.getIn(['serviceSearch', 'value'])).to.equal(action.payload);
      expect(nextState.getIn(['serviceSearch', 'loading'])).to.equal(false);
    });
  });
});
