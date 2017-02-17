import { HttpWikiPage } from './app.po';

describe('http-wiki App', function() {
  let page: HttpWikiPage;

  beforeEach(() => {
    page = new HttpWikiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
