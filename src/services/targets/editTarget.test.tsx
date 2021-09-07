import axios from 'axios';
import editTarget from './editTarget';
const { REACT_APP_API } = process.env;

jest.mock('axios');

describe('editTarget', () => {
    describe('test with valid  inputs', () => {
        const id = '611fa02583b416853031bb6a';
        const url = 'https://test.com';
        const selector = 'div>h1';
        const fakeTarget = { url, selector, id };
        const response = { data: fakeTarget };

        it('should call endpoint with given data', async () => {
            axios.patch.mockImplementationOnce(() => Promise.resolve(response));

            await editTarget(id, selector);

            expect(axios.patch).toBeCalledWith(`${REACT_APP_API}/targets/${id}`, { selector });
        });

        it('should receive success response from API', async () => {
            axios.patch.mockImplementationOnce(() => Promise.resolve(response));

            const editedTarget = await editTarget(id, selector);

            expect(editedTarget).toEqual(fakeTarget);
        });

        it('receives error from API', async () => {
            const error = new Error('Server error. Please contact administrator.');

            axios.patch.mockImplementationOnce(() => Promise.reject(error));

            await expect(editTarget(id, selector)).rejects.toThrow(error);
        });
    });

    describe('test with invalid inputs', () => {
        it('should throw TypeError about non-string ID', () => {
            const id = false;
            const selector = 'div>h4';
            const error = new TypeError(`${id} is not a string.`);

            expect(() => editTarget(id, selector)).toThrow(error);
        });

        it('should throw TypeError about non-string selector', () => {
            const id = '611fa02583b416853031bb6a';
            const selector = false;
            const error = new TypeError(`${selector} is not a string`);

            expect(() => editTarget(id, selector)).toThrow(error);
        });
    });
});
