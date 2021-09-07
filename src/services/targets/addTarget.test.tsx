import axios from 'axios';
import addTarget from './addTarget';
const { REACT_APP_API } = process.env;

jest.mock('axios');

describe('addTarget', () => {
    describe('test with valid inputs', () => {
        const id = '611fa02583b416853031bb6a';
        const url = 'https://test.com';
        const selector = 'div>h1';
        const fakeTarget = { url, selector, id };
        const response = { data: fakeTarget };

        it('should call endpoint with given data', async () => {
            axios.post.mockImplementationOnce(() => Promise.resolve(response));

            await addTarget(url, selector);

            expect(axios.post).toBeCalledWith(`${REACT_APP_API}/targets`, {
                url,
                selector
            });
        });

        it('should receive success response from API', async () => {
            axios.post.mockImplementationOnce(() => Promise.resolve(response));

            const target = await addTarget(url, selector);

            expect(target).toEqual(fakeTarget);
        });

        it('should receive error from API', async () => {
            const error = new Error('Server error. Please contact administrator.');

            axios.post.mockImplementationOnce(() => Promise.reject(error));

            await expect(addTarget(url, selector)).rejects.toThrow(error);
        });
    });

    describe('test with invalid inputs', () => {
        it('should throw TypeError about non-string URL', async () => {
            const url = 123;
            const selector = false;
            const error = new TypeError(`${url} is not a string.`);

            expect(() => addTarget(url, selector)).toThrow(error);
        });

        it('should throw TypeError about invalid url', () => {
            const url = 'example.com';
            const selector = false;
            const error = new TypeError(`${url} is not a valid URL.`);

            expect(() => addTarget(url, selector)).toThrow(error);
        });

        it('should throw TypeError about non-string selector', () => {
            const url = 'http://example.com';
            const selector = false;
            const error = new TypeError(`${selector} is not a string.`);

            expect(() => addTarget(url, selector)).toThrow(error);
        });
    });
});
