import { SimpleRoutesPage } from './app.po';

describe('simple-routes App', function() {
  let page: SimpleRoutesPage;

  beforeEach(() => {
    page = new SimpleRoutesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
