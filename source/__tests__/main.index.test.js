/*import 'regenerator-runtime/runtime'

describe('Basic user flow for Website', () => {
	beforeAll(async () => {
	  await page.goto('http://127.0.0.1:5500');
	});

	//Make sure the '+' takes user to new page
	it('Create recipe button', async () => {

		await page.click('#createBtn > i');
		const drawerLabel = await page.$('drawerLabel');
		const shadRoot = await drawerLabel.getProperty('shadowRoot');
		const inText = await shadRoot.getProperty('innerText');
		expect(inText['_remoteObject'].value).toBe('Viewing & Editing a Recipe');
	});

});*/