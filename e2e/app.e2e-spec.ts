import { VopulusMediaPlayerPage } from './app.po';

describe('vopulus-media-player App', () => {
  let page: VopulusMediaPlayerPage;

  beforeEach(() => {
    page = new VopulusMediaPlayerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('mod works!');
  });
});
