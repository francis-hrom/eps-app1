import axios from 'axios';
import resetTargets from './resetTargets';
const { REACT_APP_API } = process.env;

jest.mock('axios');

describe('resetTargets', () => {
    const fakeTargets = [
        {
            url: 'https://test1.io/test-sites/e-commerce/allinone/phones/touch',
            selector: 'html>body>div>div>div>div>div>div>div>div>h4>a:nth-of-type(1)',
            id: '6136e8e689cdbe72bc099541'
        },
        {
            url: 'https://test2.eu/?m=5',
            selector: 'html>body>div>div>main>div>div>div>ol>li>div>div>div>a:nth-of-type(1)',
            id: '6136e8e689cdbe72bc099542'
        },
        {
            url: 'https://www.test3.com/Best-Sellers-Cell-Phones-Accessories/zgbs/wireless/7072561011',
            selector: 'html>body>div>div>div>div>div>div>ol>li>span>div>span>a>div:nth-of-type(1)',
            id: '6136e8e689cdbe72bc099543'
        },
        {
            url: 'https://www.test4.de/preisvergleich/ProductCategory/19116.html?cmpReload=true',
            selector: '.offerList-item-description-title',
            id: '6136e8e689cdbe72bc099544'
        }
    ];
    const response = { data: fakeTargets };

    it('should call endpoint with given data', async () => {
        axios.post.mockImplementationOnce(() => Promise.resolve(response));

        await resetTargets();

        expect(axios.post).toBeCalledWith(`${REACT_APP_API}/targets/reset-to-default-data`);
    });

    it('successfully receives response from API', async () => {
        axios.post.mockImplementationOnce(() => Promise.resolve(response));

        await expect(resetTargets()).resolves.toEqual(fakeTargets);
    });

    it('receives error from API', async () => {
        const error = new Error('Server error. Please contact administrator.');

        axios.post.mockImplementationOnce(() => Promise.reject(error));

        await expect(resetTargets()).rejects.toThrow(error);
    });
});
