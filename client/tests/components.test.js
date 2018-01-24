import { h } from 'preact'; /** @jsx h */

import chai, { expect } from 'chai';
import assertJsx from 'preact-jsx-chai';

chai.use(assertJsx);

///Tests
import Header from '../src/components/header';

describe('Header', () => {
	it('passes', () => {
		expect(<Header />, 'Why not work?').to.contain(<h1>There and Back Again!</h1>);
	});
});

