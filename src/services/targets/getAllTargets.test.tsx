import axios from 'axios';
import getAllTargets from './getAllTargets';
const { REACT_APP_API } = process.env;

jest.mock('axios');

describe('getAllTargets', () => {
    const fakeTargets = [
        {
            id: '6128fc0d55edea8140bbe73c',
            url: 'https://test1.io/test-sites/e-commerce/allinone/phones/touch',
            selector: 'html>body>div>div>div>div>div>div>div>div>h4>a:nth-of-type(1)',
            __v: 0
        },
        {
            id: '6128fc0d55edea8140bbe73d',
            url: 'https://test2.eu/?m=5',
            selector: 'html>body>div>div>main>div>div>div>ol>li>div>div>div>a:nth-of-type(1)',
            __v: 0
        }
    ];
    const response = { data: fakeTargets };

    it('should call API endpoint', async () => {
        axios.get.mockImplementationOnce(() => Promise.resolve(response));

        await getAllTargets();

        expect(axios.get).toBeCalledWith(`${REACT_APP_API}/targets`);
    });

    it('should successfully retrieve data from API', async () => {
        axios.get.mockImplementationOnce(() => Promise.resolve(response));

        const targets = await getAllTargets();

        expect(targets).toEqual(fakeTargets);
    });

    it('should get error while retrieving data from server', async () => {
        const error = new Error('Server error. Please contact administrator.');

        axios.get.mockImplementationOnce(() => Promise.reject(error));

        await expect(getAllTargets()).rejects.toThrow(error);
    });
});
