import {h} from 'preact';
/** @jsx h */
import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'preact-render-spy';
import {mount} from 'enzyme';
import AccountForm from '../src/components/AccountForm';
import {REGISTER_PATH, LOGIN_PATH, RESET_PATH} from '../config';
jest.mock('preact-router');
const myRouter = require('preact-router');
import * as validate_constants from '../src/js/validate-account-form';
import {BASE_ENDPOINTS} from '../src/js/server-requests-utils';

const VALIDATION_MESSAGE = "VALIDATION MESSAGE";

const setup = ({testPropsOverrides, wrapperStateOverrides, wrapperPropsOverrides}) => {

  /**
   * If validateAccountForm resolves, it does not necessarily mean the form is validated.
   * validateAccountForm will resolve with status: false if the form is not validated.
   * validateAccountForm only rejects if there is an error from the server after submitting.
   * To test error messages from the server, the test should explicitly set resolve_validation to false.
   */
  const testProps = Object.assign({
    resolve_validation: true
  }, testPropsOverrides);

  // Mock the alert function
  window.alert = jest.fn().mockImplementation( message => testProps.alert_message = message);

  // Mock the route function
  myRouter.route = jest.fn().mockImplementation((url, replace) => {
    testProps.route_url = url;
    testProps.route_replace = replace;
  });

  // Mock the validateAccountForm function
  validate_constants.validateAccountForm = jest.fn().mockImplementation( () => {
    return new Promise((resolve, reject) => {
      if (testProps.resolve_validation) {
        resolve({status: testProps.validation_status, message: testProps.validation_message});
      } else {
        reject({response: {data: testProps.validation_message}})
      }
    });
  });

  return testProps;
}

describe('<AccountForm  path={BASE_ENDPOINTS.userRegister}/>', () => {

  const wrapper = shallow(<AccountForm path={BASE_ENDPOINTS.userRegister}/>);

  describe('page loads', () => {

    it('has 4 inputs', async () => {
      const testProps = setup({
        testPropsOverrides: {
          wrapper,
        }
      });

      const inputs = testProps.wrapper.find('input');
      expect(inputs.length).toBe(4);
    });
  });

  describe('validateAccountForm returns true status and message', () => {

    it('routes to /profile', async () => {
      const testProps = setup({
        testPropsOverrides: {
          validation_status: true,
          wrapper,
        }
      });

      await Promise.all([testProps.wrapper.find('form').at(0).simulate('submit',{ preventDefault () {} })]);
      expect(testProps.route_url).toBe('/profile');
      expect(testProps.route_replace).toBe(true);
    });

  });

  describe('validateAccountForm returns false status and message', () => {

    it('warns message', async () => {
      const testProps = setup({
        testPropsOverrides: {
          validation_status: false,
          validation_message: VALIDATION_MESSAGE,
          wrapper,
        }
      });

      await Promise.all([testProps.wrapper.find('form').at(0).simulate('submit',{ preventDefault () {} })]);
      expect(testProps.alert_message).toBe(VALIDATION_MESSAGE);
    });

  });

  describe('validateAccountForm rejects instead of resolves', () => {

    it('warns message', async () => {
      const testProps = setup({
        testPropsOverrides: {
          resolve_validation: false,
          validation_message: VALIDATION_MESSAGE,
          wrapper,
        }
      });

      await Promise.all([testProps.wrapper.find('form').at(0).simulate('submit',{ preventDefault () {} })]);
      expect(testProps.alert_message).toBe(VALIDATION_MESSAGE);
    });

  });

});


describe('<AccountForm  path={BASE_ENDPOINTS.userLogin}/>', () => {

  const wrapper = shallow(<AccountForm path={BASE_ENDPOINTS.userLogin}/>);

  describe('page loads', () => {

    it('has 2 inputs', async () => {
      const testProps = setup({
        testPropsOverrides: {
          wrapper,
        }
      });

      const inputs = testProps.wrapper.find('input');
      expect(inputs.length).toBe(2);
    });
  });

});

describe('<AccountForm  path={BASE_ENDPOINTS.userReset}/>', () => {

  const wrapper = shallow(<AccountForm path={BASE_ENDPOINTS.userReset}/>);

  describe('page loads', () => {

    it('has 5 inputs', async () => {
      const testProps = setup({
        testPropsOverrides: {
          wrapper,
        }
      });

      const inputs = testProps.wrapper.find('input');
      expect(inputs.length).toBe(5);
    });
  });

  describe('validateAccountForm returns true status and message', () => {

    it('warns message', async () => {
      const testProps = setup({
        testPropsOverrides: {
          validation_status: true,
          validation_message: VALIDATION_MESSAGE,
          wrapper,
        },
      });

      await Promise.all([testProps.wrapper.find('form').at(0).simulate('submit',{ preventDefault () {} })]);
      expect(testProps.alert_message).toBe(VALIDATION_MESSAGE);
    });

  });

});
