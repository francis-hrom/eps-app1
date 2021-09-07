import axios from 'axios';
import deleteTarget from './deleteTarget';
const { REACT_APP_API } = process.env;

jest.mock('axios');

describe('deleteTarget', () => {
    describe('test with valid inputs', () => {
        const id = '611fa02583b416853031bb6a';
        const message = 'Target has been deleted.';
        const response = { data: message };

        it('should call endpoint with given data', async () => {
            axios.delete.mockImplementationOnce(() => Promise.resolve(response));

            await deleteTarget(id);

            expect(axios.delete).toBeCalledWith(`${REACT_APP_API}/targets/${id}`);
        });

        it('should receive success response from API', async () => {
            axios.delete.mockImplementationOnce(() => Promise.resolve(response));

            await expect(deleteTarget(id)).resolves.toEqual(message);
        });

        it('should receive error from API', async () => {
            const error = new Error('Server error. Please contact administrator.');

            axios.delete.mockImplementationOnce(() => Promise.reject(error));

            await expect(deleteTarget(id)).rejects.toThrow(error);
        });
    });

    describe('test with invalid inputs', () => {
        it('should throw TypeError', () => {
            const id = false;
            const error = new TypeError(`${id} is not a string.`);

            expect(() => deleteTarget(id)).toThrow(error);
        });
    });
});
