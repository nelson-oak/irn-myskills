describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('welcome'))).toBeVisible();
  });

  it('should be able to create a new skill', async () => {
    const newSkillInput = await element(by.id('input-new-skill'))
    const addButton = await element(by.id('button-add'))
    const skillsFlatList = await element(by.id('flat-list-skills'))

    await newSkillInput.tap()
    await newSkillInput.typeText('React Native')
    await skillsFlatList.tap()

    await addButton.tap()
    
    await expect(element(by.text('React Native'))).toBeVisible()
  });
});
