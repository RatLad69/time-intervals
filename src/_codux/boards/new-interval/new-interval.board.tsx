import { createBoard } from '@wixc3/react-board';
import { NewInterval } from '../../../components/new-interval/new-interval';

export default createBoard({
    name: 'NewInterval',
    Board: () => <NewInterval />,
    isSnippet: true,
});
