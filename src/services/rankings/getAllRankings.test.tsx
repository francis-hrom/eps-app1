import axios from 'axios';
import getAllRankings from './getAllRankings';
const { REACT_APP_API } = process.env;

jest.mock('axios');

describe('getAllRankings', () => {
    const fakeRankings = [
        {
            id: '611e4244248af55f14b10e65',
            item: 'google pixel 4a just black',
            url: 'https://test.eu/?m=5',
            rank: 1,
            date: '2021-01-01T11:36:36.609Z'
        },
        {
            id: '611e4244248af55f14b10e79',
            item: 'apple iphone 12',
            url: 'https://www.test2.de/preisvergleich/ProductCategory/19116.html?cmpReload=true',
            rank: 1,
            date: '2021-01-01T11:36:36.771Z'
        }
    ];
    const response = { data: fakeRankings };

    it('should call API endpoint', async () => {
        axios.get.mockImplementationOnce(() => Promise.resolve(response));

        await getAllRankings();

        expect(axios.get).toBeCalledWith(`${REACT_APP_API}/rankings`);
    });

    it('should successfully retrieve data from API', async () => {
        axios.get.mockImplementationOnce(() => Promise.resolve(response));

        const targets = await getAllRankings();

        expect(targets).toEqual(fakeRankings);
    });

    it('gets error while retrieving data from server', async () => {
        const error = new Error('Server error. Please contact administrator.');

        axios.get.mockImplementationOnce(() => Promise.reject(error));

        await expect(getAllRankings()).rejects.toThrow(error);
    });
});
