import axios from 'axios';
import findSelector from './findSelector';
const { REACT_APP_API } = process.env;

jest.mock('axios');

describe('findSelector', () => {
    const textArr = ['Nokia 123', 'LG Optimus', 'Samsung Galaxy'];
    const url = 'https://test.io/test-sites/e-commerce/allinone/phones/touch';
    const selector = 'h4>a';
    const response = { data: selector };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should call API endpoint', async () => {
        axios.post.mockImplementationOnce(() => Promise.resolve(response));

        await findSelector(url, textArr);

        expect(axios.post).toBeCalledWith(`${REACT_APP_API}/scrape/find-selector`, { url, textArr });
    });

    it('successfully retrieves data from server', async () => {
        axios.post.mockImplementationOnce(() => Promise.resolve(response));

        const receivedSelector = await findSelector(url, textArr);

        expect(receivedSelector).toEqual(selector);
    });

    it('gets error while retrieving data from server', async () => {
        const error = new Error('Server error. Please contact administrator.');

        axios.post.mockImplementationOnce(() => Promise.reject(error));

        await expect(findSelector(url, textArr)).rejects.toThrow(error);
    });
});
