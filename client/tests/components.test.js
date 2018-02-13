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

