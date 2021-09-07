import axios from 'axios';
import scanRankings from './scanRankings';
const { REACT_APP_API } = process.env;

jest.mock('axios');

describe('scanRankings', () => {
    const url = 'https://test.io/test-sites/e-commerce/allinone/phones/touch';
    const selector = 'h4>a';
    const rankingsArr = [
        'Nokia 123',
        'LG Optimus',
        'Samsung Galaxy',
        'Nokia X',
        'Sony Xperia',
        'Ubuntu Edge',
        'Iphone',
        'Iphone',
        'Iphone'
    ];
    const response = { data: rankingsArr };

    it('should call API endpoint', async () => {
        axios.post.mockImplementationOnce(() => Promise.resolve(response));

        await scanRankings(url, selector);

        expect(axios.post).toBeCalledWith(`${REACT_APP_API}/scrape/scan-rankings`, { url, selector });
    });

    it('successfully retrieves data from server', async () => {
        axios.post.mockImplementationOnce(() => Promise.resolve(response));

        const rankings = await scanRankings(url, selector);

        expect(rankings).toEqual(rankingsArr);
    });

    it('gets error while retrieving data from server', async () => {
        const error = new Error('Server error. Please contact administrator.');

        axios.post.mockImplementationOnce(() => Promise.reject(error));

        await expect(scanRankings(url, selector)).rejects.toThrow(error);
    });
});
