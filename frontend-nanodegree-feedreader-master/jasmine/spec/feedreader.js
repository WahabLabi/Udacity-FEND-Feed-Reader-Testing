/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have their URLs defined and the URLs are not empty', () => {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have their names defined and the names are not empty', () => {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', () => {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', () => {
            expect(document.querySelector('body').classList.contains('menu-hidden')).toBe(true);
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility when the menu icon is clicked', () => {
            let clickable = document.querySelector('.menu-icon-link');
            clickable.click();
            expect(document.querySelector('body').classList.contains('menu-hidden')).toBe(false);
            clickable.click();
            expect(document.querySelector('body').classList.contains('menu-hidden')).not.toBe(false);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', () => {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach((done) => {
            loadFeed(0, done);
        });

        it('exist within the .feed container after loadFeed is called and finished', () => {
            let loader = document.querySelector('.feed');
            expect(loader.length).not.toBe(0);
        });
    });  

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', () => {
        let loader = document.querySelector('.feed');
        let oldFeed;
        let newFeed;

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach((done) => {
            loadFeed(0, () => {
                oldFeed = loader.innerHTML;
                done();
            });
            loadFeed(1, () => {
                newFeed = loader.innerHTML;
                done();
            });
        });

        it('actually changes the content', () => {
            expect(oldFeed !== newFeed).toBe(true);
        });
    });
}());
