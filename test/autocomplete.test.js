const waitFor = (selector) => {
    return new Promise((resolve, reject) => {
       const interval = setInterval(() => {
           if (document.querySelector(selector)) {
               clearInterval(interval);
               clearTimeout(timeout);
                resolve();
            }
        }, 30);

        const timeout = setTimeout(() => {
            clearInterval(interval);
            reject();
        }, 2000);

    });
};

beforeEach(() => {

    document.querySelector('#target').innerHTML = '';
    createAutoComplete({
        root: document.querySelector('#target'),
        fetchData() {
            return [
                { Title: 'Avengers' },
                { Title: 'Avengers No' },
                { Title: 'Some other movies' }
            ];
        },
        renderOption(movie) {
            return movie.Title;
        }
    });


});



it('Dropdown starts closed', () => {
   
    const dropdown = document.querySelector('.dropdown');
    //we dont have access to node.js so assert is not active
    //assert.strictEquals(dropdown.className, 'dropdown');
    //if statment is not effeciently work well and make duplication
    //so use shai library is a good solutionn
    expect(dropdown.className).not.to.include('is-active');
});

it('After searching, dropdown opens up', async () => {

    const input = document.querySelector('input');
    input.value = 'avengers';
    input.dispatchEvent(new Event('input'));

    await waitFor('.dropdown-item');

    const dropdown = document.querySelector('.dropdown');
    expect(dropdown.className).to.include('is-active');

});

it('After searching, displays some results', async () => {

    const input = document.querySelector('input');
    input.value = 'avengers';
    input.dispatchEvent(new Event('input'));

    await waitFor('.dropdown-item');

    const items = document.querySelectorAll('.dropdown-item');
    expect(items.length).to.equal(3);

});