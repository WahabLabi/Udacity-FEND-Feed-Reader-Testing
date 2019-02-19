// These tests have been placed within a $() function to ensure they don't run until the DOM is ready.
$(function() {
    describe('RSS Feeds', () => {
        // 1st test - checks whether the allFeeds variable has been defined and isn't empty.
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // 2nd test - loops through each feed in the allFeeds object and checks whether it has a URL defined and that the URL isn't empty.
        it('have their URLs defined and the URLs are not empty', () => {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });

        // 3rd test - loops through each feed in the allFeeds object and checks whether it has a name defined and that the name is not empty.
        it('have their names defined and the names are not empty', () => {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });

    describe('The menu', () => {
        // 4th test - checks whether the menu is hidden by default
        it('is hidden by default', () => {
            expect(document.querySelector('body').classList.contains('menu-hidden')).toBe(true);
        });

        // 5th test - checks whether the menu icon works (clicking it hides and displays the menu)
        it('changes visibility when the menu icon is clicked', () => {
            let clickable = document.querySelector('.menu-icon-link');
            clickable.click();
            expect(document.querySelector('body').classList.contains('menu-hidden')).toBe(false);
            clickable.click();
            expect(document.querySelector('body').classList.contains('menu-hidden')).not.toBe(false);
        });
    });

    describe('Initial Entries', () => {

        // 6th test (asynchronous) - checks whether the loadFeed function works (results in at least one .entry in the .feed container)
        beforeEach((done) => {
            loadFeed(0, done);
        });

        it('exist within the .feed container after loadFeed is called and finished', () => {
            let loader = document.querySelectorAll('.feed .entry');
            expect(loader.length).not.toBe(0);
        });
    });  

    describe('New Feed Selection', () => {
        let loader = document.querySelector('.feed');
        let firstFeed;
        let secondFeed;
        
        // 7th test (asynchronous) - checks whether a new feed results in actual content changes
        beforeEach((done) => {
            loadFeed(0, () => {
                firstFeed = loader.innerHTML;
                loadFeed(1, () => {
                    secondFeed = loader.innerHTML;
                    done();
                });
            });
        });

        it('actually changes the content', () => {
            expect(firstFeed !== secondFeed).toBe(true);
        })
    });
}());
