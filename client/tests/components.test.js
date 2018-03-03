import { h } from 'preact'; /** @jsx h */

import chai, { expect } from 'chai';
import assertJsx from 'preact-jsx-chai';

chai.use(assertJsx);

///Tests
import Nav from '../src/components/Nav';

describe('Nav', () => {
	it('passes', () => {
		expect(<Nav />, 'Nav').to.contain('Home');
	});
});

import SigninForm from '../src/components/SigninForm';

describe('SigninForm', () => {
	it('<SigninForm/> should contain "Login!"', () => {
		expect(<SigninForm />, '<SigninForm/> should contain "Login!"').to.contain('Login!');
	});
});
