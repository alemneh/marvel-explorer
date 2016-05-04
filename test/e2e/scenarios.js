describe('Marvel Explorer App', function() {
  var readList = element.all(by.binding('readBook.name'));
  var unReadList = element.all(by.binding('unReadBook.name'));


  beforeEach(function() {
    browser.get('http://localhost:9000');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Marvel Front-End');
  });


  it('should delete a book', function() {
    element(by.linkText('Profile')).click();
    readList.then(function(book) {
      book[book.length -1].element(by.linkText('Delete')).click();
      expect(readList.count()).toEqual(3);
    })
  });

  it('should mark a unread book as read', function() {
    element(by.linkText('Profile')).click();
    unReadList.then(function(book) {
      book[0].element(by.linkText('Read')).click();
      expect(readList.count()).toEqual(5);
    })
  })

  it('should cancel editing a user settings', function() {
    element(by.linkText('Profile')).click();
    element(by.buttonText('Edit Profile')).click();
    element(by.model('profileCtrl.sampleUser.username')).clear();
    element(by.model('profileCtrl.sampleUser.username')).sendKeys('Alem');
    element(by.css('[data-ng-click="profileCtrl.cancel(user)"]')).click();
    expect(element(by.binding('profileCtrl.sampleUser.username')).getText()).toEqual('Tim');
  })

  it('should edit a user settings', function() {
    element(by.linkText('Profile')).click();
    element(by.buttonText('Edit Profile')).click();
    element(by.model('profileCtrl.sampleUser.username')).clear();
    element(by.model('profileCtrl.sampleUser.username')).sendKeys('Alem');
    element(by.buttonText('Update')).click();
    expect(element(by.binding('profileCtrl.sampleUser.username')).getText()).toEqual('Alem');
  })
});
