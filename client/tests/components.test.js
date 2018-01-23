import { h } from 'preact'; /** @jsx h */

import chai, { expect } from 'chai';
import assertJsx from 'preact-jsx-chai';

console.log(h);

chai.use(assertJsx);

import Header from '../src/components/header';

describe('Header', () => {
	it('passes', () => {
		expect(Header, 'Why not work?').to.contain(<h1>There and back again!</h1>);
	});
});

