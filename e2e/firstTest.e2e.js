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
    const newSkillInput = element(by.id('input-new-skill'))
    const addButton = element(by.id('button-add'))

    await newSkillInput.tap()
    await newSkillInput.typeText('React Native')

    await addButton.tap()
  });
});
